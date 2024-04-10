import { useState } from "react"
import UserHeader from "../components/UserHeader"
import {useParams } from "react-router-dom"
import { useEffect } from "react"
import useShowToast from "../hooks/useShowToast"
import {Flex,Spinner} from "@chakra-ui/react"
import Post from "../components/Post"
import useGetUserProfile from "../hooks/useGetUserProfile"
import { useRecoilState} from "recoil"
import postAtom from "../atoms/postAtom"


const UserPage = () => {
  const {user, loading} = useGetUserProfile()
  const {username} = useParams()
  const showToast = useShowToast()
  const [posts,setPosts] = useRecoilState(postAtom)
  const [fetchingPosts, setFetchingPosts] = useState(true)

  useEffect(()=>{
   

     const getPosts = async()=>{
      if(!user) return
      setFetchingPosts(true)
       try {
         const res = await fetch(`/api/posts/user/${username}`)
         const data = await res.json()
         console.log(data)
         setPosts(data)
       } catch (error) {
         showToast("Error", error, "error")
         setPosts([])
       }finally{
        setFetchingPosts(false)
       }
     }

     
     getPosts()
  }, [username, showToast, setPosts, user])

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

      {!fetchingPosts && posts.length === 0 && <h1>User has no posts</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size="xl"/>
        </Flex>
      )}
     {posts.map((post )=>(
      <Post key={post._id} post={post} postedBy={post.postedBy} />
     ))}
    </>
  )
}

export default UserPage