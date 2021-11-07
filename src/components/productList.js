const ProductList = ({
        products,
        toggleProductBoughtStatus,
        selectedLanguage
    }) => {

    return <section className="products">
        {products.map(product => (
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
                    {product.isBought ? selectedLanguage.removeCartButton : selectedLanguage.addCartButton} 
                    </button>
                </div>
            </div>
        ))}
    </section>
}

export default ProductList;
