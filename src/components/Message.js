import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionMessage } from "../store/Thunk/actionMessage";
import { useEffect } from "react";
import MessageComponent from "./MessageComponent";
import { CircleUserRound } from "lucide-react";
import MessageInput from "./MessageInput";

const Message = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.message.payloadChats);
  const _id = useSelector((state) => state.auth.userInfo?._id);

  useEffect(() => {
    dispatch(actionMessage());
    const intervalId = setInterval(() => dispatch(actionMessage()), 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!_id) return <h2>Ви не увійшли в акаунт</h2>;

  const chatsId = Object.keys(chats);

//   if (chatsId.length < 1) return <h2>У вас немаєчатів</h2>

  return (
    <div className="parent-message">
      <div className="message-aside">
        {chatsId.map((chatUrl) => (
          <Link
            className="message-title"
            key={chatUrl}
            to={`/message/${chatUrl}`}
          >
            {chats[chatUrl][0].owner._id !== _id ? (
              chats[chatUrl][0].owner.avatar === null ? (
                <CircleUserRound size={36} />
              ) : (
                <img
                  src={
                    "http://marketplace.node.ed.asmer.org.ua/" +
                    chats[chatUrl][0].owner.avatar.url
                  }
                />
              )
            ) : chats[chatUrl][0].to.avatar === null ? (
              <CircleUserRound size={36} />
            ) : (
              <img
                src={
                  "http://marketplace.node.ed.asmer.org.ua/" +
                  chats[chatUrl][0].to.avatar.url
                }
              />
            )}
            <p>
              чат c{" "}
              {chats[chatUrl][0].owner._id !== _id
                ? chats[chatUrl][0].owner.login
                : chats[chatUrl][0].to.login}
            </p>
          </Link>
        ))}
      </div>
      <div className="message-main">
        <Route path="/message" render={() => <h2>У вас немає чатів</h2> } exact />
        <Route path="/message/:chat_id" component={MessageComponent} />
      </div>
      <Route path="/message/:chat_id" component={MessageInput} />
    </div>
  );
};

export default Message;
