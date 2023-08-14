class ProductAPI {
    static async getProductsByVideoId(videoId) {
        const response = await fetch(`https://varomnrg.xyz/tokplay/products/list/${videoId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        let products = data.data;
        return products;
    }

    static async getProductDetails(productId) {
        const response = await fetch(`https://varomnrg.xyz/tokplay/products/${productId}/details`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        let product = data.data;
        return product;
    }
}

export default ProductAPI;
