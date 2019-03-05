<template>
  <div class="personGroup" v-if="gameIsRunning === true">
    <div>
      <transition-group name="flip-list" class="person row">
        <button
          class="personBtn"
          v-if="person.name.first !== ''"
          v-for="person in personsName"
          :key="person.login.username"
          @click="checkState(person,'name')"
        >{{person.name.first | toUpperCase }} {{person.name.last | toUpperCase}}</button>
      </transition-group>
    </div>
    <div>
      <transition-group name="flip-list" class="person row">
        <button
          class="personBtn"
          v-if="person.dob.age !== ''"
          :key="person.login.username"
          v-for="person in personsAge"
          @click="checkState(person,'age')"
        >{{person.dob.age}}</button>
      </transition-group>
    </div>
    <div>
      <transition-group name="flip-list" class="person row">
        <button
          class="personBtn"
          v-if="person.location.state !== ''"
          :key="person.login.username"
          v-for="person in personsState"
          @click="checkState(person,'state')"
        >{{person.location.state | toUpperCase}}</button>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      selectedUser: null,
      persons: [],
      selectedInfo: ""
    };
  },
  props: ["personsName", "personsState", "personsAge", "gameIsRunning"],
  methods: {
    checkState(person, info) {
      this.selectedInfo = info;
      this.selectedUser = person;

      eventBus.$emit("selectedUser", this.selectedUser, this.selectedInfo);
    }
  },
  created() {
    eventBus.$on("correctAnswer", result => {
      if (result === "state") {
        this.persons = this.personsState.forEach(person => {
          if (person.location.state === this.selectedUser.location.state) {
            person.location.state = "";
          }
        });
      }
      if (result === "age") {
        this.persons = this.personsAge.forEach(person => {
          if (person.dob.age === this.selectedUser.dob.age) {
            person.dob.age = "";
          }
        });
      }
      if (result === "name") {
        this.persons = this.personsName.forEach(person => {
          if (person.name.first === this.selectedUser.name.first) {
            person.name.first = "";
            person.name.last = "";
          }
        });
      }
    });
  }
};
</script>

<style >
.personGroup {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
.person {
  margin: 10px auto;
  text-align: center;
}
.person p {
  font-weight: bold;
  color: rgb(71, 71, 71);
  /* background-color: rgb(171, 171, 187); */
  border: 0;
  outline: 0;
  padding: 1.2rem 1.6rem;
  /* font-size: 1.3rem; */
  box-shadow: 0px 5px 10px #979797;
  transition: all 0.3s;
  border-radius: 5px;
  border-bottom: 4px solid #d9d9d9;
}
.personBtn {
  margin: 10px;
  font-weight: bold;
}
button {
  background-color: rgb(255, 255, 255);
  border: 0;
  outline: 0;
  padding: 1.4rem 1.9rem;
  font-size: 1.3rem;
  font-family: monospace;
  box-shadow: 0px 5px 10px #979797;
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 5px;
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

.flip-list-move {
  transition: transform 1s;
}
</style>




