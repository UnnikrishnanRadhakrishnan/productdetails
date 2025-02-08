import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "../store/product.js";
import { Box, Button, Container, Heading, Input, VStack} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster.jsx";


const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image:""
    });
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        console.log(success);
        console.log(message);
        if (!success) {
            toaster.create({
                title: "Error",
                type: "error",
                description: message,
            })
        }
        else {
            toaster.create({
                title: "Success",
                type: "success",
                description: message,
            })
        }
        setNewProduct({ name: "", image: "", price: "" });
    }
        return <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size="3xl" textAlign={"center"} mb={8}>Create New Product</Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder="Image"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                    </VStack>
                    <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add Product</Button>
                </Box>
            </VStack>
        </Container>
    }

export default CreatePage;