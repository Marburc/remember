<template>
  <div id="app ">
    <app-navbar :startGame="startGame"></app-navbar>
    <div class="container">
      <app-personsGrid :persons="persons"></app-personsGrid>
      <app-personsData :gameIsRunning="gameIsRunning" :personsCopy="personsCopy"></app-personsData>
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
      gameIsRunning: false,
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
    axios.get("https://randomuser.me/api/?results=4&nat=de").then(users => {
      this.persons = users.data.results;
      this.personsCopy = JSON.parse(JSON.stringify(this.persons));
    });
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.persons = _.shuffle(this.persons);
      this.persons.forEach(person => {
        person.name.last = "";
        person.name.first = "";
        person.location.state = "";
        person.dob.age = "";
      });
    }
  }
};
</script>


<style>
</style>
