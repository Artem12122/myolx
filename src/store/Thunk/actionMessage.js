import { api } from "../api";
import messageSlice from "../messageSlice/messageSlice";

export const actionMessage = () => async (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.token) {
    await dispatch(messageSlice.actions.allMessageClear())
    return false
  }

  const skip = getState().message.payload.length
  const massage = await dispatch(api.endpoints.getMyMessage.initiate(skip));

  if (massage.data) {
    await dispatch(messageSlice.actions.allMessage(massage.data.MessageFind))
    const messageFind = getState().message.payload

    const chats = {};

    messageFind.map(message => {
        const chatId = [message.owner._id, message.to._id].sort().join('_');
        

        if (!chats[chatId]) {
            chats[chatId] = [];
        }
        chats[chatId].push(message);
    });

    await dispatch(messageSlice.actions.chats(chats))
  }
};