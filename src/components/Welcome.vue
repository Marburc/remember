<template>
  <div class="welcome">
    <p class="h4">
      <br>Wähle aus, wie viele Personen du dir merken möchtest und klicke auf "Spiel Starten"!
    </p>
    <b-form inline class="mt-3 justify-content-md-center">
      <b-form-select v-model="selectedUsers" id="inlineFormCustomSelectPref">
        <option v-for="(user,index) in users" :key="index">{{user}}</option>
      </b-form-select>
      <b-button @click.prevent="startGame" size="md" class="ml-3" type="submit">Spiel Starten</b-button>
    </b-form>
  </div>
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
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
  text-align: center;
  border: 2px solid rgba(69, 78, 87, 0.678);
  padding: 50px;
  margin-top: 100px;
  -webkit-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
}
.welcome p {
  display: block;
  line-height: 2.2rem;
  color: rgb(71, 71, 71);
}
</style>


