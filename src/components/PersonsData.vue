<template>
  <b-container class="personGroup" v-if="gameIsRunning === true">
    <b-row align-h="center" class="mt-4">
      <b-col cols="4">
        <transition-group name="flip-list" class="person">
          <p
            :class="{hover: person.isHovered, marked: person.isMarked } "
            v-if="person.name.first !== ''"
            v-for="person in personsName"
            :key="person.login.username"
            @click="checkState(person,'name')"
            @mouseover="addHoverClass(person)"
            @mouseout="deleteHoverClass(person)"
          >{{person.name.first | toUpperCase }} {{person.name.last | toUpperCase}}</p>
        </transition-group>

        <transition-group name="flip-list" class="person">
          <p
            :class="{hover: person.isHovered, marked: person.isMarked } "
            v-if="person.dob.age !== ''"
            :key="person.login.username"
            v-for="person in personsAge"
            @mouseover="addHoverClass(person)"
            @mouseout="deleteHoverClass(person)"
            @click="checkState(person,'age')"
          >{{person.dob.age}}</p>
        </transition-group>

        <transition-group name="flip-list" class="person">
          <p
            :class="{hover: person.isHovered, marked: person.isMarked } "
            v-if="person.location.state !== ''"
            :key="person.login.username"
            v-for="person in personsState"
            @mouseover="addHoverClass(person)"
            @mouseout="deleteHoverClass(person)"
            @click="checkState(person,'state')"
          >{{person.location.state | toUpperCase}}</p>
        </transition-group>
      </b-col>
    </b-row>
  </b-container>
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
      if (person.isMarked) {
        person.isMarked = false;
        console.log(person);
      } else {
        this.personsName.forEach(name => {
          if (name.isMarked) {
            name.isMarked = false;
          }
        });
        this.personsState.forEach(name => {
          if (name.isMarked) {
            name.isMarked = false;
          }
        });
        this.personsAge.forEach(name => {
          if (name.isMarked) {
            name.isMarked = false;
          }
        });

        this.$set(person, "isMarked", true);
        console.log(person);
        this.selectedInfo = info;
        this.selectedUser = person;

        eventBus.$emit("selectedUser", this.selectedUser, this.selectedInfo);
      }
    },
    addHoverClass(person) {
      this.$set(person, "isHovered", true);
    },
    deleteHoverClass(person) {
      person.isHovered = false;
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
.marked {
  border: 3px solid yellow !important;
}
.hover {
  box-shadow: 0px 15px 25px -5px #212a33;
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
}

.person p {
  background-color: #9180c0;
  font-weight: bold;
  font-size: 1.3rem;
  color: rgb(71, 71, 71);
  border: 0;
  outline: 0;
  padding: 1.2rem 1.6rem;
  box-shadow: 0px 5px 10px #979797;
  transition: all 0.3s;
  border-radius: 5px;
  /* border-bottom: 4px solid #d9d9d9; */
}

.flip-list-move {
  transition: transform 1s;
}
</style>




