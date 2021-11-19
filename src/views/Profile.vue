<template>
  <div v-if="user">
    <h3>{{ user.username }}'s 프로필</h3>
    <div>
      <span>점수: {{ user.curr_point }} / {{ user.acc_point }}</span><span>  </span>
      <p>팔로잉: {{ user.followings_cnt }}, 팔로워: {{ user.followers_cnt }}</p>
    </div>
    <div v-if="loginUser.username !== user.username">
      {{user.id in loginUser.followings}}
      <div v-if="user.id in loginUser.followings">

        <button class="btn btn-danger" @click="follow">언팔로우</button>
      </div>
      <div v-else>
        <button class="btn btn-primary" @click="follow">팔로우</button>
      </div>
    </div>
    <div>
      <h4>작성한 리뷰(영화)</h4>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

import axios from 'axios'

export default {
  name: 'Profile',
  data: function () {
    return {
      user: null,
    }
  },
  computed: {
    paramsUserName: function () {
      return this.$route.params.username
    },
    ...mapState([
      'loginUser'
    ])
  },
  methods: {
    follow: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }

      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/accounts/${this.user.id}/follow/`,
        headers: config
      })
      .then(res => {
        console.log(res)
        this.getProfileUser()
        this.$store.dispatch('getLoginUser')
      })
      .catch(err => {
        console.log(err)
      })
    },
    setToken: function () {
      const token = localStorage.getItem('JWT')
      const config = {
        Authorization: `Bearer ${token}`
      }
      return config
    },
    getProfileUser: function () {
      // profile 유저 정보 가져오기
      const username = this.$route.params.username

      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/${username}/`,
        headers: this.setToken()
      })
      .then(res => {
        console.log('프로필 유저')
        console.log(res.data)
        this.user = res.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    getLoginUser: function () {
      // profile 유저의 리뷰(영화) 정보 가져오기
      console.log('로그인 유저')
      console.log(this.loginUser)
    }
  },
  created: function () {
    this.getProfileUser()
    this.getLoginUser()
  },
  watch: {
    paramsUserName: function () {
      this.getProfileUser()
      this.getLoginUser()
    }
  }

}
</script>

<style>

</style>