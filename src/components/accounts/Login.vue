<template>
  <div class="d-flex justify-content-center my-5">
    
    <div class="card border-secondary mt-5" style="width: 25rem;">
      <div class="card-header border-secondary border-1">
        <h3 class="mb-0 pt-1">로그인</h3>
      </div>
      <div class="card-body pb-0">
        <div class="card-input form-floating mb-3">
          <input 
            type="text" id="username" 
            class="form-control shadow-sm" 
            placeholder="ID"
            v-model="credentials.username"
          >
          <label for="username">아이디</label>
        </div>
        <div class="card-input form-floating mb-2">
          <input 
            type="password" 
            id="password" 
            class="form-control shadow-sm"
            v-model="credentials.password"
            @keyup.enter="login"
            placeholder="비밀번호"
          >
          <label for="password">비밀번호</label>
        </div>
        <div class='d-flex justify-content-start' style="color: light">
          <span @click="goSignup" class="mb-1 ms-1 link">회원가입</span>
        </div>
      </div>
      <div class="card-body pt-0">
        <button @click="login" class="my-button">로그인</button>
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
      // console.log('login')

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api/token/',
        data: this.credentials
      })
      .then(res => {
        // console.log(res)
        localStorage.setItem('JWT', res.data.access)
        this.$emit('login')
        this.$router.push({ name: 'Home' })
      })
      .catch(err => {
        console.log(err)
      })
    },
    goSignup: function () {
      this.$router.push({ name: 'Signup' })
    }
  }
}
</script>

<style scoped>
.card-input {
  color: #2f2f2f !important;
}
.my-button {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 12px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.my-button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>