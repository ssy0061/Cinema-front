<template>
  <div>
    Signup
    
    <div>
      <label for="username">아이디</label>
      <input 
        type="text" 
        id="username"
        v-model="credentials.username"
        placeholder="Id"
      >
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input 
        type="password" 
        id="password"
        v-model="credentials.password"
        placeholder="Password"
      >
    </div>
    <div>
      <label for="passwordConfirmation">비밀번호 확인</label>
      <input 
        type="password" 
        id="passwordConfirmation"
        v-model="credentials.passwordConfirmation"
        placeholder="Confirm Password"
      >
    </div>
    <button class="btn btn-primary" @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  methods: {
    signup: function () {
      console.log('signup')

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials
      })
      .then(res => {
        console.log(res)
        this.$router.push({ name: 'Login' })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>