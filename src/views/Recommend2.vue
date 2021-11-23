<template>
  <div class="reco2">
    <h1>장르 점수판</h1>
    <div>
      <span class="genre-span" v-for="genre in genres" :key="genre.id"
        >{{ genre.genre_name }} {{ genre.score / 2 }}</span
      >
    </div>
    <div class="row">
      <movie-card v-for="movie in movies" :key="movie.id" :movie="movie">
      </movie-card>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import getToken from "@/util/getToken"
import { mapState } from "vuex"

import MovieCard from "@/components/recommend/MovieCard.vue"

export default {
  name: "Recommend2",
  data: function () {
    return {
      movies: null,
      board: null,
      genres: [],
    }
  },
  components: {
    MovieCard,
  },
  computed: {
    ...mapState(["loginUser"]),
  },
  created: function () {
    axios({
      methods: "GET",
      url: "http://127.0.0.1:8000/reviews/recommend2/",
      headers: getToken(),
    })
      .then((res) => {
        this.board = res.data[0]
        for (let genreId in res.data[0]) {
          this.genres.push(res.data[0][genreId])
        }
        this.movies = res.data[1]
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style>
.reco2 {
  color: white;
  padding-top: 100px;
}
.genre-span {
  font-size: 25px;
  display: inline-block;
  padding: 10px 15px;
  margin: 20px 20px;
  background: grey;
  border-radius: 10px;
}
</style>
