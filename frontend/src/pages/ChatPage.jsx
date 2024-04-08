import {Box, Flex} from '@chakra-ui/react'

const ChatPage = () => {
  return (
    <Box position={"absolute"}
      left={"50%"}
      w={{
        base: "100%",
        md: "80%",
        lg:"750px"
      }}
      p={4}
      transform={"translateX(-50%)"}
    >
      <Flex
       gap={4}
       flexDirection={{
        base: "column",
        md: "row"
       }}
       maxW={{
        sm: "400px",
        md: "full"
       }}
       mx={"auto"}
      >
        <Flex flex={30}>conversation</Flex>  
        <Flex flex={70}>mesasage</Flex>  
      </Flex>  
    </Box>
  )
}

export default ChatPage