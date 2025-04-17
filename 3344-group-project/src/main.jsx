import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavoritesProvider } from './components/useContext/useContext.jsx'
import { MealPlansProvider } from './components/mealPlansContext/mealPlansContext.jsx'
import { RatingsProvider } from './Pages/Ratings/RatingsContext.jsx'
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RatingsProvider>
    <MealPlansProvider>
      <FavoritesProvider> 
        <App />
      </FavoritesProvider>
    </MealPlansProvider>
    </RatingsProvider>
  </StrictMode>,
)
