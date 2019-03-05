<template>
  <div class="welcome">
    <b-form inline>
      <label
        class="mr-sm-2 h4 mb-4"
        for="inlineFormCustomSelectPref"
      >Wähle den Schwierigkeitsgrad aus und klicke rechts oben auf "Spiel Starten"!</label>
      <b-form-select
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="selectedUsers"
        id="inlineFormCustomSelectPref"
      >
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
  border: 2px solid lightblue;
  padding: 50px;
  margin-top: 100px;
  -webkit-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
}
</style>


