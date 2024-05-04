import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
import { ProductItems } from "../../features/Product/ProductItems";
import ProductList from "../../features/Product/ProductList";
import PageCredit from "./footer/PageCredit";
import NavBar from "./nav/NavBar";
import ShoppingCartInfo from "../../features/Shopping Cart Info Page/ShoppingCartInfo";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShoppingForm from "../../features/Form/ShoppingForm";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
            <ImageCarousel image={CarouselData}/>
            <ProductList product={ProductItems} />
            <PageCredit />
          </>
        }/>
        <Route path="/giohang" element={
          <>
            <NavBar />
            <ShoppingCartInfo />
            <PageCredit />
          </>
        }/>
        <Route path="/thanhtoan/:id" element={
            <ShoppingForm />
        }/>
      </Routes>
    </Router>
  )
}