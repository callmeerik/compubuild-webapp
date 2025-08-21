import { useState } from 'react';
import { postData } from '../utils/useApi'; // Ya no necesitas fetchData aquí
import { RecommenderContext } from '../context/RecommenderContext';

const RecommenderProvider = ({ children }) => {
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createSuggestion = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const newRecommendation = await postData(userData);
            setRecommendation(newRecommendation);
            
        } catch (err) {
            // Manejo de errores simplificado
            setError(err.response?.data?.detail || 'Error al crear la sugerencia');
            setRecommendation(null);
        } finally {
            // Asegúrate de apagar el estado de carga
            setLoading(false);
        }
    }

    // Ya no necesitas la función getSuggestion porque la data se obtiene en el POST
    
    return (
        <RecommenderContext.Provider
            value={{
                recommendation,
                loading,
                error,
                createSuggestion
            }}
        >
            {children}
        </RecommenderContext.Provider>
    )
}

export default RecommenderProvider;