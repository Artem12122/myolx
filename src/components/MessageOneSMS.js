import { CircleUserRound } from "lucide-react"
import dateCreatedAt from "../utils/date"



const MessageOneSMS = ({ smsObj, user_id}) => {

    const {owner, to, text, createdAt, _id} = smsObj

    return (
        <div 
            style={owner._id === user_id ? {alignSelf: "end", textAlign: "right"} : {alignSelf: "start"} }
            className="message-one-SMS"
        >
            <div className="message-one-date">{dateCreatedAt(createdAt)}</div>
            <p>{text}</p>
        </div>
    )
}

export default MessageOneSMS

