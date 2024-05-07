import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
import { ProductItems } from "../../features/Product/ProductItems";
import ProductList from "../../features/Product/ProductList";
import PageCredit from "./footer/PageCredit";
import NavBar from "./nav/NavBar";
import ShoppingCartInfo from "../../features/Shopping Cart Info Page/ShoppingCartInfo";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShoppingForm from "../../features/Form/ShoppingForm";
import { useSelector } from "react-redux";
import EmptyShoppingCart from "../../features/Empty Shopping Cart/EmptyShoppingCart";
import SimplifiedNavBar from "./simplifiednavbar/SimplifiedNavBar";
import { selectAreAllItemsChecked } from "../store/AreAllItemsChecked";
import { Suspense } from "react";
import LoadingComponent from "./LoadingComponent";

export default function App() {

  const cartItems = useSelector((state: any) => state.cartitem.cartItems);

  const areAllItemsChecked = useSelector(selectAreAllItemsChecked);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <Suspense fallback={<LoadingComponent/>}>
                <NavBar />
                <ImageCarousel image={CarouselData}/>
                <ProductList product={ProductItems} />
                <PageCredit />
            </Suspense>
        }/>
        <Route path="/giohang" element={
          <Suspense fallback={<LoadingComponent/>}>
            <NavBar />
            {cartItems.length === 0 ? <EmptyShoppingCart/> : <ShoppingCartInfo/>}
            <PageCredit />
          </Suspense>
        }/>
        <Route path="/thanhtoan/:id" element={
          <Suspense fallback={<LoadingComponent/>}>
            <SimplifiedNavBar/>
            {(areAllItemsChecked && cartItems.length > 0) ? <ShoppingForm /> : <EmptyShoppingCart/>}
          </Suspense>
        }/>
      </Routes>
    </Router>
  )
}