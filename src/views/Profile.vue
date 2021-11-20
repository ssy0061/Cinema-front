<template>
  <div>
    <div v-if="user">
      <h3>{{ user.username }}'s 프로필</h3>
      <div>
        <span>점수: {{ user.curr_point }} / {{ user.acc_point }}</span><span>  </span>
        <p>팔로잉: {{ user.followings_cnt }}, 팔로워: {{ user.followers_cnt }}</p>
      </div>
      <div v-if="loginUser.username !== user.username">
        <div v-if="chk">
          <button class="btn btn-danger" @click="follow">언팔로우</button>
        </div>
        <div v-else>
          <button class="btn btn-primary" @click="follow">팔로우</button>
        </div>
      </div>
    </div>

    <hr>

    <div v-if="reviews" class="row justify-content-around">
      <h4>작성한 리뷰(영화)</h4>
      <!-- <img :src="posterUrl" alt="포스터" width="300px"> -->
      <review-card
        v-for="review in reviews" 
        :key="review.id"
        :review="review"
      >
      </review-card>
      
    </div>
    
  </div>
</template>

<script>
import ReviewCard from '@/components/review/ReviewCard'

import { mapState } from 'vuex'

import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    ReviewCard
  },
  data: function () {
    return {
      chk: null,
      user: null,
      reviews: null,
      // url: `http://127.0.0.1:8000/movies/${this.reviews.movie.poster_path}/`
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
      .then(() => {
        if (this.chk) {
          this.chk = false
          this.user.followers_cnt -= 1
        } else {
          this.chk = true
          this.user.followers_cnt += 1
        }
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
        this.user = res.data

        // follow <-> unfollow 버튼 변경
        if(this.loginUser.followings.find(id => this.user.id === id)) {
          this.chk = true
        } else {
          this.chk = false
        }

          this.getUserReview()
      })
      .catch(err => {
        console.log(err)
      })
    },
    getUserReview: function () {
      // profile 유저의 리뷰(영화) 정보 가져오기
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/reviews/user/${this.user.id}/`,
        headers: this.setToken()
      })
      .then(res => {
        this.reviews = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getProfileUser()
  },
  watch: {
    paramsUserName: function () {
      this.getProfileUser()
    }
  }

}
</script>

<style>

</style>