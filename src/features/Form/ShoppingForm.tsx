import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom"
import { Button, Form, Grid, Header, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, Segment, Image, Radio, Divider } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import ShoppingFormPersonalInput from "./ShoppingFormPersonalInput";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../app/config/firebase";
import { resetProvince } from "../../app/store/Province";
import { resetCartItems } from "../Product/ProductItemSlices";
import { resetShoppingFormState } from "../../app/store/ShoppingFormInput";
import { resetCheckoutId } from "../../app/store/CheckoutId";
import { getFunctions, httpsCallable } from "firebase/functions";


interface PaymentLink {
  checkoutUrl: string;
  orderCode: number;
  paymentLinkId: string;
  // include other properties if they exist
}

export default function ShoppingForm() {

  const functionsInstance = getFunctions();
  const createPaymentLink = httpsCallable(functionsInstance, 'createPaymentLink');

  const checkoutId = useAppSelector((state) => state.checkoutId);

  const {register, handleSubmit, formState: {errors} } = useForm({
    mode: 'onTouched',
  });

  const [value, setValue] = useState('');

  const handleRadioChange = (_: any, { value }: any) => {
    setValue(value);
    if (value === 'VietQR') {
      setDeliveryFee(0);
    } else {
      // Reset the delivery fee when other options are selected
      if (selectedCity && selectedDistrict && selectedWard) {
        if (selectedCity.value === 'city-79') {
          setDeliveryFee(25000);
        } else {
          setDeliveryFee(30000);
        }
      } else {
        setDeliveryFee("--------");
      }
    }
  };

  const dispatch = useAppDispatch();

  const [deliveryFee, setDeliveryFee] = useState<string | number>("--------");

  const navigate = useNavigate();
  
  const cartItems = useAppSelector((state) => state.cartitem.cartItems)
  
  const total = cartItems.filter(item => item.checked).reduce((acc, item) => acc + item.count * item.price, 0);
  
  const selectedCity = useAppSelector((state) => state.province.selectedCity);
  const selectedDistrict = useAppSelector((state) => state.province.selectedDistrict);
  const selectedWard = useAppSelector((state) => state.province.selectedWard);

  useEffect(() => {
    if (value !== 'VietQR' && selectedCity && selectedDistrict && selectedWard) {
      if (selectedCity.value === 'city-79') {
        setDeliveryFee(25000);
      } else {
        setDeliveryFee(30000);
      }
    } else if (value !== 'VietQR') {
      setDeliveryFee("--------");
    }
  }, [selectedCity, selectedDistrict, selectedWard, value]);

  const totalWithDelivery = total + (typeof deliveryFee === 'number' ? deliveryFee : 0);

  const onSubmit = async (data: any) => {
    if(!value){
      alert("Vui lòng chọn phương thức thanh toán");
    return;
    }
    const checkedCartItems = cartItems.filter(item => item.checked).map(item => ({
      "tên mẫu": item.name,
      "size": item.size,
      "số lượng": item.count,
      "giá": item.price,
    }));
    const userInformation = {
      "Tên người mua": data.username,
      "Email": data.useremail,
      "Số điện thoại": data.userphonenumber,
      "Địa chỉ": data.useraddress,
      "Ghi chú": data.usernote,
    }
    const usersInformation = {
      ...userInformation
    }
    const formDataWithLocation = {
      "Thông tin người mua": usersInformation,
      "Thành phố/quận/phường": {
        "thành phố": selectedCity?.text,
        "quận": selectedDistrict?.text,
        "phường": selectedWard?.text,
      },
      "Giỏ hàng": checkedCartItems,
      "Tổng tiền": totalWithDelivery.toLocaleString() + 'đ',
      "Thời gian đặt hàng": Timestamp.now(),
    };
    if (value === 'COD'){
      await setDoc(doc(db, "đơn hàng", checkoutId), formDataWithLocation);
      dispatch(resetCartItems());
      dispatch(resetShoppingFormState());
      dispatch(resetProvince());
      dispatch(resetCheckoutId());
      localStorage.clear();
      navigate('/hoanthanh');
    }
    else if(value === 'VietQR'){
        const VietQRCartItems = cartItems.filter(item => item.checked).map(item => ({
          name: `${item.name}, size: ${item.size}`,
          quantity: item.count,
          price: item.price,
        }));
        const buyerAddress = `${data.useraddress}, ${selectedWard?.text}, ${selectedDistrict?.text}, ${selectedCity?.text}`;
        const userInformation = {
          name: `Tên: ${data.username}, SĐT: ${data.userphonenumber}, Email: ${data.useremail}, Địa chỉ: ${buyerAddress}`,
          quantity: 1,
          price: 0,
        }
        VietQRCartItems.push(userInformation);
        const result = await createPaymentLink({ 
          amount: totalWithDelivery,
          items: VietQRCartItems,
          buyerNote: data.usernote,
        });

        // Read result of the Cloud Function.
        const paymentLink = result.data as PaymentLink;
        
        // Ensure paymentLink is an object before extracting checkoutUrl
        if (typeof paymentLink === 'object' && paymentLink !== null) {
          const checkoutUrl = paymentLink.checkoutUrl;
          if (typeof checkoutUrl === 'string') {
            window.location.href = checkoutUrl;
            dispatch(resetCartItems());
            dispatch(resetShoppingFormState());
            dispatch(resetProvince());
            dispatch(resetCheckoutId());
            localStorage.clear();
          } else {
            console.error('Error: checkoutUrl is not a string', checkoutUrl);
          }
        } else {
          console.error('Error: paymentLink is not an object', paymentLink);
        }
      }
  };

  return (
    <Grid className="shoppingformfont text-font" style={{marginTop: '5em', marginLeft: '4em', marginRight: '5em'}}>
      <Grid.Column mobile={16} computer={10} style={{paddingRight: '3em'}}>
        <ShoppingFormPersonalInput register={register} errors={errors}/>
        <Form className="radio-form" style={{paddingTop: '0.5em'}}>
          <Header style={{fontFamily: 'Montserrat, sans-serif'}} content="PHƯƠNG THỨC THANH TOÁN"/>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2em' }}>
              <Radio
                style={{scale: '1.1'}}
                value="COD"
                checked={value === 'COD'}
                onChange={handleRadioChange}
              />
              <Image src="https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/COD.svg?alt=media&token=31a87277-a341-4632-a42e-c24182c50030" size="mini" style={{ marginLeft: '1.5em', scale: '1.4', marginRight: '1.5em'}} />
              <p>Thanh toán khi nhận hàng (COD)</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2em' }}>
              <Radio
                style={{scale: '1.1'}}
                value="VietQR"
                checked={value === 'VietQR'}
                onChange={handleRadioChange}
              />
              <Image bordered src="https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/vietqr.svg?alt=media&token=37203c05-2936-474a-953c-b6233d1919cc" size="mini" style={{ marginLeft: '1.5em', scale: '1.4', marginRight: '1.5em'}} />
              <p>Chuyển khoản ngân hàng bằng VietQR (free ship)</p>
          </div>
        </Form>
      </Grid.Column>
      <Grid.Column computer={6} mobile={16}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2 style={{margin: 0, padding: 0, fontFamily: 'Montserrat, sans-serif'}}>Tóm tắt đơn hàng:</h2>
          <h2 style={{margin: 0, padding: 0, fontFamily: 'Montserrat'}}>{totalWithDelivery.toLocaleString()}<u>đ</u></h2>
        </div>
        <Segment placeholder>
          <div className="segment-item">
          {cartItems.filter(item => item.checked).map((item, index) => (
              <div key={index} className="segment-item-item">
                <ItemGroup className="item-item-group">
                  <Item key={index}>
                      <ItemImage size='small' style={{scale:'1'}} className="cartitemimage cart-item-image" src={item.photoURL} alt={item.id} />
                      <ItemContent verticalAlign="top" style={{paddingLeft: '1.2em', paddingTop: '1.5em', fontFamily: 'Montserrat'}}>
                          <div className="itemheader">
                              <ItemHeader style={{fontSize:'1.2em', fontWeight: 'bold'}} content={item.name}/>
                          </div>
                          <ItemDescription style={{fontSize: '1em'}}>
                              <div style={{marginBottom: '0', marginTop: '0'}}>
                                  <p style={{marginBottom: '0.6vh'}}>{item.description}</p>
                                  <p style={{marginBottom: '0.6vh'}}>Số lượng: {item.count}</p>
                                  <p style={{marginBottom: '0.6vh'}}>Kích cỡ: {item.size}</p>
                                  <p style={{marginBottom: '0.6vh'}}><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                              </div>
                              </ItemDescription>
                          </ItemContent>
                      </Item>
                  </ItemGroup>
                  <Divider/>
              </div>
              )
          )}
          </div>
          <div className="tamtinh" style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={{fontFamily: 'Montserrat'}}>Tạm tính</p>
            <p style={{fontFamily: 'Montserrat'}}>{total.toLocaleString()}đ</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p style={{fontFamily: 'Montserrat'}}>Phí vận chuyển</p>
            <p style={{fontFamily: 'Montserrat'}}>{typeof deliveryFee === 'number' ? deliveryFee.toLocaleString() : deliveryFee}đ</p>
          </div>
          <div style={{ borderTop: '1px solid grey', marginBottom: '1em' }} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2 style={{margin: 0, padding: 0, fontFamily: 'Montserrat, sans-serif'}}>TỔNG CỘNG:</h2>
            <h2 style={{margin: 0, padding: 0}}>{totalWithDelivery.toLocaleString()}đ</h2>
          </div>
        </Segment>
        <Button className="backtocart" onClick={() => navigate('/giohang')}>Quay lại giỏ hàng</Button>
        <Button
          className="hoantatdonhang"
          onClick={handleSubmit(onSubmit)}
          style={{fontFamily:'Montserrat, sans-serif'}} 
          color="black">Hoàn tất đơn hàng
        </Button>
      </Grid.Column>
    </Grid>
  )
}