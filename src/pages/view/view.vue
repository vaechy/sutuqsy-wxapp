<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationBarTitleText: '解析成功',
  },
}
</route>
<template>
  <view class="h-screen view bg-c-01-02">
    <wd-tabs v-model="tab" @click="handleClick">
      <block v-if="viewDate.video">
        <view class="center">
          <wd-tab :title="`视频`" name="视频">
            <view class="content">
              <view class=""><video :src="viewDate.video"></video></view>
            </view>
            <view class="btns center">
              <wd-button type="info">复制链接</wd-button>
              <wd-button @click="downVideo(viewDate.video)">下载视频</wd-button>
            </view>
          </wd-tab>
        </view>
      </block>
      <block v-if="viewDate.cover">
        <wd-tab :title="`封面`" name="封面">
          <view class="h-75 w-65 bg-c-01-01 content center mx-a mb-5">
            <img class="h-70 w-60" :src="viewDate.cover" alt="" srcset="" />
          </view>

          <view class="btns center">
            <wd-button type="info">复制链接</wd-button>
            <wd-button @click="onDownCover()">下载封面</wd-button>
          </view>
        </wd-tab>
      </block>
      <block v-if="viewDate.images">
        <wd-tab :title="`图集`" name="图集">
          <view class="content">
            <wd-img
              v-for="(item, index) in viewDate.images"
              :key="index"
              :width="100"
              :height="100"
              :src="item"
              :enable-preview="true"
            />
          </view>
          <view class="btns center">
            <wd-button type="info ">下载单张</wd-button>
            <wd-button :loading="isLoading" @click="onDownImages()">全部下载</wd-button>
          </view>
        </wd-tab>
      </block>
      <block v-if="viewDate.title">
        <wd-tab :title="`文案`" :name="`文案`">
          <view class="content my-2">{{ viewDate.title }}</view>
          <view class="btns center">
            <wd-button type="info">复制文案</wd-button>
            <!-- <wd-button @click="downVideo">下载文档</wd-button> -->
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
    <wd-circle v-model="current" :text="`进度：${current}%`"></wd-circle>
    <wd-message-box></wd-message-box>
  </view>

  <!-- <wd-tabs v-model="tab" animated>
    <block v-if="info.video">
      <wd-tab :title="`视频`"> </wd-tab>
    </block>
    <block>
      <wd-tab :title="`封面`">
        <view class="content"><img :src="info.cover" alt="" srcset="" /></view>
      </wd-tab>
    </block>
    <block v-if="info.images">
      <wd-tab :title="`图集`">
        <view class="content">
          <wd-img
            v-for="(item, index) in info.images"
            :key="index"
            :width="100"
            :height="100"
            :src="item"
            :enable-preview="true"
          />
        </view>
      </wd-tab>
    </block>
    <block>
      <wd-tab :title="`文案`">
        <view class="content">{{ info.title }}</view>
      </wd-tab>
    </block>
  </wd-tabs> -->
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'wot-design-uni'
import { useViewStore } from '@/store/view'
// data
const info = ref({})
const message = useMessage()
const { viewDate } = useViewStore()
console.log(viewDate)

// ui
const current = ref(0)
const isLoading = ref(false)

uni.getStorage({
  key: 'info',
  success: ({ data }) => {
    info.value = data
  },
  fail: () => {},
})
const downVideo = function (url) {
  const downloadTask = uni.downloadFile({
    url, // 仅为示例，并非真实的资源
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveVideoToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            uni.hideLoading()
            uni.showToast({
              title: '保存成功',
              // duration: 2000,
            })
          },
        })
      }
    },
    fail: (err) => {
      uni.showModal({
        title: '提示',
        content: err,
        showCancel: true,
        success: ({ confirm, cancel }) => {},
      })
    },
  })
  downloadTask.onProgressUpdate((res) => {
    uni.showLoading({
      title: `下载中 ${res.progress}%`,
      mask: true,
    })
    // current.value = res.progress;
    // console.log('下载进度百分比:' + res.progress); // 下载进度百分比
    // console.log('已经下载的数据长度:' + res.totalBytesWritten); // 已经下载的数据长度，单位 Bytes
    // console.log('预期需要下载的数据总长度:' + res.totalBytesExpectedToWrite); // 预期需要下载的数据总长度，单位 Bytes
  })
}
const downImage = function (url) {
  return new Promise((resolve, reject) => {
    const downloadTask = uni.downloadFile({
      url, // 仅为示例，并非真实的资源
      success: (res) => {
        console.log(res)
        if (res.statusCode === 200) {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              uni.hideLoading()
              uni.showToast({
                title: '保存成功',
                // duration: 2000,
              })
              resolve()
            },
          })
        }
      },
      fail: (err) => {
        uni.showModal({
          title: '提示',
          content: err,
          showCancel: true,
          success: ({ confirm, cancel }) => {},
        })
      },
    })
    downloadTask.onProgressUpdate((res) => {
      uni.showLoading({
        title: `下载中 ${res.progress}%`,
        mask: true,
      })
      // current.value = res.progress;
      // console.log('下载进度百分比:' + res.progress); // 下载进度百分比
      // console.log('已经下载的数据长度:' + res.totalBytesWritten); // 已经下载的数据长度，单位 Bytes
      // console.log('预期需要下载的数据总长度:' + res.totalBytesExpectedToWrite); // 预期需要下载的数据总长度，单位 Bytes
    })
  })
  // 判断是不是图集
  // if (Array.isArray(viewStore.viewDate.images)) {
  //   for (const imageUrl of viewStore.viewDate.images) {
  //     const downloadTask = uni.downloadFile({
  //       imageUrl, // 仅为示例，并非真实的资源
  //       success: (res) => {
  //         console.log(res)
  //         if (res.statusCode === 200) {
  //           uni.saveImageToPhotosAlbum({
  //             filePath: res.tempFilePath,
  //             success: function () {
  //               uni.hideLoading()
  //               uni.showToast({
  //                 title: '保存成功',
  //                 // duration: 2000,
  //               })
  //             },
  //           })
  //         }
  //       },
  //       fail: (err) => {
  //         uni.showModal({
  //           title: '提示',
  //           content: err,
  //           showCancel: true,
  //           success: ({ confirm, cancel }) => {},
  //         })
  //       },
  //     })
  //     downloadTask.onProgressUpdate((res) => {
  //       uni.showLoading({
  //         title: `下载中 ${res.progress}%`,
  //         mask: true,
  //       })
  //       // current.value = res.progress;
  //       // console.log('下载进度百分比:' + res.progress); // 下载进度百分比
  //       // console.log('已经下载的数据长度:' + res.totalBytesWritten); // 已经下载的数据长度，单位 Bytes
  //       // console.log('预期需要下载的数据总长度:' + res.totalBytesExpectedToWrite); // 预期需要下载的数据总长度，单位 Bytes
  //     })
  //   }
  // }
}
const onDownCover = function (url) {
  downImage(viewDate.cover)
}
const onDownImages = async function (url) {
  isLoading.value = true
  for (const url of viewDate.images) {
    const tosk = await downImage(url)
  }
  isLoading.value = false
}

const handleClick = (res) => {}
</script>

<style lang="scss">
.content {
  text-align: center;
}
:deep(.wd-tabs__nav) {
  margin-bottom: 10rpx;
  background-color: #f8f8f8 !important;
}
:deep(.wd-tabs) {
  margin-bottom: 10rpx;
  background-color: #f8f8f8 !important;
}
.btns {
  margin-top: 30rpx;
}
</style>
