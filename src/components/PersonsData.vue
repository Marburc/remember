<template>
  <div class="personGroup" v-if="gameIsRunning === true">
    <transition-group name="flip-list" class="person">
      <button
        class="personBtn"
        v-if="person.name.first !== ''"
        v-for="person in personsName"
        :key="person.login.username"
        @click="checkState(person,'name')"
      >{{person.name.first | toUpperCase }} {{person.name.last | toUpperCase}}</button>
    </transition-group>

    <transition-group name="flip-list" class="person">
      <button
        class="personBtn"
        v-if="person.dob.age !== ''"
        :key="person.login.username"
        v-for="person in personsAge"
        @click="checkState(person,'age')"
      >{{person.dob.age}}</button>
    </transition-group>

    <transition-group name="flip-list" class="person">
      <button
        class="personBtn"
        v-if="person.location.state !== ''"
        :key="person.login.username"
        v-for="person in personsState"
        @click="checkState(person,'state')"
      >{{person.location.state | toUpperCase}}</button>
    </transition-group>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      selectedUser: null,
      persons: [],
      selectedInfo: "",
      imgToggle: false
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
  position: absolute;
  top: 70%;
  left: 5%;
  transform: translate(-50% -50%);
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

.flip-list-move {
  transition: transform 1s;
}
</style>




