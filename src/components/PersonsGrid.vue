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
        <p
          :class="{correct: markAsCorrect}"
          v-if="person.name.first !== ''"
        >{{person.name.first}} {{person.name.last}}</p>
        <p
          :class="{correct: markAsCorrect}"
          v-if="person.location.state !== ''"
        >{{person.location.state}} {{person.name.last}}</p>
        <p :class="{correct: markAsCorrect}" v-if="person.dob.age !== ''">{{person.dob.age}}</p>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  props: ["persons", "points", "counter", "markAsCorrect"],
  data() {
    return {
      gameIsRunning: false,
      selectedUser: "",
      correctAnswer: "",
      selectedInfo: "",
      internalMarkAsCorrect: this.markAsCorrect,
      internalPoints: this.points,
      internalCounter: this.counter
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
        this.$emit("updatePoints", this.internalPoints--);
      }
    },
    corrAnswer(type) {
      this.correctAnswer = type;
      eventBus.$emit("correctAnswer", this.correctAnswer);

      this.$emit("updateCounter", this.internalCounter++);

      this.$emit("updatePoints", this.internalPoints++);
      this.selectedUser = "";

      this.$emit("changeCorrect", (this.internalMarkAsCorrect = true));
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
.correct {
  background-color: lightgreen;
}
</style>


