import { Flex, Spinner, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";
import SuggestedUsers from "../components/SuggestedUsers";


const HomePage = ()=>{
    const [posts, setPosts]= useRecoilState(postAtom)
    const [loading, setLoading] = useState(false)
    const showToast = useShowToast()

    useEffect(() => {
     const getFeedPost = async()=>{
        setLoading(true)
        setPosts([])
        try{
           const res = await fetch("/api/posts/feed")
           const data = await res.json()
           if(data.error){
            showToast("Error", data.error, "error")
            return
           }
           setPosts(data)
        }catch(error){
          showToast("Error", error.message, "error")
        }finally{
            setLoading(false)
        }
     }
     getFeedPost()
    }, [showToast, setPosts])
    return(
       <Flex gap={10}>
       <Box flex={70}>
         {!loading && posts.length === 0 && <h1>Follow some users to see feed</h1>}

         {loading && (
            <Flex justifyContent={"center"}>
               <Spinner size= "xl"/>
            </Flex>
         )}

         {posts.map((post)=>(
            <Post key={post._id}  post={post} postedBy={post.postedBy}/>
         ))}
      </Box>
      <Box
				flex={30}
				display={{
					base: "none",
					md: "block",
				}}
			>
				<SuggestedUsers />
			</Box>
       </Flex>
    )
}

export default HomePage