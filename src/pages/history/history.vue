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
    <view v-if="history.length === 0">
      <view class="bgc h-full"><wd-status-tip :image="searchPng" tip="暂无历史内容" /></view>
    </view>
    <view v-else-if="history.length > 0">
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
                  <view>{{ info.desc }}</view>
                  <view>
                    <wd-tag type="primary" @longpress="onLongPress" plain>
                      {{ info.sourceURL }}
                    </wd-tag>
                  </view>
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
  </view>
</template>
<script lang="ts" setup>
import { useHistoryStore } from '@/store/history'
import { useViewStore } from '@/store/view'
import searchPng from '@/static/asstes/search.png'
import { analyzing } from '@/api/methons'
const { safeAreaInsets } = uni.getSystemInfoSync()
const { history } = useHistoryStore()
const viewData = useViewStore()
console.log(history)
const initialData = null
const onParse = async (url: string) => {
  uni.showLoading({
    title: '正在解析',
    mask: true,
  })
  const { data }: any = await analyzing(url)
  console.log(data)

  if (data.code === 0) {
    uni.showToast({
      icon: 'error',
      title: data.msg,
    })
  } else if (data.code === '0001') {
    uni.hideLoading()
    uni.showToast({
      icon: 'success',
      title: data.msg,
      duration: 3000,
      mask: false,
      success: (result) => {
        viewData.setViewData(data.data)
        uni.navigateTo({ url: '/pages/view/view' })
      },
      fail: () => {},
      complete: () => {},
    })
  }
}
// 长按复制
const onLongPress = () => {
  uni.showToast({
    title: '复制链接成功',
    icon: 'none',
    duration: 1500,
  })
}
</script>
