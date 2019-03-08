<template>
  <div id="app ">
    <app-navbar
      :points="points"
      :gameIsRunning="gameIsRunning"
      :usersRendered="usersRendered"
      :reset="reset"
      :persons="persons"
    ></app-navbar>

    <app-gameOver v-if="gameFinished === true" :points="points" :persons="persons" :reset="reset"></app-gameOver>

    <app-welcome
      v-if="usersRendered === false"
      :numberUsers="numberUsers"
      :startGame="startGame"
      @amountUsers="numberUsers = $event"
    ></app-welcome>
    <div class="info" v-if="usersRendered && gameIsRunning === false">
      <h4>Merke Dir die Personen und klicke Start!</h4>
      <b-button class="btn px-4" @click="mix">Start</b-button>
    </div>
    <h4
      class="score"
      v-if="gameIsRunning === true && gameFinished === false"
    >Punkte: {{points}} / {{this.persons.length * 3}}</h4>
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
</template>
<script>
import GameOver from "./components/gameOver.vue";
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
      gameFinished: false,
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
    "app-welcome": Welcome,
    "app-gameOver": GameOver
  },

  methods: {
    startGame() {
      axios
        .get(`https://randomuser.me/api/?results=${this.numberUsers}&nat=de`)
        .then(users => {
          this.counter = 0;
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
      this.persons = [];
      this.points = 0;
      this.gameIsRunning = false;
      this.gameFinished = false;
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
  },
  watch: {
    counter() {
      if (this.counter === this.persons.length * 3) {
        return (this.gameFinished = true);
      }
    }
  }
};
</script>


<style>
.score {
  background-color: aliceblue;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;

  border: 2px solid rgba(69, 78, 87, 0.678);
  max-width: 400px;
  padding: 20px;
  text-align: center;
  -webkit-box-shadow: 8px 10px 27px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 27px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 27px -9px rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%);
}
.info {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  margin-top: 40px;
  border: 2px solid lightblue;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  -webkit-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
}
.info h4 {
  color: rgb(71, 71, 71);
  line-height: 2rem;
}
</style>
