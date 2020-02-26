<template>
  <div class="job-search" ref="jobSearch">
    <div class="fixed-row" :class="{fixed: isFixed}">
      <div class="inner animated" :class="{'smaller-bounceInDown': isBounce}" :style="{'animation-duration': animationDuration + 'ms'}">

        <div class="serach-row">
          <a href="/" class="logo"></a>
          <div class="serach">
            <div class="left-row" :class="{'focus': isFocus}" @mouseenter="focusKeyword" @mouseleave="blurKeyword">
              <div class="select">
                <div class="job-type">职业类型</div>
                <span class="triangle"></span>
                <div class="select-wrap" @mouseenter="blurKeyword">
                  <select-list :list="jobTypeList"/>
                </div>
              </div>
              <input type="text" class="keyword" placeholder="搜索职位、公司">
            </div>
            <button class="button">搜索</button>
          </div>
        </div>

        <div class="hot">
          <span class="label">热门搜索</span><span class="hot-item" v-for="(item,index) in hotList" :key="index">{{item.label}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {throttle} from '~/assets/js/utils.js'
  import SelectList from '~/components/select-list.vue'
  export default {
    name: 'JobSearch',
    components: {SelectList},
    props: {
      hotList: {
        type: Array,
        default: () => ([])
      },
      jobTypeList: {
        type: Array,
        default: () => ([])
      },
    },
    data(){
      return{
        isFocus: false,
        // hotList: [ ],
        animationDuration: 400,
        isBounce: false,
        isFixed: false,
        fixedTop: 0,//页面滚动超过这个距离 isFixed = true
        // jobTypeList: [],
      }
    },
    methods:{
      focusKeyword(){
        this.isFocus = true;
      },
      blurKeyword(){
        this.isFocus = false;
      },
      scrollHandler(){
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop >= this.fixedTop){
          this.isFixed = true;
          this.isBounce = true;
        }else{
          this.isFixed = false;
          this.isBounce = false;
        }
      },
    },
    mounted(){
      //获取滚动判断距离
      let jobSearch = this.$refs.jobSearch;
      this.fixedTop = jobSearch.offsetHeight + jobSearch.offsetTop;
      this.scrollHandler();
      document.addEventListener('scroll',this.scrollHandler);
    },
    beforeDestroy(){
      document.removeEventListener('scroll',this.scrollHandler);
    }
  }
</script>

<style lang="scss">
  .job-search{
    height: 130px;
    .fixed-row{
      height: 100%;
      .inner{
        @include center-block;
        width: $main-width;
        .serach-row{
          @include clear-text-space;
          padding-top: 20px;
          height: 50px;
          & > *{
            display: inline-block;
            vertical-align: top;
          }
          .logo{
            display: inline-block;
            width: 110px;
            height: 36px;
            margin-right: 30px;
            padding-top: 16px;
            background-image: url("~static/img/logo-2x.png");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 0 50%;
            opacity: 0;
            pointer-events: none;
            cursor: default;
          }

          $search-height: 50px;
          .serach{
            width: 795px;
            height: $search-height;
            padding-right: 140px;
            background-color: #ffffff;
            position: relative;
            .left-row{
              width: 100%;
              height: $search-height - 2;
              line-height: $search-height - 2;
              box-shadow: 0 0 5px rgba(136,136,136,0.3);
              border: 1px solid #ffffff;
              transition: border 200ms;
              &.focus{
                border-color: $theme-color;
              }
              .select{
                width: 100px;
                height: 100%;
                padding: 0 15px;
                float: left;
                position: relative;
                cursor: pointer;
                .job-type{
                  @include ellipsis;
                  width: 80px;
                  font-size: 16px;
                }
                .triangle{
                  position: absolute;
                  top: 48%;
                  right: 20px;
                  width: 0;
                  height: 0;
                  border: 3px solid transparent;
                  border-top-color: #999999;
                }
                .select-wrap{
                  position: absolute;
                  left: 169px;
                  bottom: -1px;
                  width: 0;
                  height: 0;
                }
              }
              .keyword{
                @include placeholder-color;
                width: 625px;
                padding: 10px 20px;
                border: 0;
                font-size: 16px;
              }
            }
            .button{
              position: absolute;
              top: 0;
              right: 0;
              width: 140px;
              height: 50px;
              border-radius: 0;
              color: #ffffff;
              background-color: $theme-color;
              border: 0;
              cursor: pointer;
              font-size: 16px;
              &:hover{
                background-color: lighten($theme-color, 7%);
              }
            }
          }
        }
        .hot{
          padding: 20px 140px;
          .label{
            width: 80px;
            color: #9FA3B0;
            margin-right: 30px;
          }
          .hot-item{
            color: $theme-color;
            margin-right: 30px;
            cursor: pointer;
          }
        }
      }
      &.fixed{
        width: 100%;
        height: 100px;
        background-color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
        .serach-row{
          padding-top: 25px;
          .logo{
            opacity: 1;
            pointer-events: initial;
            cursor: pointer;
          }
          .serach{
            width: 904px;
            .keyword{
              width: 734px!important;
            }
          }
        }
        .hot{
          display: none;
        }
      }
    }
  }
</style>
