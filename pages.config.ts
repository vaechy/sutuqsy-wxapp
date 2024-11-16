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
    // blurEffect: 'extralight',
    color: '#8A8A8A',
    selectedColor: '#64748b',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '10px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/h.png',
        selectedIconPath: 'static/tabbar/hHL.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      // {
      //   iconPath: 'static/tabbar/example.png',
      //   selectedIconPath: 'static/tabbar/exampleHL.png',
      //   pagePath: 'pages/about/about',
      //   text: '关于',
      // },
      {
        iconPath: 'static/tabbar/history.png',
        selectedIconPath: 'static/tabbar/historyHL.png',
        pagePath: 'pages/history/index',
        text: '历史',
      },
    ],
  },
})
