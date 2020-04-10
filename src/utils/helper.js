import Vue from 'vue'
import router from '../router/index'

let Helper = {};
Helper.install = function (Vue, options) {
    Vue.prototype.jump = function (path){
        return path && this.$route.path != path ? router.push(path):null;
    };

    Vue.prototype.hasErrors = function (fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    Vue.prototype.baseUrl = function (path = '') {
        return process.env.VUE_APP_API_BASE_URL + '/' +path;
    }

    Vue.prototype.authHeader = function (headers = {}) {
        let token = sessionStorage.getItem('access_token');
        return {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            ...headers
        }
    }
};

Vue.use(Helper)
