<template>
  <div>
    <transition-group class="row" name="flip-list">
      <div
        class="person"
        v-for="(person) in persons"
        :key="person.login.username"
        @click="checkUser(person)"
      >
        <img :src="person.picture.large">
        <p v-if="person.name.first !== ''">{{person.name.first}} {{person.name.last}}</p>
        <p v-if="person.location.state !== ''">{{person.location.state}} {{person.name.last}}</p>
        <p v-if="person.dob.age !== ''">{{person.dob.age}}</p>
      </div>
    </transition-group>
    <!-- <transition-group name="flip-list" class="person row">
      <div
        v-for="(person) in persons"
        :key="person.login.username"
        class="b-col person text-center"
      >
        <b-card
          @click="checkUser(person)"
          no-body
          style="max-width: 21rem; cursor: pointer; "
          :img-src="person.picture.large"
          img-alt="Image"
        >
          <b-list-group flush>
            <b-list-group-item
              v-if="person.name.first !== ''"
              @click="checkName(person)"
              style="cursor: pointer"
            >{{person.name.first}} {{person.name.last}}</b-list-group-item>
            <b-list-group-item
              v-if="person.location.state !== ''"
              @click="checkState(person)"
              style="cursor: pointer"
            >{{person.location.state}}</b-list-group-item>
            <b-list-group-item
              v-if="person.dob.age !== ''"
              style="cursor: pointer"
              @click="checkAge(person)"
            >{{person.dob.age}}</b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </transition-group>-->
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  props: ["persons", "points", "counter"],
  data() {
    return {
      gameIsRunning: false,
      selectedUser: "",
      correctAnswer: "",
      selectedInfo: "",
      counter: 0,
      points: 0
    };
  },
  created() {
    eventBus.$on("selectedUser", (selUser, selInfo) => {
      this.selectedUser = selUser;
      this.selectedInfo = selInfo;
    });
  },
  methods: {
    checkUser(user) {
      if (user.login.username === this.selectedUser.login.username) {
        if (this.selectedInfo === "state") {
          user.location.state = this.selectedUser.location.state;

          this.corrAnswer("state");
        } else if (this.selectedInfo === "age") {
          user.dob.age = this.selectedUser.dob.age;
          this.corrAnswer("age");
        } else if (this.selectedInfo === "name") {
          user.name.first = this.selectedUser.name.first;
          user.name.last = this.selectedUser.name.last;
          this.corrAnswer("name");
        }
      } else {
        this.points--;
        this.$emit("updatePoints", this.points);
      }
    },
    corrAnswer(type) {
      this.correctAnswer = type;
      eventBus.$emit("correctAnswer", this.correctAnswer);
      this.counter++;
      this.$emit("updateCounter", this.counter);
      this.points++;
      this.$emit("updatePoints", this.points);
      this.selectedUser = "";
    }
  }
};
</script>

<style>
.person {
  margin-right: 30px;
}
.person img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid lightgray;
}
.flip-list-move {
  transition: transform 1s;
}
</style>


