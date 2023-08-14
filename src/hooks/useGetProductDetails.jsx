import { ProductAPI } from "../api";
import { useState, useEffect } from "react";

function useGetProductDetail(productId) {
    const [productDetailLoading, setProductDetailLoading] = useState(true);
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        async function fetchProductDetail(productId) {
            try {
                const fetchedProductDetail = await ProductAPI.getProductDetails(productId);
                setProductDetail(fetchedProductDetail);
                setProductDetailLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProductDetail(productId);
    }, []);

    return { productDetail, productDetailLoading };
}

export default useGetProductDetail;
