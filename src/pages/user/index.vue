<route lang="json5">
{
  style: {
    navigationBarBackgroundColor: '#eff6ff',
    navigationBarTitleText: '我的',
  },
}
</route>

<script lang="ts"></script>
<template>
  <view class="h-screen bgc backdrop-opacity-35">
    <view class="h-40 center flex-col">
      <!-- <view class="w-16 h-16 border-rd-full bg-gray-400 mb-2 center i-carbon-user-avatar">

      </view>
      <view><span>微信用户</span></view> -->
      <button
        class="w-18 h-18 border-rd-full bg-gray-200 mb-2 center"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image class="h-full w-full" :src="avatarUrl"></image>
      </button>
      <!-- <view class="flex">
        <span class="opacity-0 h-full">{{ nickname }}</span>
        <input class="flex-1" type="nickname" v-model="nickname" />
      </view> -->
    </view>
    <view class="p-5">
      <view
        class="h-13 mb-5 bg-light-50 border-rd-2xl shadow-md y-center justify-between text-base"
        @click="navHistoryPage"
      >
        <view class="ml-3">
          <view class="i-carbon-chart-pie text-rose-400 mr-1 align-sub" />
          <span class="text-gray-500">历史记录</span>
        </view>

        <view class="i-carbon-chevron-right mr-4 c-gray-300"></view>
      </view>
      <view
        class="h-13 mb-5 bg-light-50 border-rd-2xl shadow-md y-center justify-between text-base"
        @click="navTutorialPage"
      >
        <view class="ml-3">
          <view class="i-carbon-data-enrichment text-violet-400 mr-1 align-sub"></view>
          <span class="text-gray-500">使用教程</span>
        </view>

        <view class="i-carbon-chevron-right mr-4 c-gray-300"></view>
      </view>
      <view
        class="h-13 mb-5 bg-light-50 border-rd-2xl shadow-md y-center justify-between text-base"
        @click="navIssuePage"
      >
        <view class="ml-3">
          <view class="i-carbon-help text-amber-400 mr-1 align-sub"></view>
          <span class="text-gray-500">常见问题</span>
        </view>

        <view class="i-carbon-chevron-right mr-4 c-gray-300"></view>
      </view>
      <button
        class="h-13 mb-5 bg-light-50 border-rd-2xl shadow-md y-center justify-between text-base"
        open-type="contact"
      >
        <view class="ml-3">
          <view class="i-carbon-customer-service text-green400 mr-1 align-sub"></view>
          <span class="text-gray-500">联系客服</span>
        </view>

        <view class="i-carbon-chevron-right mr-4 c-gray-300"></view>
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// data
const avatarUrl = ref('https://pic.imgdb.cn/item/66e98982f21886ccc03d512f.png')
const nickname = ref('请输入昵称')
const navTutorialPage = () => {
  uni.navigateTo({ url: '/pages/tutorial/index' })
}
const navIssuePage = () => {
  uni.navigateTo({ url: '/pages/issue/index' })
}
const navHistoryPage = () => {
  uni.navigateTo({ url: '/pages/history/index' })
}
// 获取设置头像
const onChooseAvatar = (e) => {
  avatarUrl.value = e.detail.avatarUrl
  console.log(e.detail)
}

// 获取设置昵称
</script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}

button {
  // position: relative;
  // box-sizing: border-box;
  // display: block;
  // width: 100%;
  // height: 100%;
  padding-right: 0px;
  padding-left: 0px;
  // margin-right: auto;
  // margin-left: auto;
  // overflow: hidden;
  // font-size: 32rpx;
  // line-height: 1.35;
  // color: #000;
  // text-align: center;
  // text-decoration: none;
  // background-color: #fff;
  // -webkit-tap-highlight-color: transparent;
}
</style>
