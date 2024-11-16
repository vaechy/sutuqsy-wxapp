# cc-swiperTabs

### 我的技术公众号(私信可加前端技术交流群)

群内气氛颇为不错，应该可能算为数不多专门进行技术交流的前端群，同时也涵盖后端技术产品交流，偶尔成员们会聊天摸鱼。

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)

#### 使用方法

```使用方法
swiperTabList: ["2023-06-10","2023-06-11","2023-06-12","2023-06-13","2023-06-14","2023-06-15"], //导航列表
swiperTabIdx: 0,
swiperColor: '#161616', //导航栏字体未选中前颜色
swiperCurrentColor: '#1D63FF', //选中当前导航栏字体颜色
curSwiperWidth: '26%', //当前导航的宽度 % upx rpx px  （导航超出可左右滑动 ）
curSwiperHeight: 96, //当前导航的高度度 rpx px
curSwiperLineShow: true, //是否显示导航栏的线条 （线条距离标题太近的话可自行修改.swiperLine的css）
curSwiperLineActiveBg: '#1D63FF', //当前选中的导航栏线条颜色
curSwiperLineActiveWidth: '60%', //当前选中的导航栏线条的宽度 upx rpx px
curSwiperLineActiveHeight: '2px', //当前选中的导航栏线条的高度度 upx rpx px

<!--组件-->
<cc-swiperTabs :swiperTabList='swiperTabList' :swiperTabIdx='swiperTabIdx' :curSwiperWidth='curSwiperWidth'
			:curSwiperHeight='curSwiperHeight' :swiperColor='swiperColor' :swiperCurrentColor='swiperCurrentColor'
			:curSwiperLineShow="curSwiperLineShow" :curSwiperLineActiveWidth="curSwiperLineActiveWidth"
			:curSwiperLineActiveHeight="curSwiperLineActiveHeight" :curSwiperLineActiveBg="curSwiperLineActiveBg"
			@change="CurrentTab">
</cc-swiperTabs>


```

#### HTML代码实现部分

```html
<template>
  <view class="content">
    <!--组件-->
    <cc-swiperTabs
      :swiperTabList="swiperTabList"
      :swiperTabIdx="swiperTabIdx"
      :curSwiperWidth="curSwiperWidth"
      :curSwiperHeight="curSwiperHeight"
      :swiperColor="swiperColor"
      :swiperCurrentColor="swiperCurrentColor"
      :curSwiperLineShow="curSwiperLineShow"
      :curSwiperLineActiveWidth="curSwiperLineActiveWidth"
      :curSwiperLineActiveHeight="curSwiperLineActiveHeight"
      :curSwiperLineActiveBg="curSwiperLineActiveBg"
      @change="CurrentTab"
    ></cc-swiperTabs>

    <!-- radioData:单选数据 curIndex：当前选择序列 @change：单选事件 -->
    <ccRadioView :radioData="items" :curIndex="current" @change="radioChange"></ccRadioView>

    <button class="submitBtn" type="primary" @click="submitAppointment">提交预约</button>
  </view>
</template>

<script>
  import ccRadioView from '../../components/ccRadioView.vue'

  export default {
    components: {
      ccRadioView,
    },
    data() {
      return {
        swiperTabList: [
          '2023-06-10',
          '2023-06-11',
          '2023-06-12',
          '2023-06-13',
          '2023-06-14',
          '2023-06-15',
        ], //导航列表
        swiperTabIdx: 0,

        swiperColor: '#161616', //导航栏字体未选中前颜色
        swiperCurrentColor: '#1D63FF', //选中当前导航栏字体颜色
        curSwiperWidth: '26%', //当前导航的宽度 % upx rpx px  （导航超出可左右滑动 ）
        curSwiperHeight: 96, //当前导航的高度度 rpx px

        curSwiperLineShow: true, //是否显示导航栏的线条 （线条距离标题太近的话可自行修改.swiperLine的css）
        curSwiperLineActiveBg: '#1D63FF', //当前选中的导航栏线条颜色
        curSwiperLineActiveWidth: '60%', //当前选中的导航栏线条的宽度 upx rpx px
        curSwiperLineActiveHeight: '2px', //当前选中的导航栏线条的高度度 upx rpx px

        items: [
          {
            value: '1',
            name: '上午9:00-10:00',
          },
          {
            value: '2',
            name: '上午10:00-11:00',
            checked: '',
          },
          {
            value: '3',
            name: '上午11:00-12:00',
          },
          {
            value: '4',
            name: '下午13:00-14:00',
          },
          {
            value: '5',
            name: '下午14:00-15:00',
          },
          {
            value: '6',
            name: '下午15:00-16:00',
          },
          {
            value: '7',
            name: '下午16:00-17:00',
          },
          {
            value: '8',
            name: '下午17:00-18:00',
          },
        ],
        current: 0,
      }
    },
    onLoad() {},
    methods: {
      submitAppointment() {
        uni.showModal({
          title: '预约数据',
          content:
            '日期选择 = ' +
            this.swiperTabList[this.swiperTabIdx] +
            '  时间段选择 = ' +
            this.items[this.current].name,
        })
      },
      //tab点击事件 自行完善需要的代码
      CurrentTab: function (index, item) {
        this.swiperTabIdx = index

        console.log('日期选择' + item + '\n序列' + index)
      },
      radioChange: function (evt) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].value === evt.target.value) {
            this.current = i
            break
          }
        }
      },
    },
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
  }

  .submitBtn {
    width: 90%;
    margin-top: 86rpx;
  }
</style>
```
