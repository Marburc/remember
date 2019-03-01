<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Remember Me</b-navbar-brand>

      <b-navbar-nav>
        <!-- <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Start Game</b-button>

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
  </div>
</template>
