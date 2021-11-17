<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="isLogin">
        <router-link to="/movie/1/">1번 영화</router-link> |
        <router-link to="/recommend/">추천</router-link> |
        <router-link to="/profile/a/">a 유저 프로필</router-link>
      </span>
      <span v-else>
        <router-link to="/accounts/signup/">Signup</router-link> |
        <router-link to="/accounts/login/">Login</router-link> |
      </span>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
    }
  },
  methods: {
    setLogin: function () {
      this.isLogin = true
    },
    logout: function () {
      localStorage.removeItem('JWT')
      this.isLogin = false
      this.$router.push({ name: 'Login' })
    }
  },
  created: function () {
    if (localStorage.getItem('JWT')) {
      this.isLogin = true
    } else {
      this.isLogin = false
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
