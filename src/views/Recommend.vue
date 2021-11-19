<template>
  <div>
    <h3>추천</h3>
    <div>
      <review-list-item
        v-for="(review, index) in reviews"
        :key="index"
        :review="review"
      ></review-list-item>
    </div>
  </div>
</template>

<script>
import ReviewListItem from "@/components/review/ReviewListItem"
import axios from "axios"

export default {
  name: "Recommend",
  data: function () {
    return {
      reviews: null,
    }
  },
  components: {
    ReviewListItem,
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
