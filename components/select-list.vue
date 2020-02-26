<template>
  <ul class="select-list">
    <li>select-list</li>

    <!-- <select-list /> -->
  </ul>
</template>

<script>
  export default {
    name: 'SelectList',
    props: {
      list: {
        type: Array,
        default: () => ([])
      }
    },
    data(){
      return {

      }
    },
    methods: {

    },
    mounted(){
      console.log(this.list)
    }
  }
</script>

<style lang="scss">
  .select-list{
    width: 170px;
    height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #ffffff;
    box-shadow: -3px 5px 5px rgba(136,136,136,0.1);
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
