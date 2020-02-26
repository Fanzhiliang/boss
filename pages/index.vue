<template>
	<div class="index">
		<!-- 快速登录 -->
		<fast-login-register v-if="!isLogin" />
		<!-- 搜索职位 -->
		<job-search :hotList="hotList" :jobTypeList="jobTypeList"/>
		<div class="temp-div">
			index
		</div>
	</div>
</template>

<script>
	import FastLoginRegister from '~/components/fast-login-register'
	import JobSearch from '~/components/job-search'
  import { mapGetters } from 'vuex'
  import {getHotSearch,getJobType} from '~/assets/api/job'
	export default{
		name: 'Index',
		components: {FastLoginRegister,JobSearch},
		data(){
			return{
        hotList: [],
        jobTypeList: [],
			}
    },
    async asyncData({req}){
      //获取热门搜索、获取职位类型
      let [hotList,jobTypeList] = await Promise.all([
        getHotSearch({},req),
        getJobType({},req)
      ])
      return {
        hotList,
        jobTypeList
      }
    },
		computed: {
			...mapGetters(['isLogin'])
		},
		methods: {

		},
		mounted() {

		},
	}
</script>

<style lang="scss">
	.index{

	}
	.temp-div{
		height: 150vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
