<template>
  <view class="content">
    <!-- 该组件免费，但版权问题需关注“前端组件开发”公众号获取授权。 -->

    <!-- 顶部选项卡 -->
    <scroll-view
      id="nav-bar"
      class="nav-bar"
      scroll-x
      scroll-with-animation
      :scroll-left="scrollLeft"
    >
      <view
        v-for="(item, index) in tabArr"
        :key="item.id"
        class="nav-item"
        :class="{ current: index === tabCurrentIndex }"
        :id="'tab' + index"
        @click="changeTab(index)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
  </view>
</template>

<script>
let windowWidth = uni.getSystemInfoSync().windowWidth,
  scrollTimer = false,
  tabBar
export default {
  data() {
    return {
      tabCurrentIndex: 0, //当前选项卡索引
      scrollLeft: 0, //顶部选项卡左滑距离
    }
  },
  props: {
    tabArr: {
      type: Array,
      default() {
        return []
      },
    },
  },

  methods: {
    //tab切换
    async changeTab(e) {
      if (scrollTimer) {
        //多次切换只执行最后一次
        clearTimeout(scrollTimer)
        scrollTimer = false
      }
      let index = e
      //e=number为点击切换，e=object为swiper滑动切换
      if (typeof e === 'object') {
        index = e.detail.current
      }
      if (typeof tabBar !== 'object') {
        tabBar = await this.getElSize('nav-bar')
      }
      //计算宽度相关
      let tabBarScrollLeft = tabBar.scrollLeft
      let width = 0
      let nowWidth = 0
      //获取可滑动总宽度
      for (let i = 0; i <= index; i++) {
        let result = await this.getElSize('tab' + i)
        width += result.width
        if (i === index) {
          nowWidth = result.width
        }
      }
      if (typeof e === 'number') {
        //点击切换时先切换再滚动tabbar，避免同时切换视觉错位
        this.tabCurrentIndex = index
      }
      console.log('windowWidth = ' + windowWidth)
      //延迟300ms,等待swiper动画结束再修改tabbar
      scrollTimer = setTimeout(() => {
        if (width - nowWidth / 2 > windowWidth / 2) {
          //如果当前项越过中心点，将其放在屏幕中心
          this.scrollLeft = width - nowWidth / 2 - windowWidth / 2
        } else {
          this.scrollLeft = 0
        }
        if (typeof e === 'object') {
          this.tabCurrentIndex = index
        }
        this.tabCurrentIndex = index
      }, 300)

      this.$emit('tabChange', this.tabCurrentIndex)
    },
    //获得元素的size
    getElSize(id) {
      return new Promise((res, rej) => {
        // 在自定义组件中，使用wx.createSelectorQuery() 不能用wx. 而是this.createSelectorQuery()
        // 微信文档： 但是在uni的官方文档中并没有关于需要切换this的介绍，是用uni.createSelectorQuery()在自定义组件内部也是无效的。

        // #ifdef MP-WEIXIN
        let el = this.createSelectorQuery().select('#' + id)
        // #endif

        // #ifdef H5 || APP-PLUS

        let el = uni.createSelectorQuery().select('#' + id)

        // #endif

        el.fields(
          {
            size: true,
            scrollOffset: true,
            rect: true,
          },
          (data) => {
            res(data)
          },
        ).exec()
      })
    },
  },
}
</script>

<style lang="scss">
.content {
  background-color: #f8f8f8;
  height: 100%;
  overflow: hidden;
}

/* 隐藏滚动条scrollbar */
.nav-bar ::-webkit-scrollbar {
  display: none;
  background-color: transparent;
}

/* 顶部tabbar */
.nav-bar {
  position: relative;
  z-index: 10;
  height: 90upx;
  white-space: nowrap;
  box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
  background-color: #fff;

  .nav-item {
    display: inline-block;
    width: 150upx;
    height: 90upx;
    text-align: center;
    line-height: 90upx;
    font-size: 30upx;
    color: #303133;
    position: relative;

    &:after {
      content: '';
      width: 0;
      height: 0;
      border-bottom: 4upx solid #007aff;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      transition: 0.3s;
    }
  }

  .current {
    color: #007aff;

    &:after {
      width: 50%;
    }
  }
}
</style>
