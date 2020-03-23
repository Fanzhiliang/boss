<template>
  <div class="select-wrap" v-if="list.length > 0" v-show="visible">
    <list :list="list" ref="tree0" :index="0" :activeIndex.sync="tree0Index" @hover="hoverHandler" @select="selectItem"/>
    <list :list="tree1" ref="tree1" :index="1" :activeIndex.sync="tree1Index" @hover="hoverHandler" @select="selectItem"/>
    <list :list="tree2" ref="tree2" :index="2" :activeIndex.sync="tree2Index" @hover="hoverHandler" @select="selectItem"/>
  </div>
</template>

<script>
  import List from './list'
  export default {
    name: 'SelectList',
    components: {List},
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data(){
      return {
        tree0Index: null,
        tree1Index: null,
        tree2Index: null,
        tree1: [],
        tree2: [],
      }
    },
    methods: {
      isNoNullArray(arr){
        return arr && arr instanceof Array && arr.length > 0;
      },
      //根据下标一直清空数组，直到没有该下标的数组
      clearTree(index){
        while(this.isNoNullArray(this[`tree${index}`])){
          this[`tree${index}`] = [];
          ++index;
        }
      },
      //鼠标经过
      hoverHandler({children,index,i}){
        //设置鼠标经过的组件的 activeIndex
        this[`tree${index}Index`] = i;
        //获取下个组件的下标
        let nextIndex = index+1;
        //设置下个组件的数组数据
        this[`tree${nextIndex}`] = children || [];
        //清空下个组件的 activeIndex
        this[`tree${nextIndex}Index`] = null;
        //清空下下个组件开始的全部组件数组数据
        this.clearTree(nextIndex+1);
      },
      //点击选择
      selectItem(item){
        if(item.label && !this.isNoNullArray(item.children)){//有内容并且没有子选项
          this.$emit('select',item);
        }
      },
    }
  }
</script>

<style lang="scss">
  .select-wrap{
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 0;
  }
</style>
