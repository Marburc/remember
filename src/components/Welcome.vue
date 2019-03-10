<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="9" class="welcome">
        <p class="h2">
          <br>Wähle aus, wie viele Personen du dir merken möchtest und klicke auf "Spiel Starten"!
        </p>
        <b-form inline class="mt-3 justify-content-md-center">
          <div>
            <b-form-select v-model="selectedUsers" :options="options" size="sm" class="mt-3"/>
          </div>
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
      options: [
        { value: null, text: "Triff eine Auswahl" },
        { value: "3", text: "3 Personen (leicht)" },
        { value: "4", text: "4 Personen (leicht)" },
        { value: "5", text: "5 Personen (mittel)" },
        { value: "6", text: "6 Personen (mittel)" },
        { value: "7", text: "7 Personen (schwer)" },
        { value: "8", text: "8 Personen (schwer)" }
      ],
      selectedUsers: null
    };
  },
  methods: {},
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
  color: rgb(58, 58, 58);
}

.chooseNumUser {
  border-color: rgb(0, 0, 0) !important;
  color: #252840 !important;
}
</style>


