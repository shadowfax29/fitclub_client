import { useEffect ,useState} from "react"
import axios from "../../utils/axios"
export const useOwner=()=>{
    const [detail, setDetail] = useState({})
    const [flag,setFlag]=useState(false)
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("/user/ownerProfile", {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                setDetail(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetch()

    }, [flag])
    const trigger=()=>{
        setFlag(!flag)
    }
    return {detail,trigger}
}