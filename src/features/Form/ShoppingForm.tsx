import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom"
import { Button, Form, Grid, Header, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, Segment, Image, Radio } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import ShoppingFormPersonalInput from "./ShoppingFormPersonalInput";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/config/firebase";
import { resetProvince } from "../../app/store/Province";
import { resetCartItems } from "../Product/ProductItemSlices";
import { resetShoppingFormState } from "../../app/store/ShoppingFormInput";
import { resetCheckoutId } from "../../app/store/CheckoutId";

export default function ShoppingForm() {

  //Thanks

  const checkoutId = useAppSelector((state) => state.checkoutId);

  const {register, handleSubmit, formState: {errors} } = useForm({
    mode: 'onTouched',
  });

  const [value, setValue] = useState('');

  const handleRadioChange = (_: any, { value }: any) => {
    setValue(value);
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
    if (selectedCity && selectedDistrict && selectedWard) {
      if (selectedCity.value === 'city-79') {
        setDeliveryFee(25000);
      } else {
        setDeliveryFee(30000);
      }
    } else {
      setDeliveryFee("--------");
    }
  }, [selectedCity, selectedDistrict, selectedWard]);

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
    // else{
    //   const items = checkedCartItems.map(item => ({
    //     name: item["tên mẫu"],
    //     price: item["giá"],
    //     quantity: item["số lượng"],
    //   }));
    //   console.log(items);
    //   // const requestData = {
    //   //   orderCode: randomOrderCode,
    //   //   amount: totalWithDelivery,
    //   //   items: items,
    //   //   description: "Thanh toán đơn hàng",
    //   //   cancelUrl: "http://localhost:3000/thanhtoanthatbai",
    //   //   returnUrl: "http://localhost:3000/thanhtoanthanhcong",
    //   // }

    //   // const paymentLinkData = await payos.createPaymentLink(requestData);
    //   // window.location.href = paymentLinkData.paymentLinkId;
    // }
  };

  return (
    <Grid className="shoppingformfont" style={{marginTop: '5em', marginLeft: '4em', marginRight: '5em'}}>
      <Grid.Column width={10} style={{paddingRight: '3em'}}>
        <ShoppingFormPersonalInput register={register} errors={errors}/>
        <Form style={{paddingTop: '0.5em'}}>
          <Header style={{fontFamily: 'Montserrat, sans-serif'}} content="PHƯƠNG THỨC THANH TOÁN"/>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2em' }}>
              <Radio
                style={{scale: '1.1'}}
                value="COD"
                checked={value === 'COD'}
                onChange={handleRadioChange}
              />
              <Image src="/COD.svg" size="mini" style={{ marginLeft: '1.5em', scale: '1.4', marginRight: '1.5em'}} />
              <p>Thanh toán khi nhận hàng (COD)</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2em' }}>
              <Radio
                style={{scale: '1.1'}}
                value="VietQR"
                checked={value === 'VietQR'}
                onChange={handleRadioChange}
              />
              <Image bordered src="/vietqr.svg" size="mini" style={{ marginLeft: '1.5em', scale: '1.4', marginRight: '1.5em'}} />
              <p>Chuyển khoản qua mã QR</p>
          </div>
        </Form>
      </Grid.Column>
      <Grid.Column width={6}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2 style={{margin: 0, padding: 0, fontFamily: 'Montserrat, sans-serif'}}>Tóm tắt đơn hàng</h2>
          <h2 style={{margin: 0, padding: 0}}>{totalWithDelivery.toLocaleString()}<u>đ</u></h2>
        </div>
        <Segment placeholder>
          {cartItems.filter(item => item.checked).map((item, index) => (
              <div key={index} style={{marginBottom: '0.8em', marginTop: '1em'}}>
                <ItemGroup style={{marginLeft: '1.5vw'}}>
                  <Item key={index}>
                      <ItemImage size='small' style={{scale:'1'}} className="cartitemimage" src={item.photoURL} alt={item.id} />
                      <ItemContent verticalAlign="top" style={{paddingLeft: '1.2em', paddingTop: '1.5em'}}>
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
              </div>
              )
          )}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Tạm tính</p>
            <p>{total.toLocaleString()}đ</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Phí vận chuyển</p>
            <p>{typeof deliveryFee === 'number' ? deliveryFee.toLocaleString() : deliveryFee}đ</p>
          </div>
          <div style={{ borderTop: '1px solid grey', marginBottom: '1em' }} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2 style={{margin: 0, padding: 0, fontFamily: 'Montserrat, sans-serif'}}>TỔNG CỘNG:</h2>
            <h2 style={{margin: 0, padding: 0}}>{totalWithDelivery.toLocaleString()}đ</h2>
          </div>
        </Segment>
        <Button onClick={() => navigate('/giohang')}>Quay lại giỏ hàng</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          style={{fontFamily:'Montserrat, sans-serif'}} 
          color="black">Hoàn tất đơn hàng
        </Button>
      </Grid.Column>
    </Grid>
  )
}