import { DEFAULT_DIFFICULT, FIELD, GAME_STATUS } from "../../constants";
import { nextTick, computed } from "vue";
export default function useGmaeProcess(fields, gameStatus, difficult, start) {
  const selectField = (id) => {
    const index = fields.value.findIndex((field) => {
      return field.id === id;
    });
    if (index > -1 && !fields.value[index].clicked) {
      fields.value[index].clicked = true;

      checkGame();
    }
  };

  const checkGame = () => {
    const errorIndex = fields.value.findIndex((field) => {
      return field.clicked && field.value === FIELD.EMPTY;
    });
    if (errorIndex > -1) {
      setGameOver();
      return;
    }

    const notFoundItemIndex = fields.value.findIndex((field) => {
      return !field.clicked && field.value === FIELD.FILLED;
    });
    if (notFoundItemIndex === -1) {
      setWin();
    }
  };

  const setGameOver = () => {
    console.log("Fail");
    gameStatus.value = GAME_STATUS.FAIL;
    difficult.value = DEFAULT_DIFFICULT;
  };
  const setWin = () => {
    gameStatus.value = GAME_STATUS.WIN;
    setTimeout(async () => {
      difficult.value += 1;

      await nextTick();

      start();
    }, 2000);
  };

  const isWin = computed(() => {
    return gameStatus.value === GAME_STATUS.WIN;
  });

  const isFail = computed(() => {
    return gameStatus.value === GAME_STATUS.FAIL;
  });

  return {
    selectField,
    isFail,
    isWin,
  };
}
