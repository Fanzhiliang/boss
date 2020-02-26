<template>
	<transition name="collapse"
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter"
		
		@before-leave="beforeLeave"
		@leave="leave"
		@after-leave="afterLeave"
	>
		<slot></slot>
	</transition>
	
</template>

<script>
	export default{
		name: 'CollapseTransition',
		data(){
			return {
				
			}
		},
		methods: {
			hasClass(el,cls){
				if (!el || !cls) return false;
				if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
				if (el.classList) {
				  return el.classList.contains(cls);
				} else {
				  return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
				}
			},
			addClass(el, cls) {
			  if (!el) return;
			  var curClass = el.className;
			  var classes = (cls || '').split(' ');
			
			  for (var i = 0, j = classes.length; i < j; i++) {
			    var clsName = classes[i];
			    if (!clsName) continue;
			
			    if (el.classList) {
			      el.classList.add(clsName);
			    } else if (!this.hasClass(el, clsName)) {
			      curClass += ' ' + clsName;
			    }
			  }
			  if (!el.classList) {
			    el.className = curClass;
			  }
			},
			removeClass(el, cls) {
			  if (!el || !cls) return;
			  var classes = cls.split(' ');
			  var curClass = ' ' + el.className + ' ';
			
			  for (var i = 0, j = classes.length; i < j; i++) {
			    var clsName = classes[i];
			    if (!clsName) continue;
			
			    if (el.classList) {
			      el.classList.remove(clsName);
			    } else if (this.hasClass(el, clsName)) {
			      curClass = curClass.replace(' ' + clsName + ' ', ' ');
			    }
			  }
			  if (!el.classList) {
			    el.className = trim(curClass);
			  }
			},
			//钩子函数
			beforeEnter(el){
				if(!el.dataset) el.dataset = {};
				
				el.dataset.oldPaddingTop = el.style.paddingTop;
				el.dataset.oldPaddingBottom = el.style.paddingBottom;
				
				el.style.height = '0';
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
			},
			enter(el){
				el.dataset.oldOverflow = el.style.overflow;
				this.addClass(el,'collapse-transition');
				if(el.scrollHeight != 0){
					el.style.height = el.scrollHeight + 'px';
				}else{
					el.style.height = '';
				}
				el.style.paddingTop = el.dataset.oldPaddingTop;
				el.style.paddingBottom = el.dataset.oldPaddingBottom;
				el.style.overflow = 'hidden';
			},
			afterEnter(el){
				this.removeClass(el,'collapse-transition');
				el.style.height = '';
				el.style.overflow = el.dataset.oldOverflow;
			},
			beforeLeave(el){
				if(!el.dataset) el.dataset = {};
				
				el.dataset.oldOverflow = el.style.overflow;
				el.dataset.oldPaddingTop = el.style.paddingTop;
				el.dataset.oldPaddingBottom = el.style.paddingBottom;
				
				if(el.scrollHeight != 0){
					el.style.height = el.scrollHeight + 'px';
				}else{
					el.style.height = '';
				}
				
				el.style.overflow = 'hidden';
			},
			leave(el){
				this.addClass(el,'collapse-transition');
				el.style.height = '0';
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
			},
			afterLeave(el){
				this.removeClass(el,'collapse-transition');
				el.style.height = '';
				el.style.overflow = el.dataset.oldOverflow;
				el.style.paddingTop = el.dataset.oldPaddingTop;
				el.style.paddingBottom = el.dataset.oldPaddingBottom;
			},
		}
	}
</script>

<style>
	.collapse-transition{
		transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
	}	
</style>
