import { useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import {useParams } from "react-router-dom"
import { useEffect } from "react"
import useShowToast from "../hooks/useShowToast"


const UserPage = () => {
  const [user, setUser] = useState(null)
  const {username} = useParams()
  const showToast = useShowToast()

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
       }
     }
     getUser()
  }, [username, showToast])

  if(!user) return null
   
  return (
    <>
      <UserHeader user={user}/>
      <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Lets talk about Threads."/>
      <UserPost likes={120} replies={41} postImg="/post2.png" postTitle="Nice tutorial."/>
      <UserPost likes={200} replies={81} postImg="/post3.png" postTitle="I love this guy."/>
      <UserPost likes={100} replies={48} postTitle="This is my first Threads."/>
    </>
  )
}

export default UserPage