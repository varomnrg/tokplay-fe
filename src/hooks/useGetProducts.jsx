import { ProductAPI } from "../api";
import { useState, useEffect } from "react";

function useGetProducts({ videoId }) {
    const [productsLoading, setProductsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts(videoId) {
            try {
                setProductsLoading(true);
                const fetchedProducts = await ProductAPI.getProductsByVideoId(videoId);
                setProducts(fetchedProducts);
                setProductsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts(videoId);
    }, []);

    return { products, productsLoading };
}

export default useGetProducts;
