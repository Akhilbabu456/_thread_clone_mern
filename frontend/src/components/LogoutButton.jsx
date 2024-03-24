import { Button } from "@chakra-ui/react"
import { useRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"


const LogoutButton = () => {
    const setUser = useRecoilState(userAtom)
    const handleLogout =async()=>{
        try {
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