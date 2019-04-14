import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Tooltip from 'bootstrap-vue/es/directives/tooltip'

import 'vue-material-design-icons/styles.css'

import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

import 'baguettebox.js/dist/baguetteBox.min.css'

import mixin from './mixin/mixin.js'
import api from './mixin/api.js'

import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

Vue.mixin(mixin)
Vue.mixin(api)

Vue.use(BootstrapVue)
Vue.use(Tooltip)

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false

Vue.filter('toDateTime', function (value) {
  if (value) {
    var date = new Date(value)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  } else {
    return null
  }
})
Vue.filter('toDate', function (value) {
  if (value) {
    var date = new Date(value)
    return date.toLocaleDateString()
  } else {
    return null
  }
})

// Set base URL based on environment
var baseUrl = 'http://localhost:8080/frickl-web/v1/'

store.commit('ON_BASE_URL_CHANGED_MUTATION', baseUrl)

router.options.routes.forEach(function (r) {
  if (!r.props) {
    r.props = {}
  }
  r.props.baseUrl = baseUrl

  if (r.children) {
    r.children.forEach(function (c) {
      if (!c.props) {
        c.props = {}
      }
      c.props.baseUrl = baseUrl
    })
  }
})

// Make sure jQuery is available
Vue.use({
  install: function (Vue, options) {
    Vue.prototype.$jQuery = require('jquery')
    window.jQuery = Vue.prototype.$jQuery
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
