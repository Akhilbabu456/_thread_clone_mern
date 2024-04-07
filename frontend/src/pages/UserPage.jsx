import { useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import {useParams } from "react-router-dom"
import { useEffect } from "react"
import useShowToast from "../hooks/useShowToast"
import {Flex,Spinner} from "@chakra-ui/react"


const UserPage = () => {
  const [user, setUser] = useState(null)
  const {username} = useParams()
  const showToast = useShowToast()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
     const getUser = async()=>{
       try{
          const res = await fetch(`/api/users/profile/${username}`)
          const data = await res.json()
          if(data.error){
             showToast("Error", data.error, "error")
            }else{
              setUser(data)
            }
          }catch(error){
              
            showToast("Error", error, "error")
       }finally{
        setLoading(false)
       }
     }
     getUser()
  }, [username, showToast])

  if(!user && loading){
    return(
      <Flex justifyContent={"center"}>
        <Spinner size="xl"/>

      </Flex>
    )
  }

  if(!user && !loading) return <h1>User not found</h1>
   
  
  return (
    <>
      <UserHeader user={user}/>
     
    </>
  )
}

export default UserPage