import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { payload: [], payloadTags: [], payloadImages: [] },
  reducers: {
    addData(state, { payload }) {
      if (payload) {
        state.payload = [...state.payload, ...payload];

        state.payload.sort((a, b) => b.createdAt - a.createdAt);

        state.payload = state.payload.filter(
          (el, index, arr) => index === arr.findIndex((t) => t._id === el._id)
        );
      }
    },
    addDataTags(state, { payload }) {
      if (payload) {
        state.payloadTags = [...state.payloadTags, ...payload];

        state.payloadTags = state.payloadTags.filter(
          (el, index, arr) => index === arr.findIndex((t) => t._id === el._id)
        );

        state.payloadTags.sort((a, b) => b.createdAt - a.createdAt);
      }
    },
    clearData(state) {
      state.payload = [];
    },
    clearDataTags(state, { tag }) {
      state.payloadTags = state.payloadTags.filter((item) => {
        if (item.tags && item.tags.length > 0) {
          return item.tags.includes(tag);
        }
        return false;
      });
    },
    addImages(state, { payload }) {
      if (payload) {
        state.payloadImages = [...state.payloadImages, payload];

        state.payloadImages = state.payloadImages.filter(
          (el, index, arr) => index === arr.findIndex((t) => t._id === el._id)
        );
      }
    },
    clearImg(state, { payload }) {
      if (payload) {
        state.payloadImages = state.payloadImages.filter(
          (el) => el._id !== payload
        );
      }
    },
    clearImages(state) {
      state.payloadImages = [];
    },
  },
});

export default feedSlice;
