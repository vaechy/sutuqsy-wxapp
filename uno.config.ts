// uno.config.ts
import {
  type Preset,
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet'

// @see https://unocss.dev/presets/legacy-compat
// import { presetLegacyCompat } from '@unocss/preset-legacy-compat'

const isMp = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false

const presets: Preset[] = []
if (isMp) {
  // 使用小程序预设
  presets.push(presetApplet(), presetRemRpx())
} else {
  presets.push(
    // 非小程序用官方预设
    presetUno(),
    // 支持css class属性化
    presetAttributify(),
  )
}
export default defineConfig({
  theme: {
    colors: {
      // 品牌色
      brand: '#334155',
      // 中性色
      neuter: {
        50: '#ffffff',
        100: '#f9fafb',
        200: '#e5e7eb',
        300: '#030712',
        400: '#000000',
      },
      // 功能色
      // 辅助色
      auxiliary: {},
    },
  },
  presets: [
    ...presets,
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 将颜色函数 (rgb()和hsl()) 从空格分隔转换为逗号分隔，更好的兼容性app端，example：
    // `rgb(255 0 0)` -> `rgb(255, 0, 0)`
    // `rgba(255 0 0 / 0.5)` -> `rgba(255, 0, 0, 0.5)`
    // 与群友的正常写法冲突，先去掉！（2024-05-25）
    // presetLegacyCompat({
    //   commaStyleColorFunction: true,
    // }) as Preset,
  ],
  /**
   * 自定义快捷语句 shortcuts 可以让我们把多个 rule 合并为一个简写形式
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [
    ['bgc', 'bg-gradient-to-b from-blue-50 to-white'],
    ['y-center', 'flex items-center'],
    ['x-center', 'flex justify-center'],
    ['center', 'flex  justify-center items-center'],
    [
      // 简写bd | bd-1rpx |bd-red |bd-x | bd-1-red-x | bd-1-red-500-x
      /^bd(-\d[a-zA-Z]*)*-*(-[a-zA-Z]{2,})*-*(-\d*)*-*(-[ltrbxy]{1,1})*$/,
      ([, width, color, colorNumber, direction]) =>
        `border-solid border-0 border${direction || ''}${width || '-1rpx'} border${color || '-black'}${colorNumber || ''} box-border`,
    ],
  ],
  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg',
    }),
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    [
      // 边框样式简写 bd-r-1-red => border:1rpx solid color /^(bd)(-[trbl])?(-[0-9]*\.*[0-9]*r*p*x*)*(-.+)$/,
      /^(bd)(-[trbl])?(-\dr*p*x*)*(-.+)$/,
      ([, c, d, e, f]) => `border${d || ''}${e || '-1rpx'} border${f} border${d || ''}-solid`,
    ],
    [
      /^(text|bg|border)(-.+)?-c-(\d+)-(\d+)$/,
      ([val, type, g1, g2, g3]) => {
        switch (type) {
          case 'text': {
            return { color: `var(--c-${g2}-${g3})` }
          }
          case 'bg': {
            return { 'background-color': `var(--c-${g2}-${g3})` }
          }
          case 'border': {
            return { 'border-color': `var(--c-${g2}-${g3})` }
          }
          default: {
            return {}
          }
        }
      },
    ],
  ],
})

/**
 * 最终这一套组合下来会得到：
 * mp 里面：mt-4 => margin-top: 32rpx  == 16px
 * h5 里面：mt-4 => margin-top: 1rem == 16px
 *
 * 如果是传统方式写样式，则推荐设计稿设置为 750，这样设计稿1px，代码写1rpx。
 * rpx是响应式的，可以让不同设备的屏幕显示效果保持一致。
 */
