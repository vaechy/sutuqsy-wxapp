<template>
  <view class="app">test</view>
</template>
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  colorTheme: 'red',
  // badgeColor
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
onLaunch(() => {
  const history = uni.getStorageSync('history')
  if (!history) {
    uni.setStorage({
      key: 'history',
      data: [],
      success: function () {
        console.log('创建本地存储成功')
      },
    })
  }
})
onShow(() => {
  console.log(uni.getWindowInfo())
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}
.wot-theme-light {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 0 32rpx 32rpx;
  overflow: hidden;
  background-color: #fbfbef;
}
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
