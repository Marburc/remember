<template>
  <div v-if="gameIsRunning === true">
    <div>
      <transition-group name="flip-list" class="person row">
        <p
          v-if="person.name.first !== ''"
          v-for="person in personsName"
          :key="person.login.username"
          @click="checkState(person,'name')"
        >{{person.name.first}} {{person.name.last}}</p>
      </transition-group>
    </div>
    <div>
      <transition-group name="flip-list" class="person row">
        <p
          v-if="person.dob.age !== ''"
          :key="person.login.username"
          v-for="person in personsAge"
          @click="checkState(person,'age')"
        >{{person.dob.age}}</p>
      </transition-group>
    </div>
    <div>
      <transition-group name="flip-list" class="person row">
        <p
          v-if="person.location.state !== ''"
          :key="person.login.username"
          v-for="person in personsState"
          @click="checkState(person,'state')"
        >{{person.location.state}}</p>
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
      console.log("personsdata: " + this.selectedInfo);
      console.log("personsdata: " + this.selectedUser);
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
.person {
  margin: 10px auto;
  text-align: center;
}
.person p {
  list-style: none;
  cursor: pointer;
  margin: 10px;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
}

.flip-list-move {
  transition: transform 1s;
}
</style>




