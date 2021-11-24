<template>
  <div class="mt-3" style="color: white">
    <h1>Following's Review</h1>
    <div v-if="reviews" class="mt-5">
      <review-card
        v-for="review in reviews" 
        :key="review.id"
        :review="review"
      >
      </review-card>
    </div>
  </div>
</template>

<script>
import ReviewCard from '@/components/review/ReviewCard'
import axios from "axios"

export default {
  name: "Community",
  components: {
    ReviewCard
  },
  data: function () {
    return {
      reviews: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem("JWT")
      const config = {
        Authorization: `Bearer ${token}`,
      }
      return config
    },
  },
  created: function () {
    axios({
      methods: "GET",
      url: "http://127.0.0.1:8000/reviews/recommend/",
      headers: this.setToken(),
    })
      .then((res) => {
        this.reviews = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style></style>
