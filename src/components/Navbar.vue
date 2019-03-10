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



