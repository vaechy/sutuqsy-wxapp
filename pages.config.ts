import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#8A8A8A',
    selectedColor: '#60a5fa',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      // {
      //   iconPath: 'static/tabbar/example.png',
      //   selectedIconPath: 'static/tabbar/exampleHL.png',
      //   pagePath: 'pages/about/about',
      //   text: '关于',
      // },
      {
        iconPath: 'static/tabbar/my.png',
        selectedIconPath: 'static/tabbar/myHL.png',
        pagePath: 'pages/user/user',
        text: '我的',
      },
    ],
  },
})
