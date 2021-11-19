<template>
  <div class="my-3">
    <h2>리뷰 아이템</h2>
    <div v-if="recommendChk">
      <div>
        <img :src="posterUrl" alt="포스터" width="300px">
      </div>
      <span 
        v-for="genre in review.movie.genres" 
        :key="genre.id"
        class="mx-2"
      >
      {{ genre.name }}</span>
      <h3>{{ review.movie.title }} ( {{ releaseDate }} )</h3>
      <p> {{ review.movie.vote_average }}</p>
      
    </div>

    <div>
      <h4>리뷰</h4>
      {{ review.content }}
      {{ review.rated }} ////
      작성자: <span @click="goProfile">{{ review.user.username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    review: Object,
  },
  data: function () {
    return {
      posterUrl: null,
      releaseDate: null,
      recommendChk: null,
    }
  },
  methods: {
    goProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: `${this.review.user.username}`}})
    }
  },
  created: function () {
    console.log(this.review)
    if (this.$route.name === 'Recommend') {
      this.recommendChk = true
    }
    this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.review.movie.poster_path}`
    const data = this.review.movie.release_date.split('-')
    this.releaseDate = `${data[0]}. ${data[1]}`
  }
}
</script>

<style>

</style>