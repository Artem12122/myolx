import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: { payload: [] ,payloadChats: {} ,payloadSend: [], payloadReceive: [],},
  reducers: {
    allMessage(state, { payload }) {
      if (payload) {
        state.payload = [...state.payload, ...payload];

        state.payload.sort((a, b) => b.createdAt - a.createdAt);

        state.payload = state.payload.filter(
          (el, index, arr) => index === arr.findIndex((t) => t._id === el._id)
        );
      }
    },
    allMessageClear(state) {
      state.payload = []
    },
    chats(state, { payload }) {
      // console.log(payload)
      state.payloadChats = payload
    }
  },
});

export default messageSlice;