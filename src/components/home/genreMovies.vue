<template>
  <div>
    <h3>genre</h3>
    <div v-for="genre in genresIds" :key="genre.id">
      <genre-movies-item :genre-id="genre.id" :genre-name="genre.name"></genre-movies-item>
    </div>
  </div>
</template>

<script>
import genreMoviesItem from '@/components/home/genreMoviesItem'

import axios from 'axios'

export default {
  name: 'genreMovies',
  data: function () {
    return {
      genresIds: null,
      
    }
  },
  components: {
    genreMoviesItem,
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/genres/ids/',
    })
    .then(res => {
      console.log(res.data)
      this.genresIds = res.data
    })
    .catch(err => {
      console.log(err)
    })
  },
}
</script>

<style>

</style>