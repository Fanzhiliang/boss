<template>
	<div class="navbar" :class="[backgroundColor]">
		<div class="navbar-inner">

			<div class="logo">
				<a href="" class="link" @click.prevent="goRouter('/')">
					<img src="~/static/img/logo-2x.png" alt="">
				</a>
			</div>

			<div class="location">
				<i class="location-icon"></i>
				<span class="current-location">广州</span>
				<span class="toggle-tip">[切换城市]</span>
			</div>

			<ul class="link-list">
				<li class="link-item" v-for="(item,index) in leftLinkList" :key="index">
					<a href="" class="link" :class="{active : leftLinkIndex == index}" @click.prevent="goRouter(item.path)">{{item.label}}</a>
				</li>
			</ul>

			<!-- 登录后 -->
			<template v-if="isLogin">
				<div class="userInfo" @mouseenter="showDropdown" @mouseleave="hideDropdown">
					<p class="username">{{userInfo.username}}</p>
					<img :src="userInfo.avatar" alt="" class="avatar">
					<!-- 用户下拉菜单 -->
					<ul class="dropdown" v-show="isShowDropdown" @mouseleave="hideDropdown">
						<li class="dropdown-item" v-for="(item,index) in dropdownList" :key="index">
							<a href="" @click.prevent="goRouter(item.path)">
								<div class="texts">
									<p class="title">{{item.title}}</p>
									<p class="info" v-if="item.info">{{item.info}}</p>
								</div>
							</a>
						</li>
						<li class="dropdown-item single">
							<a href="" @click.prevent="showToggleTip" @mouseleave="hideToggleTip">
								<div class="texts">
									<p class="title">切换为招聘者</p>
								</div>
							</a>
						</li>
						<li class="dropdown-item single">
							<a href="" @click.prevent="logout">
								<div class="texts">
									<p class="title">
										<i class="el-icon-loading" v-show="logoutIng"></i>
										退出登录
									</p>
								</div>
							</a>
						</li>
						<!-- 切换身份提示 -->
						<transition name="fade-400">
							<div class="toggle-tip" v-show="isShowToggleTip">
								<img src="~/static/img/recruit-tip.gif" alt="">
								<p>在 APP 端“我的 - 设置”中切换为Boss身份后，刷新本页面即可进行招聘</p>
								<div class="triangle"></div>
							</div>
						</transition>
					</ul>
				</div>
				<ul class="link-list fr">
					<li class="link-item" v-for="(item,index) in myLinkList" :key="index">
						<template v-if="item.label">
							<a href="" class="link" @click.prevent="goRouter(item.path)">
								{{item.label}}
								<span v-if="item.isHot" class="hot">hot</span>
							</a>
						</template>
						<template v-if="item.labels">
							<span class="inline-link">
								<template v-for="(it,i) in item.labels" >
									<a href="" class="link" @click.prevent="goRouter(item.path)" :key="'link'+i">{{it.label}}</a>
									<span class="cut" :key="'cut'+i" v-if="i < item.labels.length-1">·</span>
								</template>
							</span>
						</template>
					</li>
				</ul>
			</template>
			<!-- 未登录 -->
			<template v-else>
				<div class="auth">
					<nuxt-link class="auth-button" to="/register">注册</nuxt-link>
					<nuxt-link class="auth-button" to="/login">登录</nuxt-link>
				</div>
				<ul class="link-list fr">
					<li class="link-item" v-for="(item,index) in rightLinkList" :key="index">
						<a href="" class="link" @click.prevent="goRouter(item.path)">
							{{item.label}}
							<span v-if="item.isHot" class="hot">hot</span>
						</a>
					</li>
				</ul>
			</template>

		</div>

	</div>
</template>

<script>
	let selectCity = {//选择的城市
		city: 'guangzhou'
	}
	import { mapGetters } from 'vuex'
	export default{
		name: 'NavBar',
		props: {
			backgroundColor: {//背景有黑色：black 和白色：white 两种
				type: String,
				default: 'black'
			}
		},
		data(){
			return {
				leftLinkList: [
					{label: '首页',path: '/'},
					{label: '广州站',path: ()=>{
						return `/city-site/${selectCity.city}`;
					}},
					{label: '职位',path: ''},
					{label: '公司',path: ''},
					{label: 'APP',path: ''},
					{label: '资讯',path: ''},
				],
				rightLinkList: [
					{label: '上传简历',path: ''},
					{label: '我要找工作',path: '',isHot: true},
					{label: '我要招聘',path: ''},
				],
				myLinkList: [
					{label: '消息',path: ''},
					{
						labels: [
							{label: '简历',path: ''},
							{label: '上传',path: ''},
						]
					},
				],
				dropdownList: [
					{title: '个人中心',info: '推荐职位、编辑在线简历',path: ''},
					{title: '账号设置',info: '修改密码、打招呼和常用语',path: ''},
					{title: '隐私设置',info: '',path: ''},
					{title: '求助助手',info: '',path: ''},
				],
				isShowDropdown: false,
				isShowToggleTip: false,
				logoutIng: false,
			}
		},
		computed:{
			...mapGetters(['isLogin','userInfo']),
			selectCity:{
				set(newVal){
					selectCity = newVal;
				},
				get(){
					return selectCity;
				}
			},
			leftLinkIndex(){
				let currentPath = this.$route.path;
				for(let i in this.leftLinkList){
					let item = this.leftLinkList[i];
					if((typeof item.path === 'string' && item.path === currentPath) ||(typeof item.path === 'function' && item.path() === currentPath)){
						return i;
						break;
					}
				}
				return null;
			}
		},
		watch:{
			isLogin(){//用户登录或者退出登录
				this.isShowDropdown = false;
				this.isShowToggleTip = false;
				this.logoutIng = false;
			},
		},
		methods: {
			goRouter(path){
				if(!path || (typeof path !== 'string' && typeof path !== 'function')){
					return false;
				}
				if(this.$route.path === path){
					window.location.reload();
				}else if(typeof path === 'string'){
          this.$router.push({path});
          // window.location.href = path;
				}else if(typeof path === 'function'){
					this.goRouter(path());
				}
			},
			//切换显示 用户下拉菜单
			showDropdown(){
				this.isShowDropdown = true;
			},
			hideDropdown(){
				this.isShowDropdown = false;
			},
			//切换显示 切换角色提示
			showToggleTip(){
				this.isShowToggleTip = true;
			},
			hideToggleTip(){
				this.isShowToggleTip = false;
			},
			//退出登录
			logout(){
				this.logoutIng = true;
				this.$store.dispatch('logout').finally(()=>{
					this.logoutIng = false;
				})
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		height: 50px;
		background-color: #202329;
		.navbar-inner{
			@include clearfix;
			@include main-content;
			height: 100%;
		}

		.logo{
			float: left;
			.link{
				display: inline-block;
				width: 110px;
				height: 20px;
				padding-top: 15px;
				img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}

		.location{
      @include clear-text-space;
			float: left;
			height: 100%;
			margin: 0 15px;
			cursor: pointer;
			& > *{
				display: inline-block;
				vertical-align: middle;
				margin: 0 5px;
			}
			.location-icon{
				width: 15px;
				height: 20px;
				background: url(~static/img/icon-poi.png) 0 -163px;
				margin: 15px 0;
			}
			.current-location{
				color: $theme-color;
			}
			.toggle-tip{
				font-size: 12px;
				color: #ffffff;
			}
		}

		.link-list{
			float: left;
			height: 100%;
			&.fr{
				float: right;
			}
			.link-item{
				display: inline-block;
				vertical-align: top;
				.link{
					display: block;
					height: 50px;
					line-height: 50px;
					color: #ffffff;
					padding: 0 12px;
					transition: color 200ms ease-in-out;
					position: relative;
					&:hover,&.active{
						color: $theme-color;
					}
					.hot{
						position: absolute;
						top: 8px;
						right: 0;
						height: 15px;
						border-radius: 15px;
						line-height: 15px;
						padding: 0 7px;
						color: #ffffff;
						background-color: #EF505E;
						font-size: 12px;
						transform: translateX(40%);
					}
				}
				.inline-link{
          @include clear-text-space;
					padding: 0 12px;
					color: #ffffff;
					& > *{
						display: inline-block;
						vertical-align: middle;
					}
					.link{
						padding: 0;
					}
					.cut{
						width: 15px;
						text-align: center;
						color: #ffffff;
						font-size: 20px;
					}
				}
			}
		}

		.auth{
			float: right;
			height: 100%;
			.auth-button{
				display: inline-block;
				vertical-align: middle;
				height: 24px;
				line-height: 22px;
				border-radius: 24px;
				border: 1px solid $theme-color;
				box-sizing: border-box;
				color: #ffffff;
				padding: 0 10px;
				margin: 13px 0 13px 18px;
				font-size: 13px;
				transition: color 200ms, background-color 200ms;
				&:hover{
					color: $theme-color;
				}
			}
		}

		&.white{
			background-color: #ffffff;
			.link-list .link-item .link{
				color: $text-common;
				&:hover{
					color: $theme-color;
				}
			}

			.auth .auth-button{
				color: $text-gray;
				&:hover{
					background-color: $theme-color;
					color: #ffffff;
				}
			}
		}

		.userInfo{
			float: right;
			height: 100%;
			position: relative;
			cursor: pointer;
			.username{
				padding-left: 12px;
				margin-right: 18px;
				display: inline-block;
				color:#ffffff;
				line-height: 50px;
				transition: color 200ms;
			}
			&:hover{
				.username{
					color: $theme-color;
				}
			}
			.avatar{
				width: 30px;
				height: 30px;
				display: inline-block;
				vertical-align: middle;
				object-fit: cover;
				border-radius: 50%;
			}
			.dropdown{
				position: absolute;
				right: 0;
				bottom: 0;
				transform: translate(0,100%);
				width: 235px;
				background-color: #F2F5FA;
        box-shadow: 0 0 15px rgba(136,136,136, 0.2);
        z-index: 99;
				.dropdown-item{
					background-color: #ffffff;
					&:hover{
						background-color: #F2F5FA;
					}
					&.single{
						margin-top: 8px;
					}
					&.single:hover{
						background-color: #ffffff;
						a{
							color: $theme-color;
						}
					}
				}
				.dropdown-item a{
					display: block;
					text-decoration: none;
					padding: 0 25px;
				}
				.texts{
					padding: 12px 0;
					border-bottom: 1px solid #F2F5FA;
					.title{
						line-height: 22px;
						i{
							font-size: 20px;
							line-height: 22px;
							vertical-align: top;
						}
					}
					.info{
						color: #999999;
						font-size: 12px;
						line-height: 18px;
					}
				}
				.toggle-tip{
					position: absolute;
					top: 20px;
					left: -20px;
					transform: translate(-100%,0);
					width: 300px;
					height: 280px;
					background-color: #ffffff;
					border-radius: 20px;
					text-align: center;
					box-shadow: 0 0 15px rgba(136,136,136, 0.2);
					img{
						display: inline-block;
						width: 280px;
						height: 180px;
						margin-top: 10px;
					}
					p{
						padding: 10px 35px;
						display: inline-block;
						font-size: 14px;
						line-height: 20px;
					}
					.triangle{
						position: absolute;
						bottom: 30px;
						right: -22px;
						width: 0;
						height: 0;
						border: 12px solid transparent;
						border-left-color: #ffffff;
					}
				}
			}
		}

	}
</style>
