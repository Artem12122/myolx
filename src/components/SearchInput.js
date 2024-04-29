import { ArrowLeft, Search } from "lucide-react"
import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom";


const SearchInput = () => {
    const [value, setValue] = useState("")
    const history = useHistory();

    const searchbtnFunk = (e) => {
        e.preventDefault();

        history.push(`/searh/${value}`)
    }

    return (
        <>
            <form className="search">
                {history.location.pathname.length > 5 && <Link className="goBack-AdOne"  to={"/"} ><ArrowLeft size={32} /></Link>}
                <input 
                    className="search-input" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button 
                    className="search-btn" 
                    onClick={e => searchbtnFunk(e)}
                >Пошук <Search /></button>
            </form>
        </>
    )
}


export default SearchInput