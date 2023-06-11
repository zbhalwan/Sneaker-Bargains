interface IPrice {
    vendor: string,
    price: number
}

interface IProduct {
    key: string,
    value: string,
    image: string,
    prices: IPrice[],
}

const mockProductList : IProduct[] = [
    {
        key: "Gazelle-bold-shoes",
        value: "Nike gazelle bold shoes",
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c69922d42fc84de28e9baf5400edaf14_9366/Gazelle_Bold_Shoes_Black_HQ4408_02_standard.jpg",
        prices: [ 
            {
                vendor: "Vendor 1",
                price: 45
            },
            {
                vendor: "Vendor 2",
                price: 45.67
            },
            {
                vendor: "Vendor 3",
                price: 46
            }
        ] 
    },
    {
        key: "Samba-og-shoes",
        value: "Adidas Samba OG Shoes",
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/afc3c512c53f4629bb81af5400ed8281_9366/Gazelle_Bold_Shoes_Black_HQ4408_01_standard.jpg",
        prices: [ 
            {
                vendor: "Vendor 1",
                price: 23
            },
            {
                vendor: "Vendor 2",
                price: 19
            },
            {
                vendor: "Vendor 3",
                price: 20
            }
        ] 
    },
    {
        key: "nizza-platform-shoes",
        value: "Puma Nizza Platform Shoes",
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e05ab433db5a48b4abe7abeb000f0a90_9366/Nizza_Platform_Shoes_White_FV5322_01_standard.jpg",
        prices: [ 
            {
                vendor: "Vendor 1",
                price: 100
            },
            {
                vendor: "Vendor 2",
                price: 100
            },
            {
                vendor: "Vendor 3",
                price: 100
            }
        ] 
    },
    {
        key: "vegan-cycling-shoes",
        value: "Adidas Vegan Cycling Shoes",
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/684abd9e16ba4a89aa49ae14012f3c37_9366/The_Velosamba_Vegan_Cycling_Shoes_Black_GY5597_01_standard.jpg",
        prices: [ 
            {
                vendor: "Vendor 1",
                price: 90
            },
            {
                vendor: "Vendor 2",
                price: 90.01
            },
            {
                vendor: "Vendor 3",
                price: 90.10
            }
        ] 
    },
    {
        key: "ultra-4d-running-shoes",
        value: "Adidas Ultra Running Shoes",
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0fbed4646c1d46e0aae0af6901301ff4_9366/Ultraboost_Light_Running_Shoes_White_HQ6351_01_standard.jpg",
        prices: [ 
            {
                vendor: "Vendor 1",
                price: 65
            },
            {
                vendor: "Vendor 2",
                price: 23
            },
            {
                vendor: "Vendor 3",
                price: 400
            }
        ] 
    },
  ];

export const getPrices = (productKey: string): IPrice[] => {
    const oneProduct = mockProductList.filter((product) => product.key == productKey)
    if (oneProduct.length > 0) {
        return oneProduct[0].prices;
    } else {
        return [];
    }
}

export const getProduct = (productKey: string): IProduct =>  {
        const oneProduct = mockProductList.filter((product) => product.key == productKey)
        return oneProduct[0];
}
