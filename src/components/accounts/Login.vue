<template>
  <div class="row justify-content-center">
    <h2>Login</h2>
    <div class="col-6">
      <div class="form-floating mb-3">
        <input 
          type="text" id="username" class="form-control" 
          placeholder="ID"
          v-model="credentials.username"
        >
        <label for="username">아이디</label>
      </div>
      <div class="form-floating mb-3">
        <input 
          type="password" 
          id="password" 
          class="form-control"
          v-model="credentials.password"
          @keyup.enter="login"
          placeholder="비밀번호"
        >
        <label for="password">비밀번호</label>
      </div>
      <div>
        <button class="btn btn-success btn-lg" @click="login">로그인</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login: function () {
      console.log('login')

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api/token/',
        data: this.credentials
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('JWT', res.data.access)
        this.$emit('login')
        this.$router.push({ name: 'Home' })
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