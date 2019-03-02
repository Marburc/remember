<template>
  <div id="app ">
    <app-navbar :startGame="startGame"></app-navbar>
    <div class="container">
      <app-personsGrid :persons="persons"></app-personsGrid>
      <app-personsData :personsCopy="personsCopy"></app-personsData>
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
      personsCopy: null,
      selectedUser: null
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
      this.personsCopy = JSON.parse(JSON.stringify(this.persons));
    });
  },
  methods: {
    startGame() {
      this.persons.forEach(person => {
        person.name.last = "what ist my Name?";
        person.name.first = "";
        person.location.state = "Where am I from?";
        person.dob.age = "How old am I?";
      });
    }
  }
};
</script>


<style>
</style>
