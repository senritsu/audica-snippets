<template>
  <div id="app">
    <header>
      <h1>audica-snippets</h1>
      <h3>Edit and share chart snippets easily</h3>
    </header>
    <router-view />
    <footer>
      Copyright © 2019 senritsu | AUDICA, HARMONIX, AND ALL RELATED TITLES AND LOGOS ARE TRADEMARKS OF HARMONIX MUSIC SYSTEMS, INC.
    </footer>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:100,400');

body {
  margin: 0;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(59, 64, 71);
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  header {
    h1 {
      font-size: 2em;
      margin: 0.25em 0;
    }
    h3 {
      font-weight: 100;
      font-size: 0.8em;
      margin: 0.25em 0;
    }
    font-weight: 100;
    color: whitesmoke;
    font-weight: lighter;
  }

  footer {
    background-color: rgb(51, 55, 61);
    font-weight: 400;
    color: gray;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
