import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeaturedWorkForm from "./components/FeaturedWork";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MobileView from "./pages/MobileView";
import BrandView from "./pages/BrandView";
import UpdateFeaturedWorkForm from "./components/UpdateFeature";
import Home from "./pages/Home";

function App () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/create-featured" element={<FeaturedWorkForm/>} />
          <Route path="/mobile-view/:id" element={<MobileView/>} />
          <Route path="/brand-view/:id" element={<BrandView/>} />
          <Route path="/update-featured/:id" element={<UpdateFeaturedWorkForm/>} />
        </Routes>
      </BrowserRouter>
      
    )
}

export default App ;