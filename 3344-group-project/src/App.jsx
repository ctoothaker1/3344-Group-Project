// import { useState } from 'react'
// import siteLogo from '/siteLogo.svg'  -- we should have our own logo
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './Pages/Home/Home.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Search from './Pages/Search/Search.jsx'
import MyPlans from './Pages/MyPlans/MyPlans.jsx'
import Recipe from './Pages/Recipe/Recipe.jsx'
import MyFavorites from './Pages/MyFavorites/MyFavorites.jsx'
import MealPlan from './Pages/MealPlan/MealPlan.jsx'
import { FavoritesProvider } from './components/useContext/useContext.jsx'
import Ratings from "./Pages/Ratings/Ratings.jsx"




function App() {
  return (
    <>
      <Router>
        <FavoritesProvider>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/recipe/' element={<Recipe/>}/>
            <Route path='/recipe/:idMeal' element={<Recipe/>}/>
            <Route path='/favorites/' element={<MyFavorites/>}/>
            <Route path='/myplans/' element={<MyPlans/>}/>
            <Route path='/plan/' element={<MealPlan/>}></Route>
            <Route path='/plan/:planName' element={<MealPlan/>}></Route>
            <Route path='/search/' element={<Search />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/ratings/" element={<Ratings />}/>  
           
          </Routes>
          <Footer />
        </div>
        </FavoritesProvider>
      </Router>

    </>
  )
}

export default App
