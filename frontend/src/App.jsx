import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainSection from "./sections/MainSection";
import MenuPage from "./pages/MenuPage";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";
import DashboardSection from "./sections/DashboardSection";
import Overview from "./pages/Overview";
import SalesAnalysis from "./pages/SalesAnalysis";
import MenuAnalysis from "./pages/MenuAnalysis";
import ManageMenu from "./pages/ManageMenu";
import { navItems } from "./constants";

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
        <Route element={<DashboardSection />} path="/dashboard">
          <Route element={<Overview />} path={navItems[0].path} />
          <Route element={<SalesAnalysis />} path={navItems[1].path} />
          <Route element={<MenuAnalysis />} path={navItems[2].path} />
          <Route element={<ManageMenu />} path={navItems[3].path} />
        </Route>
      </Routes>
    </Router>
  )
}