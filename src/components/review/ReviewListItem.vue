<template>
  <div class="mb-3">
    <div class="container-fluid">
      <div class="card border-secondary border-2 mb-3 text-white">
        <div class="card-header border-secondary border-1">
          <div class="container row" style="font-size: 1.5rem;">
            <div class="col-9">
              <p class="rink mb-0" @click="goProfile">{{ review.user.username }}</p>
              <star-rating class="mb-0" :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
            </div>
            <div class="rink col-3 px-0 heart-size d-flex justify-content-center align-items-center" @click="likesRivew" >
              <span v-if="liked">
                <font-awesome-icon :icon="['fas', 'heart']" :style="{ color: 'red' }"/>
              </span>
              <span v-else>
                <font-awesome-icon :icon="['far', 'heart']"/>
              </span>
              <span class="ms-3" style="font-size: 1.5rem">
                {{ likedNum }}
              </span>
            </div>

          </div>
        </div>
        <div class="card-body cursor-po" style="font-size: 1.4rem;" @click="goReview">
          <p class="card-title mb-0">{{ review.content }}</p>
          <p class="card-text mb-0"></p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { mapState } from 'vuex'

import getToken from '@/util/getToken.js'

import axios from 'axios'

export default {
  name: 'ReviewListItem',
  components: {
    StarRating,
  },
  data: function () {
    return {
      liked: null,
      likedNum: null,
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ])
  },
  props: {
    review: Object,
  },
  methods: {
    goProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: `${this.review.user.username}`}})
    },
    goReview: function () {
      this.$router.push({ name: 'Review', params: { reviewId: `${this.review.id}`}})
    },
    getLiked: function () {
      if (this.review.like_users.find(id => this.loginUser.id === id)) {
        this.liked = true
      } else {
        this.liked = false
      }
    },
    likesRivew: function () {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/reviews/${this.review.id}/likes/`,
        headers: getToken()
      })
      .then(res => {
        this.liked = res.data.liked
        if (this.liked) {
          this.likedNum += 1
        } else {
          this.likedNum -= 1
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.getLiked()
    this.likedNum = this.review.like_users.length
  }
}
</script>

<style>
.card {
  background-color: #2f2f2f !important;
}
.heart-size {
  font-size: 2rem;
}
.vue-star-rating-star {
  padding-bottom: 3.5px;
}
</style>