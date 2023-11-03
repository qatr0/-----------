<template>
  <span :class="getBoardItemClassses" @click="select(field.id)"> </span>
</template>

<script>
import { computed } from "vue";
import { FIELD, GAME_STATUS } from "../constants";

export default {
  name: "BoardItem",
  props: {
    field: {
      type: Object,
      required: true,
    },
    gameStatus: {
      type: Number,
      required: false,
      default: GAME_STATUS.NONE,
    },
  },
  setup(props) {
    //computed
    const getBoardItemClassses = computed(() => {
      let classes = "item ";
      if (
        (props.field.value === FIELD.FILLED &&
          props.gameStatus === GAME_STATUS.PREVIEW) ||
        (props.field.clicked && props.field.value === FIELD.FILLED)
      ) {
        classes += "active";
      }

      if (props.field.clicked && props.field.value === FIELD.EMPTY) {
        classes += " error";
      }
      // logic
      return classes;
    });
    return {
      getBoardItemClassses,
    };
  },
  methods: {
    select(id) {
      if (this.gameStatus === GAME_STATUS.STARTED) {
        this.$emit("selectField", id);
      }
    },
  },
};
</script>

<style scoped>
.item {
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #ccc;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  transition: 0.5s;
  transform-style: preserve-3d;
}
.active {
  background-color: #42b983cc;
  transform: rotateX(180deg);
}
.error {
  background-color: #ff00008d;
  transform: rotateX(180deg);
}
</style>
