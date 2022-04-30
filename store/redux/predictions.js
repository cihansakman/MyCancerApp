import { createSlice } from "@reduxjs/toolkit";

const predictionSlice = createSlice({
  name: "predictions",
  initialState: {
    predictionRisk: "",
    predictionScores: [],
  },

  reducers: {
    setPrediction: (state, action) => {
      state.predictionRisk = action.payload.predictionRisk;
    },
    setPredictionScores: (state, action) => {
      state.predictionScores = action.payload.predictionScores;
    },
  },
});

//First export the actions
export const setPrediction = predictionSlice.actions.setPrediction;
export const setPredictionScores = predictionSlice.actions.setPredictionScores;

//export reducer of slice
export default predictionSlice.reducer;
