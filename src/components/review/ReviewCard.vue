<template>
  <div class="col-4 d-flex justify-content-center">
    <div class="card text-white mb-4" style="width: 25rem;">
      <div class="card-header">
        <span @click="goProfile">
          <div class="cursor-po" style="font-size: 1.5rem">
            {{ review.user.username }}
          </div>
          <star-rating :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25" :show-rating="false"></star-rating>
        </span>
        <span class="d-flex align-items-center">
          <span @click="likesRivew" class="cursor-po pe-2" style="font-size: 2rem">
            <span v-if="chk">
              <font-awesome-icon :icon="['fas', 'heart']" :style="{ color: 'red' }"/>
            </span>
            <span v-else>
              <font-awesome-icon :icon="['far', 'heart']"/>
            </span>
          </span>
          <span style="font-size: 1.5rem">
            {{likes_cnt}}
          </span>
        </span>
      </div>
      <img :src="posterUrl" alt="포스터" class="card-img-top cursor-po" @click="goDetail(review.movie.id)">
      <div class="card-body">
        <h5 class="card-title">
          <span 
            @click="goDetail(review.movie.id)"
            class="cursor-po"
          >{{ review.movie.title }}
          </span></h5>
        <p class="card-text cursor-po" @click="goReview">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import getToken from '@/util/getToken.js'
import { mapState } from 'vuex'

import StarRating from 'vue-star-rating'

export default {
  name: 'ReviewCard',
  props: {
    review: Object,
  },
  data: function () {
    return {
      posterUrl: null,
      releaseDate: null,
      likes_cnt: this.review.like_users.length,
      chk: null,
    }
  },
  components: {
    StarRating,
  },
  methods: {
    goProfile: function () {
      // 리뷰 작성자가 프로필페이지 유저가 아닌 경우 이동
      if (this.review.user.username !== this.$route.params.username ) {
        this.$router.push({ name: 'Profile', params: { username: `${this.review.user.username}`}})
      } else {
        console.log(`${this.review.user.username}의 프로필 페이지 입니다.`)
      }
    },
    goDetail: function (id) {
      this.$router.push({ name: 'Movie', params: { movieId: id }})
    },
    goReview: function () {
      this.$router.push({ name: 'Review', params: { reviewId: `${this.review.id}`}})
    },
    likesRivew: function () {
      // console.log(getToken())
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/likes/`,
        headers: getToken()
      })
      .then(res => {
        console.log(res.data)
        if (res.data.liked) {
          this.likes_cnt++
          this.chk = true
        }else {
          this.likes_cnt--
          this.chk = false
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ])
  },
  created: function () {
    console.log(this.review)
    if(this.review.like_users.find(id => this.loginUser.id === id)) {
          this.chk = true
        } else {
          this.chk = false
        }
    this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.review.movie.backdrop_path}`
    // this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.review.movie.poster_path}`
    const data = this.review.movie.release_date.split('-')
    this.releaseDate = `${data[0]}. ${data[1]}`
  }
}
</script>

<style>
.card {
  background-color: #2f2f2f !important;
}
.card-header {
  
  color: #e5e5e5;
  display: flex;
  justify-content: space-between;
  text-align: left;
  }
.card-body {
  color: #e5e5e5;
}
</style>