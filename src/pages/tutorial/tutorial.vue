<route lang="json5">
{
  style: {
    navigationBarBackgroundColor: '#eff6ff',
    navigationBarTitleText: '使用教程',
  },
}
</route>

<script lang="ts">
export default {
  name: 'CarbonChevronRight',
}
</script>
<template>
  <view class="h-screen bgc">
    <view class="p-3">
      <view class="text-base">如何复制视频链接</view>

      <view class="text-gray-500 text-sm bx-5">
        打开您的短视频APP，然后点击分享，就会出现一个复制链接的选项，点击复制链接，然后来到小程序，粘贴链接再点解析就可以去水印了。
      </view>
      <view class="center">
        <wd-img
          class=""
          :width="500"
          src="https://s1.ax1x.com/2022/08/20/vsqlB8.png"
          mode="widthFix"
        ></wd-img>
      </view>
      <view class="center">
        <wd-img
          class=""
          :width="500"
          src="https://s1.ax1x.com/2022/08/20/vsqQnf.png"
          mode="widthFix"
        ></wd-img>
      </view>
      <!-- 
      <view class="text-base">02、为什么下载失败</view>

      <view class="text-gray-500 text-sm bx-5">
        由于手机系统及微信的安全机制，视频大小不能超过10M左右，所以超过这个大小的视频，需要解析成功后，复制无水印链接到浏览器下载
      </view>

      <view class="text-gray-500 text-sm bx-5">
        1、如果您是安卓手机，直接复制无水印链接，然后任意一个浏览器打开即可。
      </view>

      <view class="text-gray-400 text-sm bx-5">
        2、如果您是苹果手机，需要下载软件 documents 才能在浏览器中进行下载视频。
      </view> -->
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
.zhu {
  font-size: 32rpx;
  letter-spacing: 8rpx;
}

.fu {
  font-size: 24rpx;
  line-height: 60rpx;
  color: #6b6b6b;
  letter-spacing: 8rpx;
}

image {
  width: 100%;
  border-radius: 15rpx;
}
</style>
