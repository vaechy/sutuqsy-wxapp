export default {
  // 分享给朋友
  onShareAppMessage() {
    return {
      title: '速图去水印', // 自定义标题
      path: '/pages/home/index', // 自定义路径
      imageUrl: '', // 自定义图标
    }
  },
  // 分享给朋友圈
  onShareTimeline() {
    return {
      title: '速图去水印', // 自定义标题
      path: '/pages/home/index', // 自定义路径
      imageUrl: '', // 自定义图标
    }
  },
}
