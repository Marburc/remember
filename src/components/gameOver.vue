<template>
  <div class="gameOver">
    <h4>{{changeMsg}}</h4>
    <b-button @click="reset" class="btn px-4">Neues Spiel</b-button>
  </div>
</template>

<script>
export default {
  props: ["points", "persons", "reset"],
  data() {
    return {
      msg: null
    };
  },
  computed: {
    changeMsg: function() {
      if (
        this.points >= 0 &&
        this.points <= ((this.persons.length * 3) / 100) * 30
      ) {
        return (this.msg = `Du hast ${this.points} von ${this.persons.length *
          3} möglichen Punkten erreicht. Das kannst du besser! Versuche es nochmal!`);
      } else if (
        this.points >= ((this.persons.length * 3) / 100) * 30 &&
        this.points <= ((this.persons.length * 3) / 100) * 70
      ) {
        return (this.msg = `Gar nicht so schlecht! Du hast ${
          this.points
        } von ${this.persons.length *
          3} möglichen Punkten erreicht. Noch eine Runde?`);
      } else if (
        this.points >= ((this.persons.length * 3) / 100) * 70 &&
        this.points <= this.persons.length * 3 - 1
      ) {
        return (this.msg = `${this.points} von ${this.persons.length *
          3} möglichen Punkten. Das war schon ziemlich gut! Versuche es nochmal und knacke die volle Punktzahl! `);
      } else if (
        this.points >= this.persons.length * 3 - 1 &&
        this.points === this.persons.length * 3
      ) {
        return (this.msg = ` Du bist der Hammer!Du hast ${
          this.points
        } von ${this.persons.length * 3} möglichen Punkten erreicht. `);
      } else {
        return (this.msg = `${this.points} von ${this.persons.length *
          3} Punkten. Das war wohl nichts. Versuche es gleich nochmal!`);
      }
    }
  }
};
</script>
<style>
.gameOver {
  background-color: rgb(223, 223, 223);
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
  text-align: center;
  border: 2px solid rgba(69, 78, 87, 0.678);
  padding: 50px;

  -webkit-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 10px 38px 0px rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 30%;
  left: 50%;

  z-index: 1000;
  transform: translate(-50%, -50%);
}
.gameOver h4 {
  display: block;
  line-height: 2.2rem;
  color: rgb(71, 71, 71);
}
</style>


