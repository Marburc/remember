<template>
  <div>
    <b-form inline>
      <label
        class="mr-sm-2 h4"
        for="inlineFormCustomSelectPref"
      >Wähle die Anzahl der User aus und drücke rechts oben auf "Spiel Starten"!</label>
      <b-form-select
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="selectedUsers"
        id="inlineFormCustomSelectPref"
      >
        <option v-for="user in users">{{user}}</option>
      </b-form-select>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["numberUsers"],
  data() {
    return {
      users: [1, 2, 3, 4, 5, 6, 7, 8],
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

