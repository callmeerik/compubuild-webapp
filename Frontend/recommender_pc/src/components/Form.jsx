import { useState, useContext } from "react"
import { RecommenderContext } from "../context/RecommenderContext"
import Button from "./Button"

const Form = () => {

    const [ userForm, setUserForm ] = useState({
        profession: '',
        device: '',
        activity: ''
    })
    const { createSuggestion, loading } = useContext( RecommenderContext )

    const handleChange = (e) =>{
        const { name, value } = e.target

        setUserForm( (prev) => ({
            ...prev,
            [name] : value
        }) )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createSuggestion(userForm)
        setUserForm({
            profession: '',
            device: '',
            activity: ''
        })
    } 
  return (
    <section className="form">
        <form action="" className="form-recommendation" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="profession">¿Cuál es tu profesión o trabajo?</label>
                <input 
                    type="text" 
                    name="profession" 
                    id="profession" 
                    value={userForm.profession}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="device">¿Qué tipo de dispositivo prefieres?</label>
                <select 
                    name="device" 
                    id="device" 
                    className="select-device"
                    value={userForm.device}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Selecciona una opción--</option>
                    <option value="desktop">Desktop</option>
                    <option value="laptop">Laptop</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="activity">¿Para qué usarás el dispositivo?</label>
                <input 
                    type="text" 
                    name="activity" 
                    id="activity" 
                    value={userForm.activity}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button
                text = { loading ? 'Generando Sugerencia...' : 'Generar Sugerencia' }
            />
        </form>
    </section>
  )
}

export default Form