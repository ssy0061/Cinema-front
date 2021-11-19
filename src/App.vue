<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="chk">
        <router-link to="/recommend/">추천</router-link> |
        <router-link 
          :to="{
            name: 'Profile',
            params: { username: loginUser.username }
          }">내 프로필</router-link> |
        <router-link to="#" @click.native="logout">Log Out</router-link>
      </span>
      <span v-else>
        <router-link to="/accounts/signup/">Signup</router-link> |
        <router-link to="/accounts/login/">Login</router-link> |
      </span>
    </div>
    
    <router-view @login="setLogin"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// import axios from 'axios'

export default {
  name: 'App',
  data: function () {
    return {
      chk: false,
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'loginUser'
    ])
  },
  methods: {
    setLogin: function () {
      // 유저 정보 가져오기
      this.$store.dispatch('doLogin')
    },
    logout: function () {
      localStorage.removeItem('JWT')
      this.$router.push({ name: 'Login' })
      this.$store.dispatch('doLogout')
    }
  },
  watch: {
    loginUser: function () {
      if (this.loginUser) {
        this.chk = true
      } else {
        this.chk = false
      }
    }
  },
  created: function () {
    if (localStorage.getItem('JWT')) {
      this.$store.dispatch('refresh')
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
