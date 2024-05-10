import { useEffect } from "react";
import { Image, Container } from "semantic-ui-react";
import { useDispatch } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../app/config/firebase";
import { resetCheckoutId } from "../../app/store/CheckoutId";
import { resetProvince } from "../../app/store/Province";
import { resetShoppingFormState } from "../../app/store/ShoppingFormInput";
import { resetCartItems } from "../Product/ProductItemSlices";
import { useLocation } from 'react-router-dom';

export default function FinishShopping() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      // Get the orderCode and paymentLinkId from local storage
      const orderCode = JSON.parse(localStorage.getItem('orderCode') || '');
      const paymentLinkId = JSON.parse(localStorage.getItem('paymentLinkId') || '');

      // Get the query parameters from the URL
      const urlParams = new URLSearchParams(location.search);
      const urlOrderCode = urlParams.get('orderCode');
      const urlId = urlParams.get('id');
      const urlStatus = urlParams.get('status');

      if (String(orderCode) === urlOrderCode && String(paymentLinkId) === urlId && urlStatus === 'PAID') {
        // Get the tempCartItems from local storage
        const tempCartItems = JSON.parse(localStorage.getItem('tempCartItems') || '');
        console.log(tempCartItems);

        if (tempCartItems) {
          await setDoc(doc(db, "đơn hàng đã chuyển khoản", paymentLinkId), tempCartItems);
          dispatch(resetCartItems());
          dispatch(resetShoppingFormState());
          dispatch(resetProvince());
          dispatch(resetCheckoutId());
          localStorage.clear();
        }
      }
    };

    checkPaymentStatus();
  }, [dispatch, location]);

  return (
    <Container className="thankyou" style={{marginTop: '7em', marginBottom: '5em', scale: '0.9'}}>
      <Image style={{marginBottom: '2em'}} src="/thankyou.svg" size='huge' centered />
      <h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Cảm ơn bạn đã tin tưởng và mua hàng ở XuThi</h1>
      <h2 style={{fontFamily: 'Montserrat, sans-serif'}}>Chúc bạn có một ngày tốt lành và sẽ tiếp tục ủng hộ bọn mình nhé!</h2>
    </Container>
  );
}