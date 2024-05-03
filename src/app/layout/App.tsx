import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
import { ProductItems } from "../../features/Product/ProductItems";
import ProductList from "../../features/Product/ProductList";
import PageCredit from "./footer/PageCredit";
import NavBar from "./nav/NavBar";
import CheckOut from "../../features/CheckOut/CheckOut";
import ShoppingCartInfo from "../../features/Shopping Cart Info Page/ShoppingCartInfo";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
            <CheckOut />
        }/>
      </Routes>
    </Router>
  )
}