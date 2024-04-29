import { CircleUserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MessageOneSMS from "./MessageOneSMS";

const MessageComponent = () => {
  const { chat_id } = useParams();
  const user = useSelector((state) => state.auth.userInfo);
  const chats = useSelector((state) => state.message.payloadChats);

  if ( !(chat_id in chats) ) return

  const chat = chats[chat_id]

  const to = chat[0].owner._id !== user._id ? chat[0].owner : chat[0].to


  return (
    <>
        {chat.map((el) => (
            <MessageOneSMS key={el._id} smsObj={el} user_id={user._id} />
        ))}
    </>
  )
};

export default MessageComponent;
