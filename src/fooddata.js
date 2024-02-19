import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: null,
  activeCategory: null,
  status: "idle",
  error: null,
  activeFoods: null,
  cartCount: 0,
};

const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89");
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setActiveFoods(state, action) {
      state.activeFoods = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    updateItemCount(state, action) {
      const { dish_id, count } = action.payload;
      const dishToUpdate = state.activeFoods?.find((dish) => dish.dish_id === dish_id);
      if (dishToUpdate) {
        dishToUpdate.count = count;
        state.cartCount = state.activeFoods.reduce((total, dish) => total + (dish.count || 0), 0);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const { setActiveFoods, setActiveCategory, updateItemCount } = dataSlice.actions;

export { fetchData, setActiveFoods, setActiveCategory, updateItemCount };
export default dataSlice.reducer;
