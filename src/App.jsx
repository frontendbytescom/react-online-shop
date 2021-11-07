import productList from "./productList";
import { useState } from "react";
import Filters from "./components/filters";
import Promotion from "./components/promotion";
import language from './language';
import Coupon from "./components/coupon";
import Footer from "./components/footer";
import ProductList from "./components/productList";

// https://github.com/frontendbytescom/react-online-shop-starter

const originalPrices = productList.map(element => element.price);

const App = () => {
    const [randomOffer] = useState(productList[Math.floor(Math.random() * productList.length)]);
    const [totalBoughtProducts, setTotalBoughtProducts] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState(productList);
    const [selectedLanguage, setSelectedLanguage] = useState(language.english);

    const categories = [''];
    for (let i = 0; i < productList.length; i++) {
        if (!categories.includes(productList[i].category)) {
            categories.push(productList[i].category);
        }
    }

    const toggleProductBoughtStatus = (product) => {
        if (product.isBought) {
            product.isBought = false;
            setTotalBoughtProducts(totalBoughtProducts - 1);
        } else {
            product.isBought = true;
            setTotalBoughtProducts(totalBoughtProducts + 1);
        }

        setFilteredProducts([...filteredProducts]);
    }

    const updateFilteredProducts = (products) => {
        setFilteredProducts([...products]);
    }

    const toggleLanguage = (newLanguage) => {
        setSelectedLanguage(newLanguage);
    }

    const applyDiscount = (discount) => {
        for (let i = 0; i < filteredProducts.length; i++) {
            filteredProducts[i].price = originalPrices[i];
            let priceNumber = filteredProducts[i].price.substring(1);
            let finalPrice = priceNumber - (priceNumber * (discount / 100));
            filteredProducts[i].price = '$' + finalPrice;
        }

        setFilteredProducts([...filteredProducts]);
    }

    return (
        <>
            <Filters
                categories={categories}
                filterProductsHandler={updateFilteredProducts}
                totalBoughtProducts={totalBoughtProducts}
                selectedLanguage={selectedLanguage}
                toggleLanguage={toggleLanguage}
            ></Filters>

            <Coupon
                applyDiscount={applyDiscount}
                selectedLanguage={selectedLanguage}
            ></Coupon>

            <Promotion
                promotion={randomOffer}
                selectedLanguage={selectedLanguage}
            ></Promotion>

            <ProductList
                products={filteredProducts}
                toggleProductBoughtStatus={toggleProductBoughtStatus}
                selectedLanguage={selectedLanguage}
            ></ProductList>

            <Footer
                selectedLanguage={selectedLanguage}
            ></Footer>
        </>
    );
};

export default App;