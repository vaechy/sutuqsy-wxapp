import 'animate.css'
import Vue, { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import { routeInterceptor, requestInterceptor, prototypeInterceptor } from './interceptors'
import 'virtual:uno.css'
import '@/style/loaders.css'
import shareMixin from '@/shareMixin'

import '@/style/index.scss'
// main.ts
import { setGlobalOptions } from 'vue-request'
// ...
setGlobalOptions({
  manual: true,
  // ...
})

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  app.mixin(shareMixin)
  return {
    app,
  }
}
