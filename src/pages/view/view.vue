<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationBarBackgroundColor: '#eff6ff',
    navigationBarTitleText: '解析成功',
  },
}
</route>
<template>
  <view class="h-screen view bgc">
    <wd-tabs v-model="tab" @click="handleClick">
      <block v-if="viewDate.video">
        <view class="center">
          <wd-tab :title="`视频`" name="视频">
            <view class="content">
              <view class=""><video :src="viewDate.video"></video></view>
            </view>
            <view class="btns center justify-evenly">
              <view
                class="center bd-gray-400 border-rd-full active:bg-light-200/100 bg-light-200/0 w-30 h-12"
                @click="onCopyURL(viewDate.video)"
              >
                复制链接
              </view>
              <view
                class="center border-rd-full active:bg-blue-600 bg-blue-500 w-30 h-12"
                @click="downVideo(viewDate.video)"
              >
                保存视频
              </view>
            </view>
          </wd-tab>
        </view>
      </block>
      <block v-if="viewDate.cover && viewDate.video">
        <wd-tab :title="`封面`" name="封面">
          <view class="content center mx-a mb-5">
            <wd-img
              :enable-preview="true"
              :width="250"
              :height="300"
              :src="viewDate.cover"
              alt=""
              srcset=""
              mode="aspectFit"
            />
          </view>

          <view class="btns center justify-evenly">
            <view
              class="center bd-gray-400 border-rd-full active:bg-light-200/100 bg-light-200/0 w-30 h-12"
              @click="onCopyURL(viewDate.cover)"
            >
              复制链接
            </view>
            <view
              class="center border-rd-full active:bg-blue-600 bg-blue-500 w-30 h-12"
              @click="onDownCover()"
            >
              保存封面
            </view>
          </view>
        </wd-tab>
      </block>
      <block v-if="viewDate.images">
        <wd-tab :title="`图集`" name="图集">
          <view class="content">
            <view class="card-swiper">
              <wd-swiper
                @change="onChanage"
                :loop="false"
                :height="380"
                :autoplay="false"
                v-model:current="swiperCurrent"
                custom-indicator-class="custom-indicator-class"
                custom-image-class="custom-image"
                :display-multiple-items="1"
                custom-next-image-class="custom-image-prev"
                custom-prev-image-class="custom-image-prev"
                :indicator="{ type: 'dots' }"
                :list="viewDate.images"
                previousMargin="24px"
                nextMargin="24px"
              ></wd-swiper>
            </view>
          </view>
          <view class="btns center justify-evenly">
            <view
              class="center bd-gray-400 border-rd-full active:bg-light-200/100 bg-light-200/0 w-30 h-12"
              @click="onDownImage"
            >
              保存单张
            </view>
            <view
              class="center border-rd-full active:bg-blue-600 bg-blue-500 w-30 h-12"
              :loading="isLoading"
              @click="onDownImages()"
            >
              全部保存
            </view>
          </view>
        </wd-tab>
      </block>
      <block v-if="viewDate.title">
        <wd-tab :title="`文案`" :name="`文案`">
          <view class="content my-2">{{ viewDate.title }}</view>
          <view class="btns center">
            <view
              class="center bd-gray-400 border-rd-full active:bg-light-200/100 bg-light-200/0 w-30 h-12"
              @click="onCopyURL(viewDate.title)"
            >
              复制文案
            </view>

            <!-- <wd-button @click="downVideo">下载文档</wd-button> -->
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
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
import { useHistoryStore } from '@/store/history'
// data
const info = ref({})
const { viewDate } = useViewStore()
const { history } = useHistoryStore()

// ui
const swiperCurrent = ref(0)

const isLoading = ref(false)
let swiperIndex = 0
// 添加历史记录

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
const onChanage = (current, source) => {
  // console.log(current, source)
  swiperIndex = current.current
}
const onDownCover = function () {
  downImage(viewDate.cover)
}
const onDownImages = async function () {
  isLoading.value = true
  for (const url of viewDate.images) {
    await downImage(url)
  }
  isLoading.value = false
}
const onDownImage = function () {
  console.log(viewDate)
  console.log(viewDate[swiperIndex])

  downImage(viewDate.images[swiperIndex])
  console.log(swiperIndex)

  // downImage(viewDate.cover)
}
const onCopyURL = function (url) {
  uni.setClipboardData({
    data: url,
    success: (result) => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
      })
    },
    fail: () => {},
    complete: () => {},
  })
}
</script>

<style lang="scss">
.content {
  text-align: center;
}
:deep(.wd-tabs__nav) {
  margin-bottom: 10rpx;
  background-color: transparent !important;
}
:deep(.wd-tabs) {
  margin-bottom: 10rpx;
  background-color: transparent !important;
}
.btns {
  margin-top: 100rpx;
}
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;
  :deep(.custom-indicator-class) {
    bottom: -16px;
  }
  :deep(.custom-image) {
    border-radius: 12rpx;
  }
  :deep(.custom-image-prev) {
    height: 168px !important;
  }
}
</style>
