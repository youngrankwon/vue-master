<template>
	<div class="contents">
		<div class="form-wrapper form-wrapper-sm">
			<form @submit.prevent="submitForm" class="form">
				<div>
					<label for="username">id: </label>
					<input id="username" type="text" v-model="username" />
				</div>
				<p class="validation-text">
					<span class="warning" v-if="!isUsernameValid && username">
						Please enter an email address
					</span>
				</p>
				<div>
					<label for="password">pw : </label>
					<input id="password" type="text" v-model="password" />
				</div>
				<button
					v-bind:disabled="!isUsernameValid || !password"
					type="submit"
					class="btn"
					:class="!isUsernameValid || !password ? 'disabled' : null"
				>
					로그인
				</button>
			</form>
			<p class="log">{{ logMessage }}</p>
		</div>
	</div>
</template>

<script>
import { validateEmail } from '@/utils/validation';

export default {
	data() {
		return {
			// form values
			username: '',
			password: '',
			// log
			logMessage: '',
		};
	},
	computed: {
		isUsernameValid() {
			return validateEmail(this.username);
		},
	},
	methods: {
		async submitForm() {
			try {
				const userData = {
					username: this.username,
					password: this.password,
				};
				await this.$store.dispatch('LOGIN', userData);
				// const { data } = await loginUser(userData);
				// this.$store.commit('setToken', data.token);
				// this.$store.commit('setUsername', data.user.username);
				this.$router.push('/main');
			} catch (error) {
				// 에러 핸들링할 코드
				console.log(error.response.data);
				this.logMessage = error.response.data;
			} finally {
				this.initForm();
			}
		},
		initForm() {
			this.username = '';
			this.password = '';
		},
	},
};
</script>

<style>
.btn {
	color: white;
}
</style>
