import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import routes from 'routes';
import Store from 'store';
import App from 'components/App';

require('../scss/style');

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);

const router = new VueRouter({ routes });
const store = new Vuex.Store(Store);

new Vue({
    router,
    store,
    components: {
        App
    }
}).$mount('#app');
