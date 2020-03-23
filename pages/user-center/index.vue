<template>
  <div class="user-center">
    <ul>
      <li>用户id：{{userInfo.userId}}</li>
      <li>用户名：{{userInfo.username}}</li>
      <li>年龄：{{userInfo.age}}</li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'UserCenter',
    middleware: 'auth',
    computed: {
      ...mapGetters(['userInfo'])
    },
  }
</script>

<style lang="scss" scoped>
  .user-center{
    text-align: center;
  }
  ul{
    list-style: initial;
    li{
      list-style: initial;
    }
  }
</style>
