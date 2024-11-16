<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarBackgroundColor: '#334155',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="">
    <view class="border-rd p-2 my-2">
      <view class="">
        <wd-notice-bar text="版权归平台作者所有，本程序不储存任何内容" prefix="warn-bold" />
      </view>
      <view
        class="mt-10 bg-blue-200 text-white center w-10 h-5 border-rd-full mb-3 ml-2"
        @click="clearText"
      >
        <span class="text-3">清空</span>
      </view>
      <view class="border-3/10rpx shadow-md border-rd mb-4 bd-brand h-20 center">
        <view class="overflow-hidden pt-16rpx px-16rpx h-full w-full box-border">
          <textarea
            class="w-full leading-[14px] text-[14px] placeholder:text-slate-400 break-all overflow-auto"
            placeholder="请输入需要解析的视频链接"
            name=""
            :value="textareaValue"
            id=""
          />
        </view>
      </view>
      <view class="center">
        <view
          @click="onAffix"
          class="bd b-brand border-rd active:bg-neuter-50 py-1.5 text-brand text-size-4 leading-7.2 px-7.5"
        >
          粘贴链接
        </view>
        <view
          @click="onResolve"
          :class="{ 'pointer-events-none': isdisabled }"
          class="bd b-brand border-rd ml-15 active:text-neuter-200 bg-brand py-1.5 text-neuter-50 text-size-4 leading-7.2 px-7.5 text-align-center"
        >
          立即解析
        </view>
      </view>
    </view>
    <view class="p-2">
      <view class="center absolute mx-auto left-1/2 translate-x-[-50%]">
        <wd-transition class="center" :show="isloading" name="fade">
          <view class="loader-inner line-scale-pulse-out">
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
          </view>
        </wd-transition>
      </view>
      <view v-if="isView" class="border-rd shadow-md center">
        <wd-tabs v-model="tab" @click="onChangeTab">
          <block v-for="item in tabs" :key="item.index" :name="item.name">
            <wd-tab :title="`${item.name}`">
              <view v-if="item.name === '视频'">
                <view class="center"><video :src="reqData.playAddr"></video></view>
                <view class="center my-4">
                  <view
                    @click="onCopyText(reqData.playAddr)"
                    class="bd b-brand border-rd active:bg-neuter-50 py-1.5 text-brand text-size-4 leading-7.2 px-7.5"
                  >
                    复制链接
                  </view>
                  <view
                    @click="onSaveVideo(reqData.playAddr)"
                    :class="{ 'pointer-events-none': isdisabled }"
                    class="bd b-brand border-rd ml-15 active:text-neuter-200 bg-brand py-1.5 text-neuter-50 text-size-4 leading-7.2 px-7.5 text-align-center"
                  >
                    保存视频
                  </view>
                </view>
              </view>
              <view v-if="item.name === '图集'">
                <wd-swiper
                  :list="reqData.pics"
                  v-model:current="currSwiperIndex"
                  :autoplay="false"
                  @click="onClickSwiper"
                  @change="onChangeSwiper"
                  imageMode="aspectFit"
                ></wd-swiper>
                <view class="center"></view>
                <view class="center justify-around my-4">
                  <view
                    @click="onCopyText(reqData.pics[currSwiperIndex])"
                    class="bd b-brand border-rd active:bg-neuter-50 py-1.5 text-brand text-size-4 leading-7.2 px-2"
                  >
                    复制链接
                  </view>
                  <view
                    @click="onSaveImage(reqData.pics[currSwiperIndex])"
                    :class="{ 'pointer-events-none': isDisabledSave }"
                    class="bd b-brand border-rd active:text-neuter-200 bg-brand py-1.5 text-neuter-50 text-size-4 leading-7.2 px-2 text-align-center"
                  >
                    保存单张
                  </view>
                  <view
                    @click="onSaveImages(reqData.pics)"
                    :class="{ 'pointer-events-none': isDisabledSave }"
                    class="bd b-brand border-rd active:text-neuter-200 bg-brand py-1.5 text-neuter-50 text-size-4 leading-7.2 px-2 text-align-center"
                  >
                    保存全部
                  </view>
                </view>
              </view>
              <view v-if="item.name === '封面'">
                <view class="content center">
                  <wd-img
                    :enable-preview="true"
                    :width="300"
                    :height="225"
                    :src="reqData.cover"
                    alt=""
                    srcset=""
                    mode="aspectFit"
                  />
                </view>
                <view class="center my-4">
                  <view
                    @click="onCopyText(reqData.cover)"
                    class="bd b-brand border-rd active:bg-neuter-50 py-1.5 text-brand text-size-4 leading-7.2 px-7.5"
                  >
                    复制链接
                  </view>
                  <view
                    @click="saveImage(reqData.cover)"
                    :class="{ 'pointer-events-none': isDisabledSave }"
                    class="bd b-brand border-rd ml-15 active:text-neuter-200 bg-brand py-1.5 text-neuter-50 text-size-4 leading-7.2 px-7.5 text-align-center"
                  >
                    保存封面
                  </view>
                </view>
              </view>
              <view v-if="item.name === '文案'">
                <view class="center">{{ reqData.desc }}</view>

                <view class="center my-4">
                  <view
                    @click="onCopyText(reqData.desc)"
                    class="bd b-brand border-rd active:bg-neuter-50 py-1.5 text-brand text-size-4 leading-7.2 px-7.5"
                  >
                    复制文案
                  </view>
                </view>
              </view>
            </wd-tab>
          </block>
        </wd-tabs>
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
interface IParseReq {
  code: string | number
  data: IParseReqData
  msg: string
  source: string
}
interface IParseReqData {
  msg: string
  pics: string[]
  desc: string
  cover: string
  playAddr: string
  type: number
}

// data
const textareaValue = ref('')

const message = useMessage()
const currUrl = ref<string>('')
const api = 'https://apis.xiaofanmo.site/home/api'
const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])

// 解析数据
const reqData = ref<Partial<IParseReqData>>({})

// store
const viewData = useViewStore()
// ui
const isPastedBtn = ref(true)
const isdisabled = ref(false)
const isDisabledSave = ref(false)
const isloading = ref(false)
const isView = ref(false)
const currSwiperIndex = ref(0)
// ----------------------------------------------
// videoTabs
const tabs = ref<{ index: number; name: string }[]>([
  { index: 0, name: '视频' },
  { index: 1, name: '封面' },
  { index: 2, name: '文案' },
])
const tab = ref<number>(0)

const onChangeTab = () => {
  console.log(tab.value)
}

// ----------------------------------------------
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
  if (textareaValue.value === '') {
    // const res = await onAffix()
    uni.showToast({
      title: '先去粘贴链接再来解析',
      icon: 'none',
    })
    return
  }
  const url = getStrUrl(textareaValue.value)
  if (currUrl.value === url) {
    uni.showToast({
      title: '解析成功',
      icon: 'success',
    })
    return
  } else {
    currUrl.value = url
  }
  if (!url) {
    uni.showToast({
      title: '链接有误',
      icon: 'error',
    })
    return
  }
  // uni.showToast({
  //   title: '正在解析',
  //   icon: 'loading',
  //   duration: 5000,
  // })
  try {
    isdisabled.value = true
    isView.value = false

    isloading.value = true

    const { code, data } = await parseService<IParseReq>(url)
    isdisabled.value = false
    isloading.value = false
    if (code === -1) {
      uni.showToast({
        icon: 'none',
        title: '视频链接错误,请检查链接',
        success: () => {
          console.log('xxxxx')
        },
      })
    } else if (code === '0001') {
      if (data.type === 2) {
        tabs.value[0] = { index: 0, name: '图集' }
      } else {
        tabs.value[0] = { index: 0, name: '视频' }
      }
      reqData.value = data
      console.log(data)

      // 储存
      uni.getStorage({
        key: 'history',
        success: function (res) {
          console.log(res)

          if (res.data.length >= 10) {
            res.data.pop()
          }
          uni.setStorage({
            key: 'history',
            data: [{ ...data, sourceURL: url }, ...res.data],
            success: function () {
              console.log('添加数据成功')
            },
          })
        },
      })

      isView.value = true
      // uni.navigateTo({ url: '/pages/view/index' })
    } else {
      uni.showToast({
        title: '失败，联系客服',
        icon: 'error',
      })
    }
  } catch (error) {
    console.log(error)

    isloading.value = false
    isdisabled.value = false
    currUrl.value = ''
    uni.showToast({
      icon: 'error',
      title: '请求错误',
    })
  }
}
// 获取剪贴板
function onAffix() {
  return new Promise((resolve, reject) => {
    uni.getClipboardData({
      success: (result) => {
        if (result.data === '') {
          uni.showToast({
            title: '先复制链接再来解析',
            icon: 'none',
          })
        } else {
          isPastedBtn.value = false
          console.log(result.data)

          textareaValue.value = result.data
        }
      },
      fail: (error) => {
        message.alert(error)
      },
    })
  })
}
function onAfterleave() {
  isloading.value = false
  console.log('动画借宿')
}
function onBeforeenter() {
  isloading.value = false
  console.log('动画借宿')
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
  textareaValue.value = ''
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
/**
 * 保存视频文件
 *
 */
const onSaveVideo = (url) => {
  const downloadTask = uni.downloadFile({
    url, // 仅为示例，并非真实的资源
    success: (res) => {
      console.log(res)
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

/**
 *
 * 保存图片
 *
 */

// 保存单张
const saveImage = function (url) {
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
              resolve('保存成功')
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
    })
  })
}
// 保存多张

const onSaveImages = async function (picUrls: string[]) {
  isDisabledSave.value = true
  for (const url of picUrls) {
    await saveImage(url)
  }
  isDisabledSave.value = false
}
// 保存单张
const onSaveImage = async function (picUrl: string) {
  isDisabledSave.value = true
  await saveImage(picUrl)
  isDisabledSave.value = false
}
/**
 * 复制文本
 *
 */
const onCopyText = (url) => {
  uni.setClipboardData({
    data: url,
    success: (result) => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
      })
    },
  })
}
const onClickSwiper = ({ index }, item) => {
  uni.previewImage({
    urls: [...reqData.value.pics],
    current: index,
  })
}
const onChangeSwiper = ({ current }) => {
  // console.log(currSwiperIndex.value)
  currSwiperIndex.value = current
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
:deep(.wd-tabs__line.wd-tabs__line.wd-tabs__line) {
  background-color: #334155;
}
:deep(.wd-tabs.wd-tabs.wd-tabs) {
  width: 100%;
}
:deep(.wd-transition.wd-transition.wd-transition) {
  padding-right: 8rpx;
  padding-left: 8rpx;
}
:deep(.wd-tabs.wd-tabs.wd-tabs) {
  background: none;
}
:deep(.wd-tabs__nav.wd-tabs__nav.wd-tabs__nav) {
  background: none;
}
.textarea-sty {
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(128, 128, 128, 0.25);
}
</style>
