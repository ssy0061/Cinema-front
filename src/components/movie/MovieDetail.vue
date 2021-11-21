<template>
  <div v-if="movie" class="text-light">
    <div>
      <p class="my-2" style="font-size: 3rem;">{{ movie.title }}</p>

    </div>
    <hr>
    <div class="d-flex justify-content-around mx-5 px-5">
      <div class="mx-3">
        <img :src="posterUrl" alt="포스터" width="400px">

      </div>
      <div class="px-5">
        <div v-if="videoUrl">
          <div>예고편 영상</div>
        </div>

        <div class="text-start" style="font-size: 1.4rem;">
          <p>{{ releaseDate }}</p>
          <div>
            <span 
              v-for="genre in movie.genres" 
              :key="genre.id"
              class="me-2"
            >
            {{ genre.name }}</span>
          </div>
          <star-rating :rating="movie.vote_average/2" :read-only="true" :increment="0.01" :star-size="20"></star-rating>
          <p class="mt-5">{{ movie.overview }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from 'axios'

export default {
  name: 'MovieDetail',
  components: {
    StarRating,
  },
  data: function () {
    return {
      movie: null,
      posterUrl: null,
      releaseDate: null,
      videoUrl: null,
    }
  },
  props: {
    movieId: [Number, String],
  },
  methods: {
  },
  created: function () {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/movies/${this.movieId}/`
    })
    .then(res => {
      // console.log(res.data)
      this.movie = res.data
      this.posterUrl = `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
      const data = this.movie.release_date.split('-')
      this.releaseDate = `${data[0]}. ${data[1]}`
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>