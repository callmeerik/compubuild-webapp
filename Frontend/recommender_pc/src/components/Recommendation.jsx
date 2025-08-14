import { useContext } from "react"
import { RecommenderContext } from "../context/RecommenderContext"

const Recommendation = () => {
    const { recommendation, error } = useContext( RecommenderContext )
      if (!recommendation) return null;
  return (
    <section className="recommendation"> 
        {
            error && alert(error)
        }
        <h2> Recomendacion </h2>
        <div className="content-wrapper">
            <div className="suggestion">
                <h3> Componentes Sugerido </h3>
                <div className="components-wrapper">
                    {
                        Object.entries( recommendation.components ).map( ([key, name]) => (
                            <div className="item" key={key}>
                                <span> {key}: </span> {name}
                            </div>
                            
                        ) )
                    }
                </div>  
                <p className="estimated_price"> 
                    Precio Estimado: <span> {recommendation.estimated_price} </span>
                </p>

            </div>
            <div className="reason">
                <h3> ¿Por qué estos componentes? </h3>
                <p className="reason-text">
                    { recommendation.reason.replaceAll('**', ' ') }
                </p>
            </div>
            </div>
    </section>
  )
}

export default Recommendation