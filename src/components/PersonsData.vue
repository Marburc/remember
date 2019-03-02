<template>
  <div class="person row">
    <div v-for="person in personsCopy" :key="person.id.value" class="b-col person text-center">
      <b-card no-body style="max-width: 11rem;">
        <h4 slot="header">{{person.name.first}} {{person.name.last}}</h4>

        <b-list-group flush>
          <b-list-group-item>{{person.location.state}}</b-list-group-item>
          <b-list-group-item>{{person.dob.age}}</b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ["personsCopy"]
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




