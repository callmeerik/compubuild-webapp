import { useState } from 'react'
import { postData, fetchData } from '../utils/useApi'
import { RecommenderContext } from '../context/RecommenderContext'

const RecommenderProvider = ( {children} ) => {
    const [recommendation, setRecommendation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // metodo para crear recomendacion y productos
    const createSuggestion = async (userData) => {
        try {
            setLoading(true)
            await postData( userData )
            await getSuggestion()
            setLoading(false)
        } catch (err) {
            setError( err.response?.data?.detail || 'Error al crear la ugerencia' )
        }
    }

    const getSuggestion = async () => {
        try {
            setError(null)
            const resp = await fetchData()
            await new Promise((resolve) => setTimeout(resolve, 500));
            setRecommendation( resp.data )
            setLoading(false)
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al obtener la sugerencia')
        }       
    }

    // return context provider
    return (
        <RecommenderContext.Provider
            value={{
                recommendation,
                loading,
                error,
                createSuggestion
            }}
        >
            { children }
        </RecommenderContext.Provider>
    )
}

export default RecommenderProvider