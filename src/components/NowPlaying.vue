<template>
  <div class="now-playing-container">
    <ul class="now-playing-list" v-show="!searchResults.length">
      <li v-for="movie in nowPlaying" class="now-playing-list-item lazyload" :data-bg="'https://image.tmdb.org/t/p/w1280'+movie.backdrop_path" @click="setMovie(movie)">
        <div class="item-overlay">
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </li>
    </ul>
    <ul class="now-playing-list" v-show="searchResults.length">
      <li v-for="movie in searchResults" class="now-playing-list-item lazyload" :data-bg="'https://image.tmdb.org/t/p/w1280'+movie.backdrop_path" @click="setMovie(movie)" :key="movie.id">
        <div class="item-overlay">
          <h3 class="movie-title">{{ movie.title }}</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'now-playing',
    computed: mapGetters([
      'nowPlaying',
      'searchResults'
    ]),
    methods: {
      ...mapActions([
        'fetchNowPlaying',
        'setCurrentMovie',
        'fetchMovieById'
      ]),
      setMovie (movie) {
        this.setCurrentMovie(movie)
        this.fetchMovieById(movie.id)
      }
    },
    mounted () {
      this.fetchNowPlaying()
    }
  }
</script>

<style lang="scss">
.now-playing-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  .now-playing-list-item {
    background-size: cover!important;
    background-repeat: no-repeat!important;
    background-position: center top!important;
    color: #fff;
    cursor: pointer;
    height: 33vh;
    position: relative;
    .item-overlay {
      display: flex;
      align-items: flex-end;
      background: linear-gradient( 0deg, rgba(#000, 0.75) 0%, rgba(#000, 0) 70%);
      padding: 20px;
      position: absolute; top: 0; right: 0; bottom: 0; left: 0;
      .movie-title {
        margin: 0;
      }
    }
  }
}
</style>
