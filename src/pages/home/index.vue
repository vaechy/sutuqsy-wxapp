<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarBackgroundColor: '#eff6ff',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="overflow-hidden h-screen px-34rpx bgc">
    <view class="">
      <wd-notice-bar
        text="速图去水印是一款免费去水印工具，干净无广告，支持各大平台视频图片导出"
        prefix="warn-bold"
      />
    </view>
    <view
      class="mt-10 bg-blue-200 text-white center w-10 h-5 border-rd-full mb-3 ml-2"
      @click="clearText"
    >
      <span class="text-3">清空</span>
    </view>
    <view
      class="bg-gray-100 border-3/10rpx shadow-md border-rd-2xl mb-48rpx bd-blue-500 h-40 center"
    >
      <view class="center overflow-hidden pt-12rpx px-18rpx h-full">
        <view
          class="center w-full h-full text-sm placeholder:italic placeholder:text-slate-400 break-all overflow-auto"
          placeholder=""
          name=""
          id=""
        >
          {{ URLText }}
          <view
            @click="onAffix"
            v-show="isPastedBtn"
            class="w-15 h-8 text-white bg-blue-400 center b-rd-10 active:bg-blue-600"
          >
            <span>粘贴</span>
          </view>
        </view>
      </view>
    </view>

    <view class="center">
      <view
        @click="onResolve"
        class="center border-rd-full active:bg-blue-600 bg-blue-500 w-full h-12"
      >
        <span class="text-white">立即解析</span>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewStore } from '@/store/view'
import { parseService } from '@/services'

import { useMessage } from 'wot-design-uni'
import { useHistoryStore } from '@/store/history'
const { history } = useHistoryStore()
// defineOptions({
// 	options: {
// 		styleIsolation: 'shared'
// 	}
// })
defineOptions({
  name: 'Home',
})
// interfaces
// data
const URLText = ref('')

const message = useMessage()

const api = 'https://apis.xiaofanmo.site/home/api'

// store
const viewData = useViewStore()
// ui
const isPastedBtn = ref(true)
// api
const { runAsync, data, error } = useRequest(parseService, {
  onError: (err) => {
    console.log('onerror', err)
  },
})
// util
function getStrUrl(s) {
  const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g

  s = s.match(reg)
  return s && s.length ? s[0] : null
}

const onResolve = async () => {
  if (URLText.value === '') {
    // const res = await onAffix()
    uni.showToast({
      title: '先去粘贴链接再来解析',
      icon: 'none',
    })
    return
  }
  const url = getStrUrl(URLText.value)
  if (!url) {
    uni.showToast({
      title: '链接有误',
      icon: 'error',
    })
    return
  }
  uni.showToast({
    title: '正在解析',
    icon: 'loading',
    duration: 5000,
  })
  try {
    await runAsync(url)
    if (data.value.code === -1) {
      uni.showToast({
        icon: 'none',
        title: data.value.msg,
        success: () => {
          console.log('xxxxx')
        },
      })
    } else if (data.value.code === '0001') {
      uni.hideLoading()
      viewData.setViewData(data.value.data)
      if (history.length >= 10) {
        history.pop()
      }
      history.unshift({ ...data.value.data, sourceURL: url })
      uni.navigateTo({ url: '/pages/view/index' })
    }
  } catch (error) {}
}
// 获取剪贴板
function onAffix() {
  return new Promise((resolve, reject) => {
    uni.getClipboardData({
      success: (result) => {
        if (result.data === '') {
          uni.showToast({
            title: '剪切板空空如也，先去复制视频链接再来解析',
            icon: 'none',
          })
        } else {
          isPastedBtn.value = false
          URLText.value = result.data
        }
      },
      fail: (error) => {
        message.alert(error)
      },
    })
  })
}
function wxLogin() {
  console.log('dd')

  uni.login({
    provider: 'weixin',
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      const { code } = event
      console.log(code)
      // 客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
      //   uni.request({
      //     url: 'https://www.example.com/loginByWeixin', // 仅为示例，并非真实接口地址。
      //     data: {
      //       code: event.code,
      //     },
      //     success: (res) => {
      //       // 获得token完成登录
      //       uni.setStorageSync('token', res.token)
      //     },
      //   })
    },
    fail: function (err) {
      // 登录授权失败
      // err.code是错误码
      console.log(err)
    },
  })
}
function clearText() {
  URLText.value = ''
  isPastedBtn.value = true
}
function getWXCode() {
  uni.login({
    provider: 'weixin', // 使用微信登录
    success: function (loginRes) {
      console.log(loginRes)
    },
  })
}
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style lang="scss">
.main-title-color {
  color: #d14328;
}

.banner {
  /* background: #cac531; */
  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #f3f9a7, #cac531); */
  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #f3f9a7, #cac531); */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
:deep(.wd-textarea__value) {
  padding-right: 0rpx !important;
}
.textarea-sty {
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(128, 128, 128, 0.25);
}
</style>
