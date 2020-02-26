<template>
  <div class="city-site">
    <!-- 快速登录 -->
		<fast-login-register v-if="!isLogin" />
    <!-- 搜索职位 -->
		<job-search :hotList="hotList" :jobTypeList="jobTypeList"/>
    <div class="temp-div">
			city-site
		</div>
  </div>
</template>

<script>
  import FastLoginRegister from '~/components/fast-login-register'
  import JobSearch from '~/components/job-search'
  import { mapGetters } from 'vuex'
  import {getHotSearch,getJobType} from '~/assets/api/job'
  export default {
    name: 'CitySite',
    components: {FastLoginRegister,JobSearch},
    data(){
			return{
        hotList: [],
        jobTypeList: []
			}
    },
    async asyncData({req}){
      //获取热门搜索、获取职位类型
      let [hotList,jobTypeList,title] = await Promise.all([
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
    created(){
      console.log(this.$route.params.city)
      // window.document.title = `[${this.$route.params.city}招聘信息]`
    }
  }
</script>

<style lang="scss">
  .city-site{

  }
  .temp-div{
    @include temp-div;
  }
</style>
