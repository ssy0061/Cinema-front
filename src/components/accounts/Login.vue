<template>
  <div>
    Login
    <div>
      <form>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="아이디">
          <label for="floatingInput">아이디</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="비밀번호">
          <label for="floatingPassword">비밀번호</label>
        </div>

        <!-- <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
          <label class="form-check-label" for="rememberPasswordCheck">
            Remember password
          </label>
        </div> -->

        <div class="d-grid">
          <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>
          <!-- <div class="text-center">
            <a class="small" href="#">Forgot password?</a>
          </div> -->
        </div>

      </form>
    </div>


    <div>
      <div>
        <input 
          type="text" id="username" 
          v-model="credentials.username"
          placeholder="아이디"
        > 
        <br>
        <input 
          type="password" 
          id="password" 
          v-model="credentials.password"
          @keyup.enter="login"
          placeholder="비밀번호"
        >
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
        mehtod: 'post',
        url: 'http://127.0.0.1:8000/accounts/api/token/',
        data: this.credentials
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('JWT', res.data.access)
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