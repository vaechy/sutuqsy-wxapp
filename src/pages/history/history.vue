<route lang="json5">
{
  style: {
    disableScroll: true,
    navigationBarBackgroundColor: '#eff6ff',
    navigationBarTitleText: '历史记录',
  },
}
</route>
<template>
  <view>
    <scroll-view
      scroll-y="true"
      class="w-full h-screen"
      :enhanced="true"
      :bounces="false"
      :show-scrollbar="false"
    >
      <view class="bgc h-full pt-2">
        <view v-for="(info, index) in history" :key="index">
          <wd-card title="">
            <view class="center">
              <view class="h-full w-20 mr-2">
                <wd-img
                  :width="50"
                  :height="50"
                  :src="info.cover"
                  alt=""
                  srcset=""
                  mode="aspectFit"
                  :enable-preview="true"
                ></wd-img>
              </view>

              <view class="w-full h-full flex-col">
                <view>{{ info.title }}</view>

                <wd-tag type="primary" plain>{{ info.sourceURL }}</wd-tag>
              </view>
            </view>

            <template #footer>
              <wd-button @click="onParse(info.sourceURL)" size="small" plain>立即解析</wd-button>
            </template>
          </wd-card>
        </view>
        <view>
          <wd-divider>历史记录储存在本地，且最多支持10条记录</wd-divider>
        </view>
        <view :style="{ height: `${safeAreaInsets.bottom}rpx` }"></view>
      </view>
      <!-- 主要是用 scroll-view 标签包裹住内容  -->
    </scroll-view>
  </view>
</template>
<script lang="ts" setup>
import { useHistoryStore } from '@/store/history'
import { useViewStore } from '@/store/view'
import { postAnalyzeAPI, IResData, IReqParams, IViewData } from '@/service/index/view'
const { safeAreaInsets } = uni.getSystemInfoSync()
const { history } = useHistoryStore()
const viewData = useViewStore()
console.log(history)
const initialData = null
const onParse = (url: string) => {
  console.log(url)
  const { loading, error, data, run } = useRequest<IResData>(
    () => postAnalyzeAPI<IResData, IReqParams, any>({ url }),
    {
      immediate: false,
      initialData,
    },
  )
  uni.showLoading({
    title: '正在解析',
    mask: true,
  })
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
          uni.hideLoading()
          uni.showToast({
            icon: 'success',
            title: res.msg,
            duration: 3000,
            mask: false,
            success: (result) => {
              viewData.setViewData(res.data)
              uni.navigateTo({ url: '/pages/view/view' })
            },
            fail: () => {},
            complete: () => {},
          })
        }
        // isLoading.value = false
      },
      (error) => {
        throw error
      },
    )
    .catch(() => {})
    .finally(() => {})
}
</script>
