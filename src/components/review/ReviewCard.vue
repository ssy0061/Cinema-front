<template>
  <!-- 영화카드(Community & Recommend & Profile) -->
  <div class="d-flex justify-content-center align-self-start" :class="{'col-4': isProfile}">
    <div class="row container justify-content-center">
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
          <p class="mb-0" style="word-wrap:break-word; white-space:pre; width: 350px;">{{ review.content }}</p>
        </div>
      </div>

      <!-- Community -->
      <div v-if="isCommunity" class="col-7">
        api로 영화 불러오기
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
      isCommunity: null,
      isProfile: null,
      isRecommend: null,
    }
  },
  components: {
    StarRating,
  },
  methods: {
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
    // recommend.vue OR profile.vue 확인
    if (this.$route.name === 'Community') {
      this.isCommunity = true
      this.isRecommend = false
      this.isProfile = false
    } else if (this.$route.name === 'Profile') {
      this.isCommunity = false
      this.isRecommend = false
      this.isProfile = true
    } else if (this.$route.name === 'Recommend') {
      this.isCommunity = false
      this.isRecommend = true
      this.isProfile = false
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
</style>