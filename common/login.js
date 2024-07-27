import request from '@/common/request';
import ls from './ls';

function toLogin(_name, _pass) {
    // request.get('/user/get/token/detail', {}, callback);
}

function autoLogin(callback) {
    const lsKey = ls.getToken();
    if (lsKey) {
        request.cloudCallFunction('user_get_token_detail', {}, callback);
    } else {
        callback(0, {});
    }
}

export default {
    toLogin,
    autoLogin,
}