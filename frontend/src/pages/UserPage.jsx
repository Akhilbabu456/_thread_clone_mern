import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"


const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost likes={1200} replies={481} postImg="/post1.png" postTitle="Lets talk about Threads."/>
      <UserPost likes={120} replies={41} postImg="/post2.png" postTitle="Nice tutorial."/>
      <UserPost likes={200} replies={81} postImg="/post3.png" postTitle="I love this guy."/>
      <UserPost likes={100} replies={48} postTitle="This is my first Threads."/>
    </>
  )
}

export default UserPage