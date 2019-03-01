<template>
  <div id="app ">
    <app-navbar></app-navbar>
    <div class="container">
      <app-personsGrid :persons="persons"></app-personsGrid>
      <app-personsData :persons="persons"></app-personsData>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PersonsGrid from "./components/PersonsGrid.vue";
import Navbar from "./components/Navbar.vue";
import PersonsData from "./components/PersonsData.vue";
export default {
  data() {
    return {
      gameIsRunning: true,
      persons: [],
      personsCopy: []
    };
  },
  components: {
    "app-navbar": Navbar,
    "app-personsGrid": PersonsGrid,
    "app-personsData": PersonsData
  },
  created() {
    axios.get("https://randomuser.me/api/?results=4").then(users => {
      this.persons = users.data.results;
      this.personsCopy = users.data.results;
    });
  }
};
</script>


<style>
</style>
