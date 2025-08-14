import Form from "./components/Form"
import Header from "./components/Header"
import Products from "./components/Products"
import Recommendation from "./components/Recommendation"
import RecommenderProvider from "./components/Recommender"
import './App.css'
const App = () => {
  return (
    <>
        <Header/>
        <RecommenderProvider>
            <Form/>
            <Recommendation/>
            <Products/>
        </RecommenderProvider>
    </>
  )
}

export default App