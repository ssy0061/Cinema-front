<template>
  <div class="col-4">
    <h3>영화리뷰카드</h3>
    <p>{{ review }}</p>

    
    <div class="card" style="width: 25rem;">
      <div class="card-header">
        {{ review.user.username }} | 
        평점(별점???) {{ review.movie.vote_average }} |
        (리뷰 좋아요 수) {{ likes_cnt }} |
        
        <span @click="likesRivew">{{this.chk ? '💖' : '🤍'}}</span>
      </div>
      <img :src="posterUrl" alt="포스터" class="card-img-top">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5 class="card-title">{{ review.movie.title }} ( {{ releaseDate }} )</h5>
        </li>
        <li class="list-group-item">
          <p class="card-text">리뷰 내용: {{ review.content }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import getToken from '@/util/getToken.js'
import { mapState } from 'vuex'

export default {
  name: 'ReviewCard',
  props: {
    review: Object,
  },
  data: function () {
    return {
      posterUrl: null,
      releaseDate: null,
      likes_cnt: this.review.like_users.length
    }
  },
  methods: {
    likesRivew: function () {
      console.log(getToken())
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
    if(this.review.like_users.find(id => this.loginUser.id === id)) {
          this.chk = true
        } else {
          this.chk = false
        }
    this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.review.movie.poster_path}`
    const data = this.review.movie.release_date.split('-')
    this.releaseDate = `${data[0]}. ${data[1]}`
  }
}
</script>

<style>

</style>