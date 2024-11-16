## next-tabs --是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。

> [从uniapp插件市场导入](https://ext.dcloud.net.cn/plugin?name=next-tabs)
> 遇到问题或有建议可以加入QQ群(455948571)反馈  
> 如果觉得组件不错，<font color=#f00>给五星鼓励鼓励</font>咯！

### 如果有使用问题请加群

注意：如果插件问题，请务必给一个完整的复现demo，谢谢配合；
[点击链接加入群聊前端开发（uniapp插件）】](https://qm.qq.com/q/S1bJzQfJAG)

## vue2--使用

```html
<template>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>1、固定顶部</text></view>
  <next-tabs :fixed="true" v-model="current1" :tabs="list1"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>2、基本用法</text></view>
  <next-tabs v-model="current2" :tabs="list1"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>3、胶囊使用-1</text></view>
  <next-tabs
    v-model="current3"
    :tabs="list1"
    :pills="true"
    line-height="0"
    activeColor="#fff"
  ></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>4、胶囊使用-2</text></view>
  <next-tabs
    v-model="current4"
    pillsBorderRadius="30rpx"
    :tabs="list1"
    :pills="true"
    line-height="0"
    activeColor="#fff"
  ></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>5、平铺整个屏幕</text></view>
  <next-tabs v-model="current5" :tabs="list1" :scroll="false"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>6、禁用功能</text></view>
  <next-tabs v-model="current6" field="name" :tabs="list2"></next-tabs>
</template>
```

```js
export default {
  data() {
    return {
      current1: 0,
      current2: 0,
      current3: 0,
      current4: 0,
      current5: 0,
      current6: 0,
      list1: ['兴趣', '爱好', '习惯', '智能科技', '生活', '积极态度'],
      list2: [
        { id: 1, name: '兴趣', disabled: false },
        { id: 2, name: '爱好', disabled: false },
        { id: 3, name: '习惯', disabled: false },
        { id: 4, name: '智能科技', disabled: true },
        { id: 5, name: '生活', disabled: false },
        { id: 6, name: '积极态度', disabled: false },
      ],
    }
  },
}
```

## vue3--使用

```html
<template>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>1、固定顶部</text></view>
  <next-tabs :fixed="true" v-model:value="current1" :tabs="list1"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>2、基本用法</text></view>
  <next-tabs v-model:value="current2" :tabs="list1"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>3、胶囊使用-1</text></view>
  <next-tabs
    v-model:value="current3"
    :tabs="list1"
    :pills="true"
    line-height="0"
    activeColor="#fff"
  ></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>4、胶囊使用-2</text></view>
  <next-tabs
    v-model:value="current4"
    pillsBorderRadius="30rpx"
    :tabs="list1"
    :pills="true"
    line-height="0"
    activeColor="#fff"
  ></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>5、平铺整个屏幕</text></view>
  <next-tabs v-model:value="current5" :tabs="list1" :scroll="false"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>6、禁用功能</text></view>
  <next-tabs v-model:value="current6" field="name" :tabs="list2"></next-tabs>
  <view style="font-size: 16px;color: #666;padding: 10px"><text>7、自定义设置宽度</text></view>
  <next-tabs v-model:value="current7" field="name" :tabs="list3"></next-tabs>
</template>
```

```js
<script setup lang="ts">
	import { ref } from 'vue'

	const list1 = ref(['兴趣','爱好','习惯','智能科技','生活','积极态度'])
	const list2 = ref([
		{ id: 1, name: '兴趣', disabled: false },
		{ id: 2, name: '爱好', disabled: false },
		{ id: 3, name: '习惯', disabled: false },
		{ id: 4, name: '智能科技', disabled: true },
		{ id: 5, name: '生活', disabled: false },
		{ id: 6, name: '积极态度', disabled: false }
	])
	// 自定义设置宽度
	const list3 = ref([
		{ id: 1, name: '兴趣', disabled: false, width: 100 },
		{ id: 2, name: '爱好', disabled: false, width: 100 },
		{ id: 3, name: '习惯', disabled: false, width: 100 },
		{ id: 4, name: '智能科技', disabled: true, width: 100 },
		{ id: 5, name: '生活', disabled: false, width: 100 },
		{ id: 6, name: '积极态度', disabled: false, width: 100 }
	])
	const current1 = ref(0)
	const current2 = ref(0)
	const current3 = ref(0)
	const current4 = ref(0)
	const current5 = ref(0)
	const current6 = ref(0)
	const current7 = ref(0)
</script>
```

## 描述

该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。

可选参数属性列表

| 参数名            | 说明                                       | 类型    | 是否必填 | 默认值  | 可选值 |
| ----------------- | ------------------------------------------ | ------- | -------- | ------- | ------ |
| tabs              | tab 的列表                                 | Array   | 是       | []      | -      |
| value             | 必传(双向绑定的值)                         | Number  | 是       | 0       | -      |
| color             | 默认文字颜色                               | String  | 否       | #333    | -      |
| activeColor       | 选中文字的颜色                             | String  | 否       | #f0ad4e | -      |
| fontSize          | 默认文字大小(rpx 或 px)                    | String  | 否       | 28rpx   | true   |
| bold              | 是否加粗选中项                             | Boolean | 否       | true    | false  |
| scroll            | 是否显示滚动条，平铺设置 false             | Boolean | 否       | true    | false  |
| height            | tab 高度(rpx 或 px)                        | String  | 否       | 60rpx   | -      |
| lineHeight        | lineHeight                                 | String  | 否       | 10rpx   | -      |
| lineColor         | 滑块的颜色                                 | String  | 否       | #f0ad4e | -      |
| lineScale         | 滑块宽度缩放值                             | Number  | 否       | 0.5     | -      |
| lineRadius        | 滑块圆角宽度(rpx 或 px)                    | String  | 否       | 10rpx   | -      |
| pills             | 是否开启胶囊tabsBar                        | Boolean | 否       | false   | true   |
| pillsColor        | 胶囊背景颜色(rpx 或 px)                    | String  | 否       | #f0ad4e | -      |
| pillsBorderRadius | 胶囊圆角宽度(rpx 或 px)                    | String  | 否       | 10rpx   | -      |
| field             | 如果 tabs 子项是对象，输入需要展示的键名   | String  | 否       | 空      | -      |
| bgColor           | 背景色，支持 linear-gradient 渐变          | String  | 否       | #fff    | -      |
| padding           | 整个 tab padding 属性                      | String  | 否       | '0'     | -      |
| fixed             | 是否固定在顶部                             | Boolean | 否       | false   | true   |
| paddingItem       | 选项的边距（设置上下不生效，需要设置高度） | String  | 否       | 0 22rpx | -      |
| lineAnimation     | 是否需要 line 和 pills 的动画              | Boolean | 否       | true    | false  |

# Event 事件

| 事件名 | 说明                     | 类型 | 回调参数 |
| ------ | ------------------------ | ---- | -------- |
| change | 菜单收起时返回的筛选结果 | emit | index    |

## 使用

> [从uniapp插件市场导入](https://ext.dcloud.net.cn/plugin?name=next-tabs)

### 微信小程序在线体验

![](https://lixueshiaa.github.io/webtest/www/static/img/ponder_next.png)

### 预览

### appDemo安装包下载地址：[android安装包](https://lixueshiaa.github.io/webtest/www/static/demo_next.apk);

---

|                              功能预览                               |
| :-----------------------------------------------------------------: |
| ![](https://lixueshiaa.github.io/webtest/www/static/net-tabs-a.gif) |
