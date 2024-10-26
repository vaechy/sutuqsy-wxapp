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
                    <wd-tag type="primary" @longpress="onLongPress(info.sourceURL)" plain>
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
import { parseService } from '@/services'
const { safeAreaInsets } = uni.getSystemInfoSync()
const { history } = useHistoryStore()
const viewData = useViewStore()
console.log(history)
const initialData = null
const { runAsync, data } = useRequest(parseService)
const onParse = async (url: string) => {
  uni.showLoading({
    title: '正在解析',
    mask: true,
  })
  try {
    await runAsync(url)
    console.log(data)

    if (data.value.code === 0) {
      uni.showToast({
        icon: 'error',
        title: data.value.msg,
        duration: 5000,
      })
    } else if (data.value.code === '0001') {
      uni.hideLoading()
      viewData.setViewData(data.value.data)
      uni.navigateTo({ url: '/pages/view/index' })
    } else {
      uni.showToast({
        title: data.value.message || data.value.msg,
        icon: 'none',
        image: '',
        duration: 1500,
      })
    }
  } catch (error) {}
}
// 长按复制
const onLongPress = (urlText: string) => {
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
</script>
