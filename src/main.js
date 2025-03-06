import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import ECharts from 'vue-echarts'


import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'
import {use} from "echarts";


// 全局注册组件（也可按需注册）
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
])


Vue.component('v-chart',ECharts);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
