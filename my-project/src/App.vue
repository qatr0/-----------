<script>
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    Board,
  },
};
</script>

<template>
  <h1 class="name__game mt-3 text-2xl">Запомни и открой все зелёные клетки</h1>
  <Board />
</template>

<style scoped></style>
