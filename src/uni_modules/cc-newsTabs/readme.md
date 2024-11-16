# cc-newsTabs

### 我的技术微信公众号

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)

#### 使用方法

```使用方法
<!-- tabArr：tab数组 tabChange：标签栏切换 -->
<cc-newsTabs :tabArr="tabArr" @tabChange="tabChange"></cc-newsTabs>

//初始化数据
tabArr: [{
			name: '关注',
			id: '1',
		},
		{
			name: '推荐',
			id: '2'
		},
		{
			name: '体育',
			id: '3'
		},
		{
			name: '热点',
			id: '4'
		},
		{
			name: '财经',
			id: '5'
		},
		{
			name: '娱乐',
			id: '6'
		},
		{
			name: '军事',
			id: '7'
		},
		{
			name: '历史',
			id: '8'
		},
		{
			name: '本地',
			id: '9'
		}],

// tab标签栏改变事件
tabChange(currentIndex) {

				uni.showModal({
					title: "当前选择序列",
					content: "当前选择序列 = " + currentIndex
				})
			}

```

#### HTML代码实现部分

```html
<template>
  <view class="content">
    <!-- tabArr：tab数组 tabChange：标签栏切换 -->
    <cc-newsTabs :tabArr="tabArr" @tabChange="tabChange"></cc-newsTabs>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabArr: [
          {
            name: '关注',
            id: '1',
          },
          {
            name: '推荐',
            id: '2',
          },
          {
            name: '体育',
            id: '3',
          },
          {
            name: '热点',
            id: '4',
          },
          {
            name: '财经',
            id: '5',
          },
          {
            name: '娱乐',
            id: '6',
          },
          {
            name: '军事',
            id: '7',
          },
          {
            name: '历史',
            id: '8',
          },
          {
            name: '本地',
            id: '9',
          },
        ],
      }
    },

    methods: {
      tabChange(currentIndex) {
        uni.showModal({
          title: '当前选择序列',
          content: '当前选择序列 = ' + currentIndex,
        })
      },
    },
  }
</script>

<style>
  page,
  .content {
    background-color: #f8f8f8;
    height: 100%;
    overflow: hidden;
  }
</style>
```
