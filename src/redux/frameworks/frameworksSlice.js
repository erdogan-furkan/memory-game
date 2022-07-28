import { createSlice, nanoid } from "@reduxjs/toolkit";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [
      { name: array[j].name || array[j], id: nanoid() },
      { name: array[i].name || array[i], id: nanoid() },
    ];
  }

  return array;
}

const initialValues = [
  "angular2",
  "vue",
  "react",
  "grunt",
  "phantomjs",
  "ember",
  "babel",
  "ionic",
  "gulp",
  "meteor",
  "yeoman",
  "yarn",
  "nodejs",
  "bower",
  "browserify",
];

export const frameworksSlice = createSlice({
  name: "frameworks",
  initialState: {
    items: shuffle(initialValues.concat(initialValues)),
    isChecking: false,
    score: 0,
    isStarting: false,
  },
  reducers: {
    setOpened: (state, action) => {
      const framework = state.items.find((item) => item.id === action.payload);
      framework.opened = true;

      const deneme = state.items.filter((item) => item.opened);
      if (deneme.length === 2) {
        state.isChecking = true;
      }
    },
    check: (state, action) => {
      const frameworks = action.payload;

      if (frameworks[0].name === frameworks[1].name) {
        state.items.forEach((item) => {
          if (item.name === frameworks[0].name) {
            item.finalized = true;
          }
        });
        state.score += 50;
      } else {
        state.score -= 10;
      }

      state.items.forEach((item) => (item.opened = false));
      state.isChecking = false;
    },
    restart: (state, action) => {
      state.isStarting = true;

      const isStarted =
        state.items.find((item) => item.finalized) || state.score;

      if (isStarted) {
        state.items = shuffle(initialValues.concat(initialValues));
        state.score = 0;
      }
    },
    setIsStarting: (state, action) => {
      state.isStarting = false;
    },
  },
});

export const selectFrameworks = (state) => state.frameworks.items;
export const selectOpenedFrameworks = (state) =>
  state.frameworks.items.filter((item) => item.opened);
export const selectIsChecking = (state) => state.frameworks.isChecking;
export const selectScore = (state) => state.frameworks.score;
export const selectIsStarted = (state) =>
  state.frameworks.items.some((item) => item.finalized) ||
  state.frameworks.score;
export const selectIsFinished = (state) =>
  state.frameworks.items.every((item) => item.finalized);
export const selectIsStarting = (state) => state.frameworks.isStarting;

export const { setOpened, check, restart, setIsStarting } =
  frameworksSlice.actions;

export default frameworksSlice.reducer;
