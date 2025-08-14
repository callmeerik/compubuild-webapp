import { useContext } from "react"
import { RecommenderContext } from "../context/RecommenderContext"

const Products = () => {
    const { recommendation, error } = useContext(RecommenderContext)
    if (!recommendation) return null;
    return (
        <section className="products">
            {
                error && alert(error)
            }
            <h2>Productos Similares</h2>
            <div className="products-wrapper">
                {
                    recommendation.similar_products.map( (product, i) => (
                        <div className="card" key={i}>
                            <div className="card-img">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="card-body">
                                <h4 className="product-title"> {product.title} </h4>
                                <p className="product-price"> {product.price} </p>
                                <a href={ product.link } target="_blank"> Ver Más </a>
                            </div>
                        </div>
                    ) )
                }
            </div>
        </section>
    )
}

export default Products