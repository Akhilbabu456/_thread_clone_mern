import { useRecoilValue } from "recoil"
import LoginCard from "../components/LoginCard"
import authScreenAtom from "../atoms/authAtom"
import SignUpCard from "../components/SignUpCard"


const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom)
  return (
    <>
        {authScreenState === "login" ? <LoginCard/>: <SignUpCard/>}
    </>
  )
}

export default AuthPage