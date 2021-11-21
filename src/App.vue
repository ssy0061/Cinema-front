<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img class="logo" src="@/assets/images/logo4.png" alt=""></router-link>
      <div v-if="chk" class="navi">
        <router-link to="/recommend/">Recommend</router-link> | 
        <router-link 
          :to="{
            name: 'Profile',
            params: { username: loginUser.username }
          }">My Profile
        </router-link> 
      </div>
      <div>
        <span v-if="chk">
          <router-link to="#" @click.native="logout">Log Out</router-link>
        </span>
        <span v-else>
          <router-link to="/accounts/signup/">Signup</router-link> |
          <router-link to="/accounts/login/">Login</router-link>
        </span>
      </div>
      <!-- <div>
        <span v-if="chk" class="navi">
          <router-link to="/recommend/">추천</router-link> |
          <router-link 
            :to="{
              name: 'Profile',
              params: { username: loginUser.username }
            }">내 프로필 |
          </router-link> 
          <router-link to="#" @click.native="logout">Log Out</router-link>
        </span>
        <span v-else>
          <router-link to="/accounts/signup/">Signup</router-link> |
          <router-link to="/accounts/login/">Login</router-link> |
        </span>
      </div> -->
    </div>
    
    <router-view @login="setLogin" class="app-view"/>
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
body {
  background-color: #141414 !important;
  overflow-y: scroll;
}
.app-view {
  width: 1600px;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.logo {
  width: 200px;
  margin: 10px 0 10px 20px;
}
.navi {
  margin-left: -150px;
  font-size: 20px;

}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: inline-block;
  padding: 0 10px 0 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
