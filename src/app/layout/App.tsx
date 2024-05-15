import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
import { ProductItems } from "../../features/Product/ProductItems";
import ProductList from "../../features/Product/ProductList";
import PageCredit from "./footer/PageCredit";
import NavBar from "./nav/NavBar";
import ShoppingCartInfo from "../../features/Shopping Cart Info Page/ShoppingCartInfo";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShoppingForm from "../../features/Form/ShoppingForm";
import { useDispatch, useSelector } from "react-redux";
import EmptyShoppingCart from "../../features/Empty Shopping Cart/EmptyShoppingCart";
import SimplifiedNavBar from "./simplifiednavbar/SimplifiedNavBar";
import FinishShopping from "../../features/FinishShopping/FinishShopping";
import { createId } from "@paralleldrive/cuid2";
import { useEffect } from "react";
import { selectAreAllItemsChecked } from "../store/AreAllItemsChecked";
import { setCheckoutId } from "../store/CheckoutId";
import CancelPayment from "../../features/Cancel Payment/CancelPayment";
import ChoosingShoesSize from "./footer/ChoosingShoesSize";
import AboutUs from "./footer/AboutUs";
import ProductPage from "./ProductPage/ProductPage";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const savedCheckoutId = localStorage.getItem('checkoutId');
    
    if (savedCheckoutId) {
      dispatch(setCheckoutId(savedCheckoutId));
    } else {
      const newCheckoutId = createId(); // Replace this with your function to create a new checkoutId
      dispatch(setCheckoutId(newCheckoutId));
      localStorage.setItem('checkoutId', newCheckoutId);
    }
  }, [dispatch]);

  const cartItems = useSelector((state: any) => state.cartitem.cartItems);

  const areAllItemsChecked = useSelector(selectAreAllItemsChecked);

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
        <Route path="/huong-dan-chon-co-giay" element={
            <>
                <NavBar />
                <ChoosingShoesSize/>
                <PageCredit />
            </>
        }/>
        <Route path="/gioi-thieu" element={
            <>
                <NavBar/>
                <AboutUs/>
                <PageCredit/>
            </>
        }/>
        <Route path="/giohang" element={
          <>
            <NavBar />
            {cartItems.length === 0 ? <EmptyShoppingCart/> : <ShoppingCartInfo/>}
            <PageCredit />
          </>
        }/>
        <Route path="/sanpham/:id" element={
          <>
            <NavBar/>
            <ProductPage />
            <PageCredit/>
          </>
        }/>
        <Route path="/thanhtoanthatbai" element={
          <>
            <SimplifiedNavBar/>
            <CancelPayment/>
          </>
        }/>
        <Route path="/thanhtoan/:id" element={
          <>
            <SimplifiedNavBar/>
            {(areAllItemsChecked && cartItems.length > 0) ? <ShoppingForm /> : <EmptyShoppingCart/>}
          </>
        }/>
        <Route path="/hoanthanh" element={
          <>
            <SimplifiedNavBar/>
            <FinishShopping/>
          </>
        }/>
      </Routes>
    </Router>
  )
}