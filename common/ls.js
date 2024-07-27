let user_token_key = "__user_token_key__";

function getToken() {
    const lsKey = uni.getStorageSync(user_token_key);
    return lsKey;
}

function setToken(token) {
    uni.setStorageSync(user_token_key, token);
}


export default {
    getToken,
    setToken,
}