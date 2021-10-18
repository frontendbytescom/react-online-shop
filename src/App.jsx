import productList from "./productList";
import { useState } from "react";

// https://github.com/frontendbytescom/react-online-shop-starter

const App = () => {
    const [randomOffer] = useState(productList[Math.floor(Math.random() * productList.length)]);
    const [totalBoughtProducts, setTotalBoughtProducts] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState(productList);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(0);

    //const randomItem = Math.floor(Math.random() * productList.length);
    //const promotedProduct = productList[randomItem];
    //promotedProduct.newPrice = Math.round(parseInt(promotedProduct.price.substring(1)) / 2);

    randomOffer.newPrice = Math.round(parseInt(randomOffer.price.substring(1)) / 2);
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const monthName = monthNames[today.getMonth()];
    const formatedDate = `${today.getDate()} ${monthName}`;

    const categories = [''];
    for (let i = 0; i < productList.length; i++) {
        if (!categories.includes(productList[i].category)) {
            categories.push(productList[i].category);
        }
    }

    const handleNameFilter = (e) => {
        let filtered = [];

        for (let i = 0; i < productList.length; i++) {
            if (productList[i].name.toLowerCase().includes(e)
                && productList[i].category.toLowerCase().includes(categoryFilter)
                && parseInt(productList[i].price.substring(1)) > priceFilter) {
                filtered.push(productList[i]);
            }
        }

        setFilteredProducts(filtered);
        setNameFilter(e);
    }

    const handleCategoryFilter = (e) => {
        let filtered = [];
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].name.toLowerCase().includes(nameFilter)
                && productList[i].category.toLowerCase().includes(e)
                && parseInt(productList[i].price.substring(1)) > priceFilter) {
                filtered.push(productList[i]);
            }
        }

        setFilteredProducts(filtered);
        setCategoryFilter(e);
    }

    const handlePriceFilter = (e) => {
        let filtered = [];
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].name.toLowerCase().includes(nameFilter)
                && productList[i].category.toLowerCase().includes(categoryFilter)
                && parseInt(productList[i].price.substring(1)) > e) {
                filtered.push(productList[i]);
            }
        }

        setFilteredProducts(filtered);
        setPriceFilter(e);
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

    const reset = (e) => {
        e.preventDefault();
        setFilteredProducts(productList);
        setCategoryFilter('');
        setNameFilter('');
        setPriceFilter(0);
    }

    return (
        <>
            <section className="filter">
                <div className="container">
                    <input 
                        type="text"
                        placeholder="Product name"
                        value={nameFilter}
                        onChange={e => handleNameFilter(e.target.value.toLocaleLowerCase())}
                    />

                    <select 
                        value={categoryFilter}
                        onChange={e => handleCategoryFilter(e.target.value.toLocaleLowerCase())}
                    >
                    {categories.length ?
                        categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                        : null
                    }
                    </select>

                    <input 
                        type="number"
                        min="0"
                        step="10"
                        placeholder="Price number..."
                        onChange={e => handlePriceFilter(e.target.value)}
                        value={priceFilter}
                    />

                    <button className="btn" onClick={reset}>
                        Reset all filters
                    </button>

                    <div>
                        Total bought products: {totalBoughtProducts}
                    </div>
                </div>
            </section>

            <section className="promotion">
                <h2>Don't miss today's hot deal!</h2>

                <div className="card">
                    <div className="card-image">
                        <img src={randomOffer.image} alt={randomOffer.name} />
                    </div>
                    <div className="card-body">
                        <h3>{randomOffer.name}</h3>
                        <p>{randomOffer.shortDescription}</p>
                        <p className="old-price">{randomOffer.price}</p>
                        <p>
                            <span>${randomOffer.newPrice}</span> only on {" "}
                            <span>{formatedDate}</span>
                        </p>
                        <a href="#" className="btn">
                            Buy now
                        </a>
                    </div>
                </div>
            </section>

            <section className="products">
                {filteredProducts.map(product => (
                    <div className="card">
                        <div className="card-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="card-body">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">{product.price}</p>
                            <button 
                                className="btn" 
                                onClick={() => toggleProductBoughtStatus(product)} 
                            >
                               {product.isBought ? "Remove from cart" : "Add to cart"} 
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <footer>
                <p>We bring you <strong>only the best products</strong> that can be randomly generated!</p>
                <p>Content from <a href="https://marak.github.io/faker.js/">faker.js</a> with images from <a href="https://picsum.photos/">Lorem Picsum</a></p>
            </footer>
        </>
    );
};

export default App;