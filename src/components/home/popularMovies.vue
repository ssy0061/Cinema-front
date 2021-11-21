<template>
  <div v-if="movies">
    <div @click="goDetail(movies[0].id)">
      <img :src="`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`" alt="배경 사진" class="most-pop-img">
    </div>
    <div class="container-div">
      <h3 class="movie-list-title">popular</h3>
      <swiper class="swiper" :options="swiperOption" v-if="movies">
        <swiper-slide v-for="movie in movies" :key="movie.id">
          <movie-card :movie="movie"></movie-card>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div class="swiper-button-prev" slot="button-prev"></div> 
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import movieCard from '@/components/home/movieCard'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'popularMovies',
  data: function () {
    return {
      movies: null,
      swiperOption: { 
        slidesPerView: 6, 
        spaceBetween: 0, 
        loop: true, 
        pagination: { 
          el: '.swiper-pagination', 
          clickable: true 
        }, 
        navigation: { 
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev' 
        } 
      }
    }
  },
  components: {
    movieCard,
    Swiper,
    SwiperSlide,
  },
  methods: {
    goDetail: function (id) {
      this.$router.push({ name: 'Movie', params: { movieId: id }})
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/popular/',
    })
    .then(res => {
      this.movies = res.data
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scope>
.container-div {
  padding: 30px;
}
.movie-list-title {
  text-align: left;
  color: gray;
  font-size: 30px;
}
.most-pop-img {
  -webkit-box-shadow: 5px 5px 5px 0px rgba(255,255,255,.1), inset 4px 4px 15px 0px rgba(255,255,255,.1), 3px 10px 18px 8px rgba(0,0,0,0.65); 
box-shadow: 5px 5px 5px 0px rgba(255,255,255,.1), inset 4px 4px 15px 0px rgba(255,255,255,.1), 3px 10px 18px 8px rgba(0,0,0,0.65);
  width: 1600px;
}
.swiper-button-next, .swiper-button-prev {
  color: rgba(255,255,255, 0.7);
}
</style>