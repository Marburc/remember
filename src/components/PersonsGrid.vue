<template>
  <div class="person row">
    <div v-for="(person) in persons" :key="person.login.username" class="b-col person text-center">
      <b-card no-body style="max-width: 11rem; " :img-src="person.picture.large" img-alt="Image">
        <h4 slot="header">{{person.name.first}} {{person.name.last}}</h4>

        <b-list-group flush>
          <b-list-group-item
            @click="checkUser(person)"
            style="cursor: pointer"
          >{{person.location.state}}</b-list-group-item>
          <b-list-group-item>{{person.dob.age}}</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  props: ["persons"],
  data() {
    return {
      selectedUser: ""
    };
  },
  created() {
    eventBus.$on("selectedUser", selUser => {
      this.selectedUser = selUser;
    });
  },
  methods: {
    checkUser(user) {
      if (user.login.username === this.selectedUser.login.username) {
        user.location.state = this.selectedUser.location.state;
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
</style>


