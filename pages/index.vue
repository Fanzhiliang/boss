<template>
  <div class="index">
    <!-- 快速登录 -->
    <fast-login-register v-if="!isLogin" />
    <!-- 搜索职位 -->
    <job-search :hotList="hotList" />
    <div class="temp-div">
      index
    </div>
  </div>
</template>

<script>
import FastLoginRegister from '~/components/fast-login-register'
import JobSearch from '~/components/job-search'
import { mapGetters } from 'vuex'
import { getHotSearch } from '~/assets/api/job'
export default {
  name: 'Index',
  components: { FastLoginRegister, JobSearch },
  data () {
    return {
      hotList: [],
    }
  },
  async asyncData ({ req }) {
    //获取热门搜索
    let [hotList] = await Promise.all([
      getHotSearch({}, req)
    ])
    return {
      hotList
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
}
</script>

<style lang="scss">
.index {
}
.temp-div {
  @include temp-div;
}
</style>
