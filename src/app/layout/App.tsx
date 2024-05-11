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
import { resetCheckoutId, setCheckoutId } from "../store/CheckoutId";
import { setDoc, doc } from "firebase/firestore";
import { resetCartItems } from "../../features/Product/ProductItemSlices";
import { db } from "../config/firebase";
import { resetProvince } from "../store/Province";
import { resetShoppingFormState } from "../store/ShoppingFormInput";
import { getFunctions, httpsCallable } from "firebase/functions";

interface PaymentLinkInformationResponse {
  data: {
    status: string;
  };
}

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkPaymentLinkId = JSON.parse(localStorage.getItem('checkPaymentLinkId') || 'null');
  
    if (checkPaymentLinkId) {
      const fetchData = async () => {
        try {
          const functionsInstance = getFunctions();
          const getPaymentLinkInformation = httpsCallable(functionsInstance, 'getPaymentInformation');
          const response = await getPaymentLinkInformation({ paymentLinkId: checkPaymentLinkId });
          const data = response.data as PaymentLinkInformationResponse['data'];
          console.log(data.status)
          if (data.status === 'PAID') {
            // Retrieve cart items from local storage
            const tempCartItems = JSON.parse(localStorage.getItem('tempCartItems') || '');
            await setDoc(doc(db, "đơn hàng đã chuyển khoản", checkPaymentLinkId), tempCartItems);
            dispatch(resetCartItems());
            dispatch(resetShoppingFormState());
            dispatch(resetProvince());
            dispatch(resetCheckoutId());
            localStorage.clear();
          }
        } catch (error) {
          console.error('Error getting payment link information:', error);
        }
      };
  
      fetchData();
    }
  }, [dispatch]);

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
            <PageCredit/>
          </>
        }/>
        <Route path="/thanhtoanthatbai" element={
          <>
            <SimplifiedNavBar/>
            <EmptyShoppingCart/>
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