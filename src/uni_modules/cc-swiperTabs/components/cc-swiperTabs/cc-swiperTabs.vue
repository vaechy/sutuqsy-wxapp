<template>
  <!--组件-->
  <scroll-view
    class="scroll"
    scroll-x="false"
    scroll-with-animation
    :scroll-into-view="'tab-' + scrollIntoView"
    :style="{ height: curSwiperHeight + 'rpx' }"
  >
    <view
      class="swiperTab"
      v-for="(item, index) in swiperTabList"
      :key="index"
      :style="{ width: curSwiperWidth, lineHeight: curSwiperHeight + 'rpx' }"
      :id="'tab-' + index"
      @tap="CurrentTab(index, item)"
    >
      <!--导航标题-->
      <text
        class="textTitle"
        :style="{ color: swiperTabIdx == index ? swiperCurrentColor : swiperColor }"
      >
        {{ item }}
      </text>
      <!--导航标题-->

      <!--线条-->
      <view class="swiperLine" v-show="curSwiperLineShow">
        <view
          class="swiperLineActive"
          :class="[swiperTabIdx == index && curSwiperLineAnimatie ? 'currentLine' : '']"
          :style="{
            width: curSwiperLineActiveWidth,
            height: curSwiperLineActiveHeight,
            background: curSwiperLineActiveBg,
          }"
          v-if="swiperTabIdx == index"
        ></view>
      </view>
      <!--线条-->
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      scrollIntoView: 0,
    }
  },
  onLoad() {},
  props: {
    swiperTabList: {
      type: Array,
    }, //导航列表
    swiperTabIdx: {
      type: Number,
    }, //导航对应列表下标
    swiperColor: {
      type: String,
    }, //导航栏字体未选中前颜色
    swiperCurrentColor: {
      type: String,
    }, //选中当前导航栏字体颜色
    curSwiperWidth: {
      type: String,
    }, //当前导航的宽度 % upx rpx px
    curSwiperHeight: {
      type: Number,
    }, //当前导航的高度度 rpx px
    curSwiperLineShow: {
      type: Boolean,
    }, //是否显示线条
    curSwiperLineActiveWidth: {
      type: String,
    }, //当前选中的导航栏线条的宽度
    curSwiperLineActiveHeight: {
      type: String,
    }, //当前选中的导航栏线条的高度度
    curSwiperLineActiveBg: {
      type: String,
    }, //当前选中的导航栏线条颜色
    curSwiperLineAnimatie: {
      type: Number,
      default: 280,
    }, //当前选中的导航栏线条过渡效果
  },
  methods: {
    CurrentTab: function (index, item) {
      this.scrollIntoView = Math.max(0, index - 1)
      this.$emit('change', index, item)
    },
  },
}
</script>

<style>
.scroll ::-webkit-scrollbar {
  display: none;
  background-color: transparent;
}

.scroll {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap;
  white-space: nowrap;
  background-color: white;
}

.swiperTab {
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.swiperLine {
  position: absolute;
  bottom: 6px;
  left: 0;
  width: 100%;
  z-index: 10;
}

.swiperLineActive {
  margin: 0 auto;
  border-radius: 30upx;
}

@keyframes currentLine {
  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
}

.currentLine {
  animation: currentLine 300ms forwards;
}

.textTitle {
  font-size: 32rpx;
  font-weight: 500;
}
</style>
