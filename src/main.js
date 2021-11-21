import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 사용할 fontawesome 아이콘을 개별 import (library.add도 필수)
// 사용 예시 : <font-awesome-icon :icon="['fas', 'heart']" />
// solid
import { faHeart } from '@fortawesome/free-solid-svg-icons' 
// brands
// import { faFontAwesome as fabFontAwesome } from '@fortawesome/free-brands-svg-icons'
// regular
// import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'


library.add(faHeart)
// library.add(farHeart)
// library.add(fabFontAwesome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
