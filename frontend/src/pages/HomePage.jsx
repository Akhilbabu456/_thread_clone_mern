import { Flex, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const HomePage = ()=>{
    return(
        <Link to={"/markzuckerberg"}>
            <Flex w={"full"} justifyContent={"center"}>
                <Button mx={"auto"}>Visit profile page</Button>
            </Flex>
        </Link>
    )
}

export default HomePage