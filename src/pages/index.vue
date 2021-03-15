<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">RTVC Movie Tutorial</h1>

      <div class="links">
        <form @submit.prevent>
          <div class="form-group">
            <label for="movie-name">Movie Name</label>
            <input
              v-model="movieName"
              type="text"
              id="movie-name"
              class="form-control"
            />
            <p>{{ movieName }}</p>
          </div>
          <button @click="createMovie()" class="btn btn-primary">
            Create Movie
          </button>
        </form>
      </div>

      <div class="links">
        <a @click="listMovies()" class="button--green"> List movies </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async mounted() {
    await this.$store.dispatch('loadWeb3')
  },

  data() {
    return { movieName: '', movieList: [] }
  },

  methods: {
    async createMovie() {
      try {
        await this.movies.methods
          .createMovie(this.movieName)
          .send({ from: this.account })
          .once('receipt', (receipt) => {
            console.log(
              '🚀 ~ file: index.vue ~ line 50 ~ .send ~ receipt',
              receipt
            )
          })
      } catch (error) {
        console.error(error)
      }
    },

    async listMovies() {
      console.log('Testing listing movies')
      const movieCount = await this.movies.methods.movieCount().call()
      for (let i = 1; i <= movieCount; i++) {
        const movie = await this.movies.methods.movies(i).call()
        this.movieList.push(movie)
      }
      console.log('Movie List', this.movieList)
    },
  },

  computed: {
    ...mapGetters(['account', 'movies']),
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
