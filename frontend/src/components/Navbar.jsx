import { Button, Container, Flex, HStack, Icon, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import { useColorMode} from "./ui/color-mode";
import { CgDarkMode } from "react-icons/cg";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
    const {toggleColorMode } = useColorMode();
    return <Container maxW={"1140px"} px={4}>
        <Flex
            h={10}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm : "row"
            }}
        >
                <Link to={"/"}><Icon as={FaHome} size={"2xl"} color="cyan.400" /></Link>  

            <HStack spacing ={2} alignItems={"center"}>
                <Link to={"/create"}>
                <Button>
                  <BsCartPlusFill fontSize={20}/>
                    </Button>
                </Link>
                <Button variant="outline" >
                    <CgDarkMode onClick={toggleColorMode}/>
                </Button>
            </HStack>

        </Flex>
    </Container>
}

export default Navbar;