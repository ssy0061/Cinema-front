<template>
  <div class="my-3">
    <div>
      <div class="card border-dark mb-3 text-white bg-secondary" style="width: 100p;">
        <div class="card-header">
          <div class="row">
            <h5 class="col-4 mb-0" @click="goProfile">{{ review.user.username }}</h5>
            <div class="col-4">평점: {{ review.rated }}</div> 
            <div class="col-2 pe-0" @click="likesRivew">
              <span v-if="liked">
                <font-awesome-icon :icon="['fas', 'heart']" :style="{ color: 'red' }"/>
              </span>
              <span v-else>
                <font-awesome-icon :icon="['far', 'heart']" />
              </span>
            </div>
            <div class="col-2 ps-0">
              {{ likedNum }}
            </div>

          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ review.content }}</h5>
          <p class="card-text"></p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import getToken from '@/util/getToken.js'

import axios from 'axios'

export default {
  name: 'ReviewListItem',
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

<style>

</style>