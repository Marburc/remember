<template>
  <b-container>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand class="h1" href="#">Remember Me???</b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button
            v-if="this.usersRendered === true"
            @click="reset"
            size="sm"
            class="my-2 my-sm-0"
            type="submit"
          >Spiel Beenden</b-button>

          <!-- <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
        </b-nav-form>

        <!-- Using button-content slot -->
        <!-- <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>-->
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>
<script>
export default {
  props: [
    "startGame",
    "reset",
    "gameIsRunning",
    "usersRendered",
    "points",
    "persons"
  ]
};
</script>

<style scoped>
button {
  background-color: #db2b39 !important;
  border: 0;
  outline: 0;
  padding: 10px 10px !important;
  font-size: 1.3rem !important;
  box-shadow: 0px 5px 10px #575757;
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 30px !important;
  border-bottom: 4px solid #797979;
}
button:hover {
  box-shadow: 0px 15px 25px -5px #afafaf;
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
}
button:active {
  box-shadow: 0px 4px 8px #1d2b3a;
  -webkit-transform: scale(0.98);
  transform: scale(0.98);
}
</style>


