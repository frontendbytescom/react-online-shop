import { useState } from 'react';
import productList from "../productList";

const Filters = ({
                    categories,
                    filterProductsHandler,
                    toggleLanguage,
                    selectedLanguage,
                    totalBoughtProducts
                }) => {

    const [categoryFilter, setCategoryFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState(0);

    const reset = (e) => {
        e.preventDefault();
        filterProductsHandler(productList);
        setCategoryFilter('');
        setNameFilter('');
        setPriceFilter(0);
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

        filterProductsHandler(filtered);
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

        filterProductsHandler(filtered);
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

        filterProductsHandler(filtered);
        setPriceFilter(e);
    }

    return <section className="filter">
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
}

export default Filters;