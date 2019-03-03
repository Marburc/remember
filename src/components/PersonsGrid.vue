<template>
  <div>
    <transition-group name="flip-list" class="person row">
      <div
        v-for="(person) in persons"
        :key="person.login.username"
        class="b-col person text-center"
      >
        <b-card
          @click="checkUser(person)"
          no-body
          style="max-width: 11rem; cursor: pointer"
          :img-src="person.picture.large"
          img-alt="Image"
        >
          <h4
            v-if="person.name.first !== ''"
            @click="checkName(person)"
            style="cursor: pointer"
            slot="header"
          >{{person.name.first}} {{person.name.last}}</h4>

          <b-list-group flush>
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
    </transition-group>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  props: ["persons"],
  data() {
    return {
      selectedUser: "",
      correctAnswer: "",
      selectedInfo: ""
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
      if (user.login.username === this.selectedUser.login.username)
        if (this.selectedInfo === "state") {
          user.location.state = this.selectedUser.location.state;
          this.correctAnswer = "state";
          eventBus.$emit("correctAnswer", this.correctAnswer);
        } else if (this.selectedInfo === "age") {
          user.dob.age = this.selectedUser.dob.age;
          this.correctAnswer = "age";
          eventBus.$emit("correctAnswer", this.correctAnswer);
        } else if (this.selectedInfo === "name") {
          user.name.first = this.selectedUser.name.first;
          user.name.last = this.selectedUser.name.last;
          this.correctAnswer = "name";
          eventBus.$emit("correctAnswer", this.correctAnswer);
        }
    }
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
.flip-list-move {
  transition: transform 1s;
}
</style>


