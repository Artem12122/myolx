import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: { payload: [], payloadTags: [] },
    reducers: {
        addData(state, { payload }) {
            if (payload) {
                state.payload = [...state.payload, ...payload]

                state.payload.sort((a, b) => b.createdAt - a.createdAt)

                state.payload = state.payload.filter(
                    (el, index, arr) =>  index === arr.findIndex(
                        (t) => ( t._id === el._id )
                    )
                )
            }
        },
        addDataTags(state, { payload }) {
            if (payload) {
                state.payloadTags = [...state.payloadTags, ...payload]

                state.payloadTags = state.payloadTags.filter(
                    (el, index, arr) =>  index === arr.findIndex(
                        (t) => ( t._id === el._id )
                    )
                )

                state.payloadTags.sort((a, b) => b.createdAt - a.createdAt)
            }
        },
        clearData(state) {
            state.payload = []
        },
        clearDataTags(state, { tag }) {
            state.payloadTags = state.payloadTags.filter(item => {
                if (item.tags && item.tags.length > 0) {
                    return item.tags.includes(tag);
                }
                return false;
            });
        }
    }
})

export default feedSlice;