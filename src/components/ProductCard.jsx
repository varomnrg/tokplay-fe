import { useState } from "react";
import { Flex, Box, Image, Link, ModalOverlay, Modal, HStack, ModalContent, Spinner, Text } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";
import { useGetProductDetails } from "../hooks";

function ProductCard({ products }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { productDetail, productDetailLoading } = useGetProductDetails(products._id);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (productDetailLoading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Flex>
        );
    }

    return (
        <>
            <Link onClick={handleOpenModal}>
                <Box bg={"#333333"} maxW="140px" color="white" shadow="lg" roundedBottom="lg" position="relative">
                    <Image objectFit="cover" roundedTop="lg" src={products.imageUrl} alt={`Picture of ${products.name}`} />
                    <Box px="3" py="2">
                        <Flex mt="1" justifyContent="space-between" alignContent="center">
                            <Box fontSize="sm" fontWeight="semibold" as="h4" lineHeight="tight">
                                {products.name}
                            </Box>
                        </Flex>

                        <Flex justifyContent="space-between" alignContent="center">
                            <Box fontSize="xs">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(productDetail.price)}</Box>
                        </Flex>
                    </Box>
                </Box>
            </Link>

            <Modal isOpen={isModalOpen} size={"2xl"} onClose={handleCloseModal} isCentered>
                <ModalOverlay />
                <ModalContent bg="#333333">
                    <Flex direction="row" color="black" maxW="2xl" rounded="lg" shadow="lg" position="relative">
                        <Image boxSize="350px" src={productDetail.imageUrl} alt={`Picture of ${productDetail.name}`} roundedTop="lg" />
                        <Box px="6" maxH="350px" py="5" color="white" overflow="wrap">
                            <Flex h="100%" direction="column" justifyContent="space-between" alignContent="center">
                                <Text fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight">
                                    {productDetail.name}
                                </Text>
                                <Text fontSize="md" fontWeight="semibold" as="h4" lineHeight="tight">
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(productDetail.price)}
                                </Text>

                                <Box
                                    flex={1}
                                    fontSize="md"
                                    my="2"
                                    style={{ overflow: "scroll", scrollbarWidth: "none" }}
                                    css={{
                                        "&::-webkit-scrollbar": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    {productDetail.description}
                                </Box>
                                <HStack>
                                    <Link href={productDetail.productUrl} color="#50aa53" _hover={{ color: "#3c8f44" }} isExternal>
                                        See more
                                    </Link>
                                    <BiLinkExternal color="#50aa53" />
                                </HStack>
                            </Flex>
                        </Box>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProductCard;
