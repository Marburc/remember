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
    <div class="info animated fadeInRight" v-if="usersRendered && gameIsRunning === false">
      <h4>Merke Dir die Daten zu den jeweiligen Personen und klicke Start!</h4>
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
      numberUsers: null,
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
          if (this.numberUsers === null) {
            alert("Wähle erst aus wie viele Personen du dir merken willst!");
            return;
          } else {
            this.counter = 0;
            this.persons = users.data.results;
            this.personsName = JSON.parse(JSON.stringify(this.persons));
            this.personsState = JSON.parse(JSON.stringify(this.persons));
            this.personsAge = JSON.parse(JSON.stringify(this.persons));
            this.usersRendered = true;
          }
        });
    },
    reset() {
      this.numberUsers = null;
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


<style >
body {
  background: #252840 !important;
  font-family: "Kalam", cursive !important;
}
button {
  background-color: #db2b39 !important;
  border: 0;
  outline: 0;
  padding: 10px 10px !important;
  font-size: 1.3rem !important;
  box-shadow: 0px 5px 10px #979797;
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 30px !important;
  border-bottom: 4px solid #d9d9d9;
}
button:hover {
  box-shadow: 0px 15px 25px -5px #212a33;
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
}
button:active {
  box-shadow: 0px 4px 8px #1d2b3a;
  -webkit-transform: scale(0.98);
  transform: scale(0.98);
}

.score {
  background-color: aliceblue;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  background: #fcfcfc;
  border: 3px solid #db2b39;
  border-radius: 5px;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  -webkit-box-shadow: 8px 10px 27px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 27px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 27px -9px rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 3px;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%);
}
.info {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  margin-top: 20px;
  background: #fcfcfc;
  border: 3px solid #db2b39;
  border-radius: 5px;
  max-width: 500px;
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
.custom-select-sm {
  height: calc(1.5em + 0.5rem + 2px);
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  font-size: 1.2rem !important;
  border-color: rgb(97, 97, 97) !important;
}
</style>
