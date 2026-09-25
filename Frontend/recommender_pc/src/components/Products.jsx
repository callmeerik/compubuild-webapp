import { useContext, useState } from "react";
import { RecommenderContext } from "../context/RecommenderContext";

const PRODUCTS_PER_PAGE = 6;

const Products = () => {
    const { recommendation, loading, error } = useContext(RecommenderContext);
    const [page, setPage] = useState(1);

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!recommendation || !recommendation.similar_products) {
        return null;
    }

    const products = recommendation.similar_products;
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const visibleProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

    return (
        <section className="products">
            <h2>Productos Similares</h2>
            <div className="products-wrapper">
                {
                    visibleProducts.length > 0 ? (
                        visibleProducts.map((product, i) => (
                            <div className="card" key={start + i}>
                                <div className="card-img">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="card-body">
                                    <h4 className="product-title">{product.title}</h4>
                                    <p className="product-price">{product.price}</p>
                                    <a href={product.link} target="_blank" rel="noopener noreferrer">Ver Más</a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron productos similares en Amazon.</p>
                    )
                }
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="arrow"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            className={num === page ? "active" : ""}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        className="arrow"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
}

export default Products;