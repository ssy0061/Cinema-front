<template>
  <div class="mb-3">
    <div class="container-fluid">
      <div class="card border-secondary border-2 mb-3 text-white">
        <div class="card-header border-secondary border-1">
          <div class="container row" style="font-size: 1.5rem;">
            <p class="col-2 mb-0" @click="goProfile">{{ review.user.username }}</p>
            <star-rating class="col-8 mb-0" :rating="review.rated/2" :read-only="true" :increment="0.01" :star-size="25"></star-rating>
            <div class="col-1 pe-0" @click="likesRivew">
              <span v-if="liked">
                <font-awesome-icon :icon="['fas', 'heart']" :style="{ color: 'red' }" size="lg"/>
              </span>
              <span v-else>
                <font-awesome-icon :icon="['far', 'heart']" size="lg" />
              </span>
            </div>
            <div class="col-1 ps-0">
              {{ likedNum }}
            </div>

          </div>
        </div>
        <div class="card-body" style="font-size: 1.4rem;">
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

<style scoped>
.card {
  background-color: #2f2f2f !important;
}
</style>