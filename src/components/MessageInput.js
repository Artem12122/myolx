import { Send } from "lucide-react"
import { useState } from "react"
import { useAddMassageMutation } from "../store/api"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"



const MessageInput = ({my_id}) => {
    const { chat_id } = useParams();
    const [messageQuery, { isLoading, data }] = useAddMassageMutation()
    const _id = useSelector((state) => state.auth.userInfo._id);

    const [text, setText] = useState("")


    const addMassage = (e) => {
        e.preventDefault();

        const to_id = chat_id.split("_").filter((to_id) => to_id !== _id).join("");
        
        messageQuery({ _id: to_id, text})

        setText("")
    }



    return (
        <form className="message-input">
            <input 
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button 
                onClick={e => addMassage(e)}
            ><Send /></button>
        </form>
    )
}


export default MessageInput