function getNewUserToken() {
	return "user_" + Math.random();
}

function getNowCtime() {
	return new Date().getTime();
}

module.exports = {
	getNewUserToken,
	getNowCtime,
}