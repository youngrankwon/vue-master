// 로그인, 회원가입, (ex) 회원탈퇴
import { instance } from './index';

// 회원가입 API
function registerUser(userData) {
	return instance.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
	return instance.post('login', userData);
}

export { registerUser, loginUser };
