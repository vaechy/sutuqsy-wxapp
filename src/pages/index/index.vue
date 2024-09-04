<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <!-- <view @touchmove.stop.prevent="() => {}"></view> -->
  <view class="bg-c-01-02 h-screen bg-blue">
    <view class="banner h-50 w-screen mb-5"></view>
    <view class="card">
      <view>
        <view class="text-area"></view>
      </view>
      <view class="px-5">
        <wd-row>
          <wd-col :span="22">
            <view class="text-right" @click="clearText">清空</view>
          </wd-col>
        </wd-row>
        <view class="mb-10 mt-2">
          <wd-row>
            <wd-col :span="24">
              <view class="textarea-broder">
                <wd-textarea border v-model="videoText" placeholder="请在此输入视频(或图集)链接" />
              </view>
            </wd-col>
          </wd-row>
        </view>

        <view v-if="loadingStatus">loading...</view>
        <view class="text-center">
          <wd-row :gutter="0">
            <wd-col :span="12">
              <wd-button plain @click="onAffix" type="info">粘贴链接</wd-button>
            </wd-col>

            <wd-col :span="12">
              <wd-button :loading="isLoading" @click="onResolve">立即解析</wd-button>
            </wd-col>
          </wd-row>
          <wd-message-box></wd-message-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useViewStore } from '@/store/view'
import { postAnalyzeAPI, IResData, IReqParams, IViewData } from '@/service/index/view'
import { useMessage } from 'wot-design-uni'

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
const videoText = ref('')

const uid = '704065'
const key = 'cglnqrsADEKMNQVX18'
const token = '36b9e262bb7d7426b4addafdb70fb040'
const wxappId = '10001'
// const url = 'https://v.douyin.com/irGt92KG/'

const initialData = undefined

const message = useMessage()
const tabbar = ref(2)

const api = 'https://apis.xiaofanmo.site/home/api'
// store
const viewData = useViewStore()
// ui
const loadingStatus = ref(false)
const isLoading = ref(false)
// util
function getStrUrl(s) {
  // let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
  const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g

  s = s.match(reg)
  return s && s.length ? s[0] : null
}
function onResolve() {
  const url = getStrUrl(videoText.value)
  const { loading, error, data, run } = useRequest<IResData>(
    () => postAnalyzeAPI<IResData, IReqParams, any>({ url, token, wxapp_id: wxappId }),
    {
      immediate: false,
      initialData,
    },
  )
  isLoading.value = true
  run()
    .then(
      (res) => {
        console.log(res)
        if (res.code === 0) {
          uni.showToast({
            icon: 'error',
            title: res.msg,
          })
        } else if (res.code === 1) {
          viewData.setViewData(res.data)
          uni.showToast({
            icon: 'success',
            title: res.msg,
          })
          uni.navigateTo({ url: '/pages/view/view' })
        }
        isLoading.value = false
      },
      (error) => {
        throw error
      },
    )
    .catch(() => {})
    .finally(() => {})
}

function onAffix() {
  uni.getClipboardData({
    success: (result) => {
      videoText.value = result.data
    },
    fail: (error) => {
      message.alert(error)
    },
  })
}

function clearText() {
  videoText.value = ''
}
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<style>
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
</style>
