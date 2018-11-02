// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import mavonEditor from 'mavon-editor'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css'
import 'style/iconfont.css'
import 'style/border.css'
import 'style/reset.css'
import 'style/el-reset.css'
import 'style/common.css'
import './assets/icon/iconfont.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
