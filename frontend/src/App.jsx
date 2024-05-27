import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainSection from "./sections/MainSection";
import MenuPage from "./pages/MenuPage";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MenuPage />} path="/" />

        {/* ordering route */}
        <Route element={<MainSection/>} >
          <Route element={<CategoryPage />} path="/categories" />
          <Route element={<ItemPage />} path="/category/:id/items" />
        </Route>

        {/* dashboard route */}
        <Route element="dashboard" path="/dashboard">

        </Route>
      </Routes>
    </Router>
  )
}