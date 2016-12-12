<template>
  <div id="app">
    <transition name="movie">
      <movie-info v-show="currentMovie.title != ''"></movie-info>
    </transition>
    <div class="now-playing-container">
      <div class="movie-search-container">
        <input type="text" name="movieSearch" v-model="query" placeholder="Search for a movie..." @input="fetchResults">
      </div>
      <now-playing></now-playing>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NowPlaying from './components/NowPlaying'
import MovieInfo from './components/MovieInfo'
import debounce from 'lodash/debounce'

export default {
  name: 'app',
  components: {
    NowPlaying,
    MovieInfo
  },
  data () {
    return {
      query: ''
    }
  },
  computed: mapGetters(['currentMovie']),
  methods: {
    ...mapActions(['fetchSearchResults']),
    fetchResults: debounce(function () {
      this.fetchSearchResults(this.query)
    }, 500)
  }
}
</script>

<style lang="scss">
@import "./src/assets/styles/variables";
@import "./src/assets/styles/normalize";

*, *::before, *::after {
  box-sizing: border-box;
}
html, body {
  height:100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position:relative;
}
body {
  background: #202A33;
  font-family: 'Karla', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.35;
  min-height: 100%;
}

.lazyload,
.lazyloading {
    opacity: 0;
}
.lazyloaded {
    transition: opacity 250ms $easeOutCubic;
    opacity: 1;
}
.movie-search-container {
  background: #1D262F;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  input[type=text]{
    appearance: none;
    transition: all 250ms ease;
    flex-grow: 1;
    background: transparent;
    border: none;
    border-bottom: 2px solid lighten(#1D262F, 5%);
    border-radius: 0px;
    color: #fff;
    font-size: 1rem;
    height: 28px;
    outline: none;
    &::placeholder {
      color: lighten(#1D262F, 25%);
    }
    &:focus {
      border-bottom: 2px solid lighten(#1D262F, 25%);
    }
  }
}
</style>
