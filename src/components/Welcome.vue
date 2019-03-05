<template>
  <div class="welcome">
    <p class="h4">Hi, Lust dein Erinnerungsvermögen zu verbessern?
      <br>Wähle den Schwierigkeitsgrad aus und klicke rechts oben auf "Spiel Starten"!
    </p>
    <b-form inline>
      <b-form-select class="selectField" v-model="selectedUsers" id="inlineFormCustomSelectPref">
        <option class v-for="(user,index) in users" :key="index" :selected="user == 4">{{user}}</option>
      </b-form-select>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["numberUsers"],
  data() {
    return {
      users: [3, 4, 5, 6, 7, 8],
      selectedUsers: 2
    };
  },
  methods: {
    confirmUsers() {
      this.$emit("amountUsers", this.users);
      console.log(this.selectedUsers);
    }
  },
  watch: {
    selectedUsers(newVal, oldVal) {
      console.log(newVal);
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
  line-height: 2rem;
  color: rgb(71, 71, 71);
}
.selectField {
  margin-left: auto;
  margin-right: auto;
  width: 50px;
}
</style>


