<template>
  <ul class="select-list" :style="{
    transform: `translateX(${100 + 100 * index}%)`
  }" v-show="list.length > 0">
    <li class="select-list-item" :class="{
      active: thatIndex == index
    }" v-for="(item,index) in list" :key="index" @mouseenter="hoverHandler(item,index)" @click.stop="selectHandler(item)">{{item.label}}</li>
  </ul>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      index: {
        type: Number,
        default: 0
      },
      activeIndex: {
        default: null
      },
    },
    data(){
      return {
        thatIndex: null
      }
    },
    watch:{
      thatIndex(newVal){
        this.$emit('update:activeIndex',newVal);
      },
      activeIndex(newVal){
        this.thatIndex = newVal;
      }
    },
    methods: {
      hoverHandler(item,index){
        this.thatIndex = index;
        this.$emit('hover',{
          index: this.index,
          i: index,
          children: item.children || []
        })
      },
      selectHandler(item){
        this.$emit('select',item);
      },
    },
  }
</script>

<style lang="scss">
  .select-list{
    width: 170px;
    height: 250px;
    // overflow-x: visible;
    overflow-y: scroll;
    background-color: #ffffff;
    box-shadow: -3px 0 5px rgba(136, 136, 136, 0.1);
    position: absolute;
    z-index: 99;
    top: 0;
    right: 1px;
    transform: translateX(100%);
    .select-list-item{
      @include ellipsis(initial);
      height: 42px;
      line-height: 42px;
      padding: 0 15px;
      color: #8D92A6;
      font-size: 14px;
      background-color: #ffffff;
      &:hover,&.active{
        background-color: #F2F5F9;
      }
    }
  }
</style>
