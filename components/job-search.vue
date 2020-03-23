<template>
  <div class="job-search" ref="jobSearch">
    <div class="fixed-row" :class="{fixed: isFixed}">
      <div class="inner animated" :class="{'smaller-bounceInDown': isBounce}" :style="{'animation-duration': animationDuration + 'ms'}">

        <div class="serach-row">
          <a href="/" class="logo"></a>
          <div class="serach">
            <div class="left-row" :class="{'focus': isFocus}" @mouseenter="focusKeyword" @mouseleave="blurKeyword">
              <div class="select" @click.stop="showSelectList">
                <div class="job-type">{{jobTypeLabel}}</div>
                <span class="triangle"></span>
                <select-list @mouseenter.native="blurKeyword" @select="selectJobType" :list="jobTypeList" :visible="isShowSelectList"/>
              </div>
              <div class="keyword-wrap">
                <input type="text" class="keyword" placeholder="搜索职位、公司" v-model="keyword" @focus="showHistory" @blur="hideHistory">
                <ul class="keyword-history" v-if="historyList.length > 0" v-show="isShowHistory">
                  <li class="history-item" v-for="(item,index) in historyList" :key="index" @click="setKeyword(item)"><span>{{item}}</span></li>
                </ul>
              </div>
            </div>
            <button class="button">搜索</button>
          </div>
        </div>

        <div class="hot">
          <span class="label">热门搜索</span>
          <span class="hot-item" v-for="(item,index) in hotList" :key="index" @click="setKeyword(item.label)">{{item.label}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {throttle} from '~/assets/js/utils.js'
  import SelectList from '~/components/select-list'
  import { mapGetters } from 'vuex'
  import {getJobType,getSearchHistory} from '~/assets/api/job'
  export default {
    name: 'JobSearch',
    components: {SelectList},
    props: {
      hotList: {
        type: Array,
        default: () => ([])
      },
    },
    data(){
      return{
        jobTypeList: [],
        historyList: [],
        isFocus: false,
        animationDuration: 400,
        isBounce: false,
        isFixed: false,
        fixedTop: 0,//页面滚动超过这个距离 isFixed = true
        isShowSelectList: false,//是否显示选择职业组件
        keyword: '',
        jobType: null,
        isShowHistory: false,//是否显示搜索历史
      }
    },
    computed:{
      ...mapGetters(['isLogin']),
      jobTypeLabel(){
        return this.jobType && this.jobType.label ? this.jobType.label : '职业类型';
      }
    },
    watch:{
      isLogin(newVal){//登录或者退出登录
        this.refreshHistory();
      }
    },
    methods:{
      //获取职业类型数组
      getJobTypeList(){
        getJobType().then(list => {
          this.jobTypeList = list;
        })
      },
      //刷新我的搜索历史
      refreshHistory(){
        getSearchHistory().then(list => {
          this.historyList = list;
        })
      },
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
      //选择职业的显示和隐藏
      showSelectList(){
        this.isShowSelectList = true;
        this.isShowHistory = false;
      },
      hideSelectList(){
        this.isShowSelectList = false;
      },
      //搜索历史的显示和隐藏
      showHistory(){
        this.isShowHistory = true;
        this.isShowSelectList = false;
      },
      hideHistory(){
        setTimeout(() => {//弄个小延时为了触发点击搜索历史事件
          this.isShowHistory = false;
        },200)
      },
      //选择职业
      selectJobType(job){
        if(job && job.label && job.label !== '不限'){
          this.jobType = job;
        }else{
          this.jobType = null;
        }
        this.hideSelectList();
      },
      //点击热门关键字
      setKeyword(keyword){
        this.keyword = keyword;
      }
    },
    created(){
      this.getJobTypeList();
      this.refreshHistory();
    },
    mounted(){
      //获取滚动判断距离
      let jobSearch = this.$refs.jobSearch;
      this.fixedTop = jobSearch.offsetHeight + jobSearch.offsetTop;
      this.scrollHandler();
      document.addEventListener('scroll',this.scrollHandler);
      //点击外部隐藏职业选择
      document.addEventListener('click',this.hideSelectList);
    },
    beforeDestroy(){
      document.removeEventListener('scroll',this.scrollHandler);
      document.removeEventListener('click',this.hideSelectList);
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
                  @include ellipsis(80px);
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
              }
              .keyword-wrap{
                display: inline-block;
                height: 100%;
                position: relative;
                .keyword{
                  @include placeholder-color;
                  width: 625px;
                  padding: 10px 20px;
                  border: 0;
                  font-size: 16px;
                }
                .keyword-history{
                  position: absolute;
                  width: 100%;
                  top: 100%;
                  right: 0;
                  transform: translate(-1px,1px);
                  background-color: #ffffff;
                  box-shadow: 0 2px 5px rgba(136,136,136,0.3);
                  z-index: 99;
                  .history-item{
                    @include ellipsis(initial);
                    height: 54px;
                    line-height: 54px;
                    padding: 0 30px;
                    border-bottom: 1px solid #F2F5F9;
                    span{
                      color: #8D92A6;
                      font-size: 13px;
                    }
                    &:hover{
                      background-color: #F2F5F9;
                      cursor: pointer;
                      span{
                        color: $theme-color;
                      }
                    }
                  }
                }
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
