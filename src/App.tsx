import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeaturedWorkForm from "./components/FeaturedWork";
import LoginPage from "./pages/LoginPage";
import MobileView from "./pages/MobileView";
import BrandView from "./pages/BrandView";
import UpdateFeaturedWorkForm from "./components/UpdateFeature";
import Home from "./pages/Home";
import TestimonialForm from "./components/TestinomialCreateorEdit";

function App () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/create-featured" element={<FeaturedWorkForm/>} />
          <Route path="/mobile-view/:id" element={<MobileView/>} />
          <Route path="/brand-view/:id" element={<BrandView/>} />
          <Route path="/update-featured/:id" element={<UpdateFeaturedWorkForm/>} />
          <Route path="/testimonials/new" element={<TestimonialForm/>} />
          <Route path="/testimonials/:id" element={<TestimonialForm/>} />
        
        </Routes>
      </BrowserRouter>
      
    )
}

export default App ;