<template>
  <!-- 영화카드(Community & Profile) -->
  <div 
    class="d-flex justify-content-center mb-5"
    :class="{
      'col-4 align-self-start': isProfile,
      'container-fluid mx-1': isCommunity,
    }">
    <div class="row container-fluid" 
      :class="{
        'justify-content-center': isProfile,
        'px-0 justify-content-around': isCommunity
      }">
      <!-- 영화카드 -->
      <div class="col-4 card text-white mb-4" style="width: 25rem;">
        <div class="card-header px-1">
          <span :class="[{'align-items-center': isProfile}, {'d-flex': isProfile}]">

            <span v-if="!isProfile" class="mb-0 d-flex" style="font-size: 1.5rem">
              <!-- user level -->
              <span class="link d-flex align-items-center" @click="goProfile(review.user.username)">
                <span 
                  :class="[levelClass(review.user.acc_point)]"
                  class="user-level"
                >{{ level(review.user.acc_point) }}</span>
              </span>
              <span class="link" @click="goProfile(review.user.username)">{{ review.user.username }}</span>
            </span>

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
          <h4 class="card-title">
            <span 
              @click="goDetail(review.movie.id)"
              class="cursor-po"
            >{{ review.movie.title }}
            </span></h4>
        </div>
        <div class="card-body mb-3 review-card cursor-po" @click="goReview">
          <strong style="font-size: 1.3rem word-wrap:break-word;">{{ review.title }}</strong>
          <p class="mb-0" style="word-wrap:break-word; white-space:pre-wrap; width: 350px;">{{ review.content }}</p>
        </div>
      </div>

      <!-- Community -->
      <div v-if="isCommunity" class="col-7" style="height: 400px; magin-left: 100px">
        <button class="similar-button mb-3" @click="getSimilar">비슷한 콘텐츠</button>
        <div class="row">
          <div
            class="col-4"
            v-for="movie in randomSimilar"
            :key="movie.id"
          >
            <img :src="getSimilarUrl(movie)" alt="포스터" style="width: 13rem">
            <p>{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
      isCommunity: null,
      isProfile: null,
      similarMovies: null,
      randomSimilar: null,
    }
  },
  components: {
    StarRating,
  },
  methods: {
    getSimilarUrl: function(movie) {
      return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    },
    getRandom: function () {
      this.randomSimilar = _.sampleSize(this.similarMovies, 3)
    },
    getSimilar: function () {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.review.movie.id}/similar`,
        params: {
          api_key: '01558afb166c2eadee2e5d5648921e61',
          language: 'ko-KR',
        }
      })
      .then(res => {
        this.similarMovies = res.data.results
        this.getRandom()
      })
      .catch(err => {
        console.log(err)
      })
    },
    level: function (point) {
      return Math.floor(point/100)
    },
    levelClass: function (point) {
      return `level-${Math.floor(point/100)}`
    },
    goProfile: function (user) {
      // 리뷰 작성자가 프로필페이지 유저가 아닌 경우 이동
      if (user !== this.$route.params.username ) {
        this.$router.push({ name: 'Profile', params: { username: user}})
      } else {
        console.log(`${user}의 프로필 페이지 입니다.`)
      }
    },
    goDetail: function (id) {
      this.$router.push({ name: 'Movie', params: { movieId: id }})
    },
    goReview: function () {
      this.$router.push({ name: 'Review', params: { reviewId: `${this.review.id}`}})
    },
    likesRivew: function () {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/likes/`,
        headers: getToken()
      })
      .then(res => {
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
    // route.name 확인
    if (this.$route.name === 'Community') {
      this.isCommunity = true
      this.isProfile = false

      // tmdb api로 similar 영화가져오기
      this.getSimilar()

    } else if (this.$route.name === 'Profile') {
      this.isCommunity = false
      this.isProfile = true
    }


    // 좋아요 확인
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
  padding: 10px !important;
}
.review-card {
  text-align: left; 
  border: 1px solid #6c757d; 
  padding: 6px;
  border-radius: 5px;
}
.similar-button {
  background-color: light;
  border: 1px;
  border-color: light;
  color: #2f2f2f;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  font-size: 1.3rem;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}
.similar-button:hover {
  background-color: #2444af;
  color: white;
}
</style>