import { Avatar, Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import {BsInstagram} from "react-icons/bs"

const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                Mark Zuckerberg
            </Text>
            <Flex gap={2} alignItems={"center"}>
               <Text fontSize={"sm"}>markzuckerberg</Text>
               <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                 threads.net
               </Text>
            </Flex>
        </Box>
        <Box>
            <Avatar
             name="Mark Zuckerberg"
             src="/zuck-avatar.png"
             size={"xl"}
            />
        </Box>
      </Flex>
      <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>3.2k followers</Text>
            <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
          </Flex>
          <Flex>
            <Box>
                <BsInstagram size={24} cursor={"pointer"}/>
            </Box>
          </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader