import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  status: "idle",
  position: {},
  adress: "",
  error: "",
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAdress = createAsyncThunk(
  "user/fetchAdress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAdress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.adress = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAdress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;

export const userName = (state) => state.user.username;
