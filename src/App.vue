<template>
  <div id="app ">
    <app-navbar
      :points="points"
      :gameIsRunning="gameIsRunning"
      :usersRendered="usersRendered"
      :startGame="startGame"
      :reset="reset"
      :persons="persons"
    ></app-navbar>

    <div class="container">
      <app-welcome
        v-if="usersRendered === false"
        :numberUsers="numberUsers"
        @amountUsers="numberUsers = $event"
      ></app-welcome>
      <div v-if="usersRendered && gameIsRunning === false">
        <h4>Merke Dir die Personen und Drücke LOS!</h4>
        <button @click="mix">Los</button>
      </div>
      <h4
        class="mt-4 score"
        v-if="gameIsRunning === true"
      >Punkte: {{points}} / {{this.persons.length * 4}}</h4>
      <app-personsGrid
        @updateCounter="counter = $event"
        @updatePoints="points = $event"
        :markAsCorrect="markAsCorrect"
        @changeCorrect="markAsCorrect = $event"
        :persons="persons"
        :points="points"
        :counter="counter"
      ></app-personsGrid>
      <app-personsData
        :gameIsRunning="gameIsRunning"
        :personsName="personsName"
        :personsAge="personsAge"
        :personsState="personsState"
      ></app-personsData>
    </div>
  </div>
</template>
<script>
import Welcome from "./components/Welcome";
import axios from "axios";
import PersonsGrid from "./components/PersonsGrid.vue";
import Navbar from "./components/Navbar.vue";
import PersonsData from "./components/PersonsData.vue";
export default {
  data() {
    return {
      numberUsers: 4,
      markAsCorrect: false,
      usersRendered: false,
      gameIsRunning: false,
      counter: 0,
      points: 0,
      persons: [],
      personsAge: [],
      personsName: [],
      personsState: [],
      personsName: null,
      selectedUser: null
    };
  },
  components: {
    "app-navbar": Navbar,
    "app-personsGrid": PersonsGrid,
    "app-personsData": PersonsData,
    "app-welcome": Welcome
  },
  created() {},
  methods: {
    startGame() {
      axios
        .get(`https://randomuser.me/api/?results=${this.numberUsers}&nat=de`)
        .then(users => {
          this.persons = users.data.results;
          this.personsName = JSON.parse(JSON.stringify(this.persons));
          this.personsState = JSON.parse(JSON.stringify(this.persons));
          this.personsAge = JSON.parse(JSON.stringify(this.persons));
          this.usersRendered = true;
        });
    },
    reset() {
      this.usersRendered = false;
      this.markAsCorrect = false;
      this.counter = 0;
      this.points = 0;
      this.gameIsRunning = false;
    },
    mix() {
      this.gameIsRunning = true;
      this.persons = _.shuffle(this.persons);
      this.personsName = _.shuffle(this.personsName);
      this.personsAge = _.shuffle(this.personsAge);
      this.personsState = _.shuffle(this.personsState);
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
.score {
  text-align: center;
}
</style>
