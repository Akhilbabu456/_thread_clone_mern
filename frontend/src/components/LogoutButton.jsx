import { Button } from "@chakra-ui/react"
import { useRecoilState } from "recoil"
import useShowToast from "../hooks/useShowToast"
import userAtom from "../atoms/userAtom"


const LogoutButton = () => {
    const setUser = useRecoilState(userAtom)
    const showToast = useShowToast()
    const handleLogout =async()=>{
        try {

            const res = await fetch("/api/users/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()

            if(data.error){
               showToast("Error", data.error, "error")
               return
            }
            localStorage.removeItem("user-threads")

            setUser(null)
        } catch (error) {
            console.log(`Error in handleLogout ${error}`)
        }
    }
  return (
    <Button
    position={"fixed"}
    top={"30px"}
    right={"30px"}
    size={"sm"}
    onClick={handleLogout}
    >
     Logout   
    </Button>
  )
}

export default LogoutButton