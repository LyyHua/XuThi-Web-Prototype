import { CarouselData } from "../../features/Image Carousel/CarouselData";
import ImageCarousel from "../../features/Image Carousel/ImageCarousel";
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
import CancelPayment from "../../features/Cancel Payment/CancelPayment";
import ChoosingShoesSize from "./footer/ChoosingShoesSize";
import AboutUs from "./footer/AboutUs";
import ProductPage from "./ProductPage/ProductPage";
import ReturnPolicy from "./footer/ReturnPolicy";
import { setCheckoutId } from "../store/checkoutId";
import { selectAreAllItemsChecked } from "../store/areAllItemsChecked";
import { onAuthStateChanged } from "firebase/auth";
import { logout, signIn } from "../../features/auth/authSlice";
import { auth } from "../config/firebase";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, {
      next: user => {
        if(user){
          dispatch(signIn(user))
        } else{
          dispatch(logout())
        }
      },
      error: error => console.log(error),
      complete: () => {}
    })
  }, [dispatch])

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
                <ProductList />
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
        <Route path="/chinh-sach-doi-tra" element={
            <>
                <NavBar />
                <ReturnPolicy/>
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