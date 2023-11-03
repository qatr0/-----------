<template>
  <div class="board-wrapper">
    <div class="board">
      <BoardItem
        v-for="field in fields"
        :field="field"
        :gameStatus="gameStatus"
        :key="'item' + field.id"
        @selectField="selectField($event)"
      />
    </div>
    <p class="difficult">
      Сложность: <strong>{{ difficult }}</strong>
    </p>
    <p v-if="isWin" class="win">Верно! Раунд выигран.</p>
    <p v-if="isFail" class="fail">Вы проиграли! Попробуйте ещё раз!</p>

    <button @click="start" :disabled="!canStartGame" class="btn">Старт</button>
  </div>
</template>

<script>
import useGameStart from "./mods/useGameStart";
import BoardItem from "./BoardItem.vue";
import useGameInit from "./mods/useGameInit";

import { GAME_STATUS } from "../constants";
import { ref } from "vue";
import useGameProcess from "./mods/useGameProcess";

export default {
  name: "Board",
  props: {},
  components: {
    BoardItem,
  },
  setup() {
    const number = 25;
    const gameStatus = ref(GAME_STATUS.NONE);
    const { difficult, fields, init } = useGameInit(number);

    const { canStartGame, start } = useGameStart(
      init,
      fields,
      difficult,
      number,
      gameStatus
    );
    const { selectField, isFail, isWin } = useGameProcess(
      fields,
      gameStatus,
      difficult,
      start
    );
    return {
      number,
      difficult,
      fields,
      init,
      start,
      selectField,
      gameStatus,
      canStartGame,
      isFail,
      isWin,
    };
  },
};
</script>

<style scoped lang="scss">
.board-wrapper {
  margin-bottom: 100px;
  .board {
    width: 300px;
    background-color: #eee;

    margin: 0 auto;
    margin-top: 15px;
  }
  .difficult {
    margin-top: 10px;
  }
  .btn {
    background-color: #2cae74cc;
    color: white;
    border: none;
    border-radius: 20px;
    text-transform: uppercase;
    padding: 9px 50px;
    margin: 15px 0;
    cursor: pointer;
    transition: 0.25s;
    outline: none;
    opacity: 1;
    &:disabled {
      transition: 0.25s;
      opacity: 0.5;
    }
    &:hover {
      background-color: #42b983;
    }
  }
}
.win {
  color: #42b983;
}
.fail {
  color: #ff00008a;
}
</style>
