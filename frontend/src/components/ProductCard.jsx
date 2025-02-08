import { Box, Button, Heading, HStack,IconButton, Image, Input, Stack, Text, VStack } from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "./ui/toaster";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from "@/components/ui/dialog"
import {useState } from "react";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();
    const [isOpen, setIsOpen] = useState(false); 
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (id) => {
        const { success, message } = await deleteProduct(id);
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
    }

    const handleUpdateProduct = async (id, updatedProduct) => {
        const { success, message } = await updateProduct(id, updatedProduct);
        setIsOpen(false);
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
                description: "Product updated succesfully",
            })
        }
    }
    return (
        <Box shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}>

            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            
            <Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					£{product.price}
				</Text>

                <HStack spacing={2}>
                    <IconButton onClick={() => setIsOpen(true)}>
                        <FaEdit size={20} />
                    </IconButton>
                    <IconButton onClick = {()=> handleDeleteProduct(product._id)}>
                        <RiDeleteBin5Fill size={20}/>
                    </IconButton>
                </HStack>
                <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody pb="4">
                <VStack spacing={4}>
							<Input
								placeholder='Product Name'
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
                                    type='number'
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
              </DialogBody>
                <DialogFooter>
                            <Button variant="outline" onClick = { () => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
            </Box>
        </Box>
    )
}

export default ProductCard;