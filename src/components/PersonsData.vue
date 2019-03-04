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
  <!-- <div v-if="gameIsRunning === true " class="person row">
    <div
      v-for="person in personsCopy"
      :key="person.login.username"
      class="b-col person text-center"
    >
      <b-card no-body style="max-width: 11rem;">
        <h4
          v-if="person.name.first !== ''"
          style="cursor: pointer"
          @click="checkState(person,'name')"
          slot="header"
        >{{person.name.first}} {{person.name.last}}</h4>

        <b-list-group flush>
          <b-list-group-item
            v-if="person.location.state !== ''"
            style="cursor: pointer"
            @click="checkState(person,
        'state')"
          >{{person.location.state}}</b-list-group-item>
          <b-list-group-item
            v-if="person.dob.age !== ''"
            style="cursor: pointer"
            @click="checkState(person,'age')"
          >{{person.dob.age}}</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>-->
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

<style>
.person {
  margin: 10px auto;
  text-align: center;
}
.person p {
  list-style: none;
  cursor: pointer;
  margin: 20px;
  border: 1px solid black;
  padding: 5px;
}

.flip-list-move {
  transition: transform 1s;
}
</style>




