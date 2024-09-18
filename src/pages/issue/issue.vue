<route lang="json5">
{
  style: {
    navigationBarBackgroundColor: '#eff6ff',
    navigationBarTitleText: '常见问题',
  },
}
</route>

<script lang="ts"></script>
<template>
  <view class="bgc h-screen">
    <view>
      <view class="bg-list">
        <view
          v-for="(item, index) in problemBox"
          :key="index"
          :title="item.problemTitle"
          class="list-title"
          hover-class="none"
        >
          <view class="text-title">{{ item.problemTitle }}</view>
          <view
            v-for="(problemItem, problemIndex) in item.problemList"
            :key="problemIndex"
            class="list-question"
            hover-class="none"
          >
            <view class="text-item">{{ problemItem.title }}</view>
            <view class="line" v-if="problemIndex != item.problemList.length - 1"></view>
          </view>
        </view>
        <view
          @click="getWXToken"
          class="center bd-gray-400 border-rd-full active:bg-light-200/100 bg-light-200/0 w-30"
        >
          <span class="">刷新token</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { postGetTokenAPI, IResData, IReqParams } from '@/service/wx/wxLogin'
const initialData = null
const getWXToken = () => {
  uni.login({
    provider: 'weixin', // 使用微信登录
    success: function (loginRes) {
      console.log(loginRes.code)
      const { run } = useRequest<IResData>(
        () => postGetTokenAPI<IResData, IReqParams, any>({ code: loginRes.code }),
        {
          immediate: false,
          initialData,
        },
      )
      run().then((res) => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
      })
    },
  })
}
const problemBox = [
  {
    problemTitle: '1、无法下载视频？',
    problemList: [
      {
        title: '请先授权保存到手机相册的权限。',
      },
      {
        title:
          '由于手机系统及微信的安全机制，视频大小不能超过10M左右，所以超过这个大小的视频，需要解析成功后，复制无水印链接到浏览器下载',
      },
    ],
  },
  {
    problemTitle: '2、为什么下载视频那么慢？',
    problemList: [
      {
        title:
          '有些视频比较长，或者多人同时下载，会导致下载速度缓慢，可以点击旁边的【复制链接】按钮到手机浏览器上打开即可使用手机上的网速下载',
      },
    ],
  },
  {
    problemTitle: '3、提示域名不合法等无法下载视频？',
    problemList: [
      {
        title: '可以在解析成功后点击下载按钮旁边的【复制链接】按钮，粘贴到手机浏览器打开即可下载',
      },
    ],
  },
  {
    problemTitle: '4、为什么视频成功解析了还有水印？',
    problemList: [
      {
        title:
          '视频自带的无法去除哦，如果这个视频在该平台APP直接播放是没有水印的，解析后却有水印请联系管理员',
      },
    ],
  },
  {
    problemTitle: '5、提示没有找到用户信息？',
    problemList: [
      {
        title: 'token失效，联系客服重新刷新token即可',
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #f8f8f8;
}
.bg-box {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f8f8f8;
}

.bg-list {
  padding: 30rpx;
  margin-bottom: 100rpx;
  // background-color: #ffffff;
}

.bg-white-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10rpx;
  margin: 30rpx;
  font-size: 32rpx;
  color: #303133;
  background-color: #ffffff;
  border-radius: 20rpx;
}

.vertical-line {
  width: 2rpx;
  height: 20rpx;
  margin-right: 30rpx;
  margin-left: 30rpx;
  background-color: #cecece;
}

.line {
  width: 100%;
  height: 1rpx;
  background-color: #f5f5f5;
}

.text-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.text-item {
  padding: 24rpx;
  font-size: 28rpx;
  color: #999999;
}

.list-title {
  margin-bottom: 30rpx;
}

.list-question {
  font-size: 28rpx;
  color: #606266;
}

.hover {
  background-color: #eee;
  opacity: 0.6;
}

.image {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

.text-feedback {
  padding: 20rpx;
}

.text-top {
  margin: 30rpx;
  font-size: 28rpx;
  color: #999999;
}
</style>
