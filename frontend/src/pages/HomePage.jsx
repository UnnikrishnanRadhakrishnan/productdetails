import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

    const { fetchProducts, products }  = useProductStore();
    useEffect(() => {
		fetchProducts();
    }, [fetchProducts]);
    
    console.log("products", products);
    
    return <Container maxW='conatiner.x1' py={12}>
        <VStack spacing={8}>
            <Text fontSize={"3xl"}
				fontWeight={"bold"}
                textAlign={"center"}
                bgGradient="to-r"
                gradientFrom="cyan.400"
                gradientTo="blue.500" 
                bgClip={"text"}
                alignContent={"center"}>
                Current Products 🚀
            </Text> 
            <SimpleGrid columns={{
						base: 1,
						md: 2,
						lg: 3,
            }}
                gap={"10"}
                w={"full"}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}></ProductCard>
                ))}
            
            </SimpleGrid>
           {products.length == 0 && ( <Text fontSize={"initial"} textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
			</Text>)}
        </VStack>
    </Container>
}

export default HomePage;