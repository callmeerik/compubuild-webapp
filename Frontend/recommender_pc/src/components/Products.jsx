import { useContext } from "react";
import { RecommenderContext } from "../context/RecommenderContext";

const Products = () => {
    const { recommendation, loading, error } = useContext(RecommenderContext);

    // Manejar el estado de carga y error primero
    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    
    // Si no hay recomendación o productos, no renderizar nada
    if (!recommendation || !recommendation.similar_products) {
        return null;
    }

    return (
        <section className="products">
            <h2>Productos Similares</h2>
            <div className="products-wrapper">
                {
                    // Usa el encadenamiento opcional para evitar errores si la propiedad no existe
                    recommendation.similar_products?.length > 0 ? (
                        recommendation.similar_products.map((product, i) => (
                            <div className="card" key={i}>
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
        </section>
    );
}

export default Products;