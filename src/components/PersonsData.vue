<template>
  <div class="person row">
    <div
      v-for="person in personsCopy"
      :key="person.login.username"
      class="b-col person text-center"
    >
      <b-card no-body style="max-width: 11rem;">
        <h4
          v-if="person.name.first !== ''"
          style="cursor: pointer"
          @click="checkState(person)"
          slot="header"
        >{{person.name.first}} {{person.name.last}}</h4>

        <b-list-group flush>
          <b-list-group-item
            v-if="person.location.state !== ''"
            style="cursor: pointer"
            @click="checkState(person)"
          >{{person.location.state}}</b-list-group-item>
          <b-list-group-item
            v-if="person.dob.age !== ''"
            style="cursor: pointer"
            @click="checkState(person)"
          >{{person.dob.age}}</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      selectedUser: null,
      persons: []
    };
  },
  props: ["personsCopy"],
  methods: {
    checkState(person) {
      this.selectedUser = person;
      eventBus.$emit("selectedUser", this.selectedUser);
    }
  },
  created() {
    eventBus.$on("correctAnswer", result => {
      if (result === "state") {
        this.persons = this.personsCopy.forEach(person => {
          if (person.location.state === this.selectedUser.location.state) {
            person.location.state = "";
          }
        });
      }
      if (result === "age") {
        this.persons = this.personsCopy.forEach(person => {
          if (person.dob.age === this.selectedUser.dob.age) {
            person.dob.age = "";
          }
        });
      }
      if (result === "name") {
        this.persons = this.personsCopy.forEach(person => {
          if (person.name.first === this.selectedUser.name.first) {
            person.name.first = "";
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
}
.card-img {
  max-width: 180px !important;
  max-height: 180px !important;
  object-fit: cover;
}
</style>




