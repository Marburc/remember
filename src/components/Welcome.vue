<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="9" class="welcome">
        <p class="h2">
          <br>Wähle aus, wie viele Personen du dir merken möchtest und klicke auf "Spiel Starten"!
        </p>
        <b-form inline class="mt-3 justify-content-md-center">
          <b-form-select
            v-model="selectedUsers"
            :users="users"
            class="chooseNumUser"
            id="inlineFormCustomSelectPref"
          >
            <option v-for="(user,index) in users" :key="index">{{user}}</option>
          </b-form-select>
          <b-button @click.prevent="startGame" size="md" class="ml-3" type="submit">Spiel Starten</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ["numberUsers", "startGame"],
  data() {
    return {
      users: [2, 3, 4, 5, 6, 7, 8],
      selectedUsers: ""
    };
  },
  methods: {
    confirmUsers() {
      this.$emit("amountUsers", this.users);
    }
  },
  watch: {
    selectedUsers(newVal, oldVal) {
      this.$emit("amountUsers", newVal);
    }
  }
};
</script>
<style>
.welcome {
  text-align: center;
  background: #fcfcfc;
  border: 3px solid #db2b39;
  border-radius: 40px;
  padding: 50px;
  margin-top: 100px;
  -webkit-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
}
.welcome p {
  display: block;
  line-height: 3.4rem;
  font-weight: bold;
  color: rgb(73, 73, 73);
}

.chooseNumUser {
  border-color: rgb(0, 0, 0) !important;
  color: #252840 !important;
}
</style>


