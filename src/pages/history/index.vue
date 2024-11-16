<route lang="json5">
{
  style: {
    disableScroll: false,
    navigationBarBackgroundColor: '#334155',
    navigationBarTitleText: '历史记录',
  },
}
</route>
<template>
  <view class="text-[12px] px-2 pt-2 text-center">
    <view v-if="history.length === 0">
      <view>历史记录储存在本地,且最多支持10条记录</view>
      <view><wd-status-tip :image="searchPng" tip="暂无历史内容" /></view>
    </view>
    <view v-else-if="history.length > 0">
      <view class="h-full pt-2">
        <view v-for="(info, index) in history" :key="index" class="bd-neuter-200-b mb-2">
          <view>
            <view class="w-full h-full flex-col mb-2 text-left">
              <view>{{ info.desc }}</view>
              <view class="my-2 text-left">
                <view class="bd-brand inline-block px-2" @longpress="onCopyText(info.sourceURL)">
                  {{ info.sourceURL }}
                </view>
              </view>
              <view class="center text-[12] justify-end">
                <view
                  @click="onCopyText(info.sourceURL)"
                  class="bd-brand border-rd active:bg-neuter-50 py-[4rpx] text-brand leading-5 px-2"
                >
                  复制链接
                </view>
                <view
                  @click="onDelList(index)"
                  :class="{ 'pointer-events-none': isDisabledSave }"
                  class="bd-red-600 border-rd active:text-neuter-200 bg-red-600 py-[4rpx] text-neuter-50 leading-5 px-2 text-align-center mx-2"
                >
                  删除记录
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="mt-1">
          <view
            @click="onDelList()"
            :class="{ 'pointer-events-none': isDisabledSave }"
            class="bd-red-600 border-rd active:text-neuter-200 bg-red-600 py-[4rpx] text-neuter-50 text-lg px-2 text-align-center mx-5"
          >
            删除所有记录
          </view>
        </view>
      </view>
      <!-- 主要是用 scroll-view 标签包裹住内容  -->
    </view>
  </view>
</template>
<script lang="ts" setup>
import { useHistoryStore } from '@/store/history'
import { useViewStore } from '@/store/view'
import searchPng from '@/static/asstes/search.png'
import { parseService } from '@/services'
const { safeAreaInsets } = uni.getSystemInfoSync()
// const { history } = useHistoryStore()
const viewData = useViewStore()
const initialData = null
// const { runAsync, data } = useRequest(parseService)
const history = ref([])
const componentKey = ref(1)
// 获取历史
onShow(() => {
  updateStorage()
})

function onTabItemTap(e) {
  console.log(e)
  // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
}
// 长按复制
const onCopyText = (urlText: string) => {
  uni.setClipboardData({
    data: urlText,
    success: function () {
      uni.showToast({
        title: '复制链接成功',
        icon: 'none',
        duration: 1500,
      })
    },
  })
}
const refreshPage = () => {
  componentKey.value = componentKey.value++ // 改变key以触发重新渲染
}

const updateStorage = () => {
  uni.getStorage({
    key: 'history',
    success: (result) => {
      history.value = result.data
    },
    fail: () => {},
    complete: () => {},
  })
}

// 删除记录
const onDelList = (index) => {
  if (typeof index === 'number') {
    history.value.splice(index, 1)
    console.log(index)
    uni.setStorage({
      key: 'history',
      data: history.value,
      success: (result) => {},
    })
  } else {
    uni.showModal({
      title: '是否清空所有记录',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          uni.setStorage({
            key: 'history',
            data: [],
            success: (result) => {
              history.value = []
              uni.showToast({
                title: '清空记录成功',
                icon: 'success',
                duration: 1000,
              })
            },
          })
        }
      },
    })
  }
}
</script>
<style lang="scss"></style>
