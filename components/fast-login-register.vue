<template>
  <div class="fast-login-register">
    <div class="inner">

      <img src="~/static/img/fast-reg.png" alt="" class="cover">

      <div class="fast-form" @click.stop="">
        <img src="~/static/img/fast-reg-text.png" alt="" class="text-img">
        <form class="row-form">
          <div class="inline-input">
            <input type="text" name="mobile" placeholder="输入手机号" v-model="formData.mobile">
          </div>
          <div class="inline-input">
            <input type="text" name="verifyCode" maxlength="6" placeholder="验证码" v-model="formData.verifyCode">
            <span class="input-text" @click.stop="getCode">{{getCodeTip}}</span>
          </div>
          <el-button class="inline-button" :loading="buttonLoading" @click.prevent="submitData">{{buttonLoading?'提交中':'登录/注册'}}</el-button>
        </form>

        <!-- 滑动验证 -->
        <transition name="fade-200">
          <div class="verify-slider" v-show="isShowSlider">
            <div class="slider" ref="slider" @mousemove="moveSlider" @mouseleave="stopMoveSlider" @mouseup="stopMoveSlider">
              {{sliderTip}}
              <div class="slider-item" :class="{
                isTransition: sliderIsTransition
              }" ref="sliderItem" @mousedown="startMoveSlider" :style="{
                left: sliderMoveX + 'px'
              }">
                <i class="success iconfont icon-online" v-if="finalSlider"></i>
                <i class="arrow iconfont icon-double-right" v-else></i>
              </div>
            </div>
            <i class="triangle"></i>
          </div>
        </transition>

      </div>
    </div>

  </div>
</template>

<script>
  import graceChecker from '~/assets/js/graceChecker.js'
  import { Message } from 'element-ui'
  import { throttle } from '~/assets/js/utils.js'
  import { getVerifyCode } from '~/assets/api/user.js'
  import { Button} from 'element-ui'
  export default {
    name: 'FastLoginRegister',//快速登录组件
    components: {
      'el-button': Button
    },
    data(){
      return{
        formData: {
          mobile: '',
          verifyCode: '',
        },
        isShowSlider: false,
        sliderSaveX: 0,
        sliderMoveX: 0,//滑块滑动距离
        sliderAbleMove: false,//滑块能否滑动
        minMoveX: 0,
        maxMoveX: 0,
        finalSlider: false,//完成滑动
        sliderIsTransition: false,//滑块开始过度
        getCodeStatus: 0,//获取验证码的状态，0：未验证、1：验证中、2：发送成功

        maxTime: 60,
        currTime: 0,
        timer: false,

        buttonLoading: false,
      }
    },
    computed:{
      sliderTip(){
        let list = ['请按住滑块，拖到最右边','验证中...','验证成功'];
        return list[this.getCodeStatus];
      },
      getCodeTip(){
        if(this.getCodeStatus <= 1){
          let list = ['获取','稍等'];
          return list[this.getCodeStatus];
        }else{
          return `(${this.currTime}s)`;
        }
      },
    },
    mounted(){
      //绑定隐藏滑动事件
      document.removeEventListener('click',this.hideSlider);
      document.addEventListener('click',this.hideSlider);
    },
    watch:{
      isShowSlider(newVal){//滑块显示后，获取滑块宽度，设置滑动的范围
        if(newVal){
          this.recoverSlider();
          this.$nextTick(()=>{
            this.maxMoveX = this.$refs.slider.offsetWidth - this.$refs.sliderItem.offsetWidth;
          })
        }
      },
      finalSlider(newVal){//完成滑动后，调用获取验证码接口
        if(newVal){
          this.getCodeStatus = 1;
          this.getCode();
        }
      },
    },
    methods:{
      //获取验证码
      getCode(){
        if(graceChecker.check(this.formData,[
          {name: 'mobile',checkType: 'phoneno',errorMsg: '请输入正确的手机号'},
        ])){
          if(this.finalSlider){//完成验证，调用获取验证码接口
            !this.timer && getVerifyCode(this.formData).then((res) => {
              this.getCodeStatus = 2;
              this.isShowSlider = false;
              this.currTime = this.maxTime;
              this.timer = setInterval(() => {
                --this.currTime;
                if(this.currTime <= 0){
                  clearInterval(this.timer);
                  this.recoverSlider();
                }
              }, 1000);
            })
          }else{//还没完成验证，显示滑动验证
            this.isShowSlider = true;
          }
        }else{
          this.recoverSlider();
          Message({
            type: 'error',
            message: graceChecker.error,
            center: true
          })
        }
      },
      hideSlider(){
        this.isShowSlider = false;
      },
      //鼠标在滑动区域移动
      moveSlider: throttle(function({clientX}){
        if(this.sliderAbleMove && !this.finalSlider){
          let sliderMoveX = this.sliderMoveX + (clientX - this.sliderSaveX);
          if(sliderMoveX <= this.minMoveX){
            this.sliderMoveX  = this.minMoveX;
          }else if(sliderMoveX >= this.maxMoveX){
            this.sliderMoveX  = this.maxMoveX;
            this.stopMoveSlider();
          }else{
            this.sliderMoveX  = sliderMoveX;
          }
          this.sliderSaveX = clientX;
        }
      },6),
      //开始滑动
      startMoveSlider({clientX}){
        this.sliderSaveX = clientX;
        this.sliderAbleMove = true;
      },
      //停止滑动
      stopMoveSlider(){
        if(this.sliderMoveX < this.maxMoveX){//移动失败，回到原点
          this.recoverSlider();
        }else if(this.sliderMoveX == this.maxMoveX){
          this.finalSlider = true;
        }
        this.sliderAbleMove = false;
      },
      //恢复滑块到初始位置
      recoverSlider(){
        this.getCodeStatus = 0;
        this.finalSlider = false;
        this.sliderIsTransition = true;
        this.timer = false;
        setTimeout(()=>{
          this.sliderIsTransition = false;
        },150)
        this.sliderMoveX = 0;
      },
      //登录或注册
      submitData(){
        if(graceChecker.check(this.formData,[
          {name: 'mobile',checkType: 'phoneno',errorMsg: '请输入正确的手机号'},
          {name: 'verifyCode',checkType: 'string',checkRule: '6,6',errorMsg: '请输入6位验证码'},
        ])){
          this.buttonLoading = true;
          this.$store.dispatch('loginByVerifyCode',this.formData).then(() => {
            return this.$store.dispatch('getUserInfo');
          }).then((userInfo)=>{
            this.buttonLoading = false;
            Message({
              type: 'success',
              message: '登录成功',
              center: true
            })
          }).catch((err)=>{
            console.log(err);
            this.buttonLoading = false;
          })
        }else{
          Message({
            type: 'error',
            message: graceChecker.error,
            center: true
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .fast-login-register{
    width: 100%;
    height: 120px;
    background-color: lighten($theme-color, 7%);

    .inner{
      @include clearfix;
      @include center-block;
      width: $main-width * 0.91554;
      height: 100%;
      .cover{
        float: left;
        height: 100%;
      }
      .fast-form{
        float: right;
        height: 100%;
        position: relative;
        .text-img{
          height: 25px;
          padding-top: 20px;
          padding-bottom: 15px;
        }
        .row-form{
          @include clear-text-space;
          height: 36px;
          & > *{
            height: 36px;
            line-height: 36px;
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
          }
          .inline-input{
            @include clear-text-space;
            background-color: #ffffff;
            margin-right: 5px;
            & > *{
              display: inline-block;
              vertical-align: top;
            }
            input{
              border: 0;
              font-size: 12px;
              height: 100%;
              padding: 0 10px;
              &[name='mobile']{
                width: 150px;
              }
              &[name='verifyCode']{
                width: 80px;
              }
            }
            .input-text{
              display: inline-block;
              width: 30px;
              margin: 0 15px;
              font-size: 12px;
              color: $theme-color;
              cursor: pointer;
            }
          }
          .inline-button{
            width: 85px;
            border-radius: 0;
            padding: 0 10px;
            border: 1px solid #ffffff;
            background-color: lighten($theme-color, 7%);
            color: #ffffff;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            &:hover{
              background-color: lighten($theme-color, 10%);
            }
          }
        }

        // 滑动验证
        .verify-slider{
          position: absolute;
          left: 0;
          bottom: -35px;
          padding: 5px 7px;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(136, 136, 136, 0.2);
          z-index: 9;
          .slider{
            width: 330px;
            height: 35px;
            line-height: 35px;
            background-color: #EEF0F5;
            text-align: center;
            position: relative;
            font-size: 12px;
            color: #999999;
            cursor: pointer;
            user-select: none;
            .slider-item{
              position: absolute;
              top: 0;
              left: 0;
              width: 40px;
              height: 33px;
              line-height: 33px;
              border: 1px solid #cccccc;
              background-color: #ffffff;
              cursor: move;
              &.isTransition{
                transition: left 100ms;
              }
              .arrow::before{
                font-size: 20px;
                color: #999999;
              }
              .success::before{
                font-size: 18px;
                color: lighten($theme-color, 7%);
              }
            }
          }
          .triangle{
            position: absolute;
            left: 205px;
            top: -14px;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: #ffffff;
          }
        }
      }
    }
  }
</style>
