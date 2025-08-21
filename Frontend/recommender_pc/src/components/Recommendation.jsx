import { useContext } from "react";
import { RecommenderContext } from "../context/RecommenderContext";

const Recommendation = () => {
    const { recommendation, loading, error } = useContext(RecommenderContext);

    if (loading) {
        return <p>Cargando recomendación...</p>;
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!recommendation) {
        return <p>Aún no hay una recomendación. Por favor, llena el formulario.</p>;
    }

    return (
        <section className="recommendation">
            <h2>Recomendación</h2>
            <div className="content-wrapper">
                <div className="suggestion">
                    <h3>Componentes Sugeridos</h3>
                    <div className="components-wrapper">
                        {
                            Object.entries(recommendation.components || {}).map(([key, name]) => (
                                <div className="item" key={key}>
                                    <span>{key}:</span> {name}
                                </div>
                            ))
                        }
                    </div>
                    <p className="estimated_price">
                        Precio Estimado: <span>{recommendation.estimated_price}</span>
                    </p>
                </div>
                <div className="reason">
                    <h3>¿Por qué estos componentes?</h3>
                    <p className="reason-text">
                        {/* Aquí está el cambio crucial */}
                        { (recommendation.reason || '').replaceAll('**', ' ') }
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Recommendation;