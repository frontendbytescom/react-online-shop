import productList from "./productList";

// https://github.com/frontendbytescom/react-online-shop-starter

const App = () => {
    const randomItem = Math.floor(Math.random() * productList.length);
    const promotedProduct = productList[randomItem];
    promotedProduct.newPrice = Math.round(parseInt(promotedProduct.price.substring(1)) / 2);
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const monthName = monthNames[today.getMonth()];
    const formatedDate = `${today.getDate()} ${monthName}`;

    return (
        <>
            <section className="promotion">
                <h2>Don't miss today's hot deal!</h2>

                <div className="card">
                    <div className="card-image">
                        <img src={promotedProduct.image} alt={promotedProduct.name} />
                    </div>
                    <div className="card-body">
                        <h3>{promotedProduct.name}</h3>
                        <p>{promotedProduct.shortDescription}</p>
                        <p className="old-price">{promotedProduct.price}</p>
                        <p>
                            <span>${promotedProduct.newPrice}</span> only on {" "}
                            <span>{formatedDate}</span>
                        </p>
                        <a href="#" className="btn">
                            Buy now
                        </a>
                    </div>
                </div>
            </section>

            <section className="products">
                {productList.map(product => (
                    <div className="card">
                        <div className="card-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="card-body">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">{product.price}</p>
                            <a href="#" className="btn">
                                Add to cart
                            </a>
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