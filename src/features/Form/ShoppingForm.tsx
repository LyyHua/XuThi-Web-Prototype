import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormRadio, Grid, Header, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, Segment, Image, Label, Radio, Container } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { useDispatch } from "react-redux";
import ShoppingFormPersonalInput from "./ShoppingFormPersonalInput";
import SimplifiedNavBar from "../../app/layout/simplifiednavbar/SimplifiedNavBar";

export default function ShoppingForm() {
  
  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors} } = useForm({
    mode: 'onTouched',
  });

  let {id} = useParams();

  const [value, setValue] = useState('');

  const handleRadioChange = (e: any, { value }: any) => {
    setValue(value);
  };

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
        setDeliveryFee(0);
      } else {
        setDeliveryFee(30000);
      }
    } else {
      setDeliveryFee("--------");
    }
  }, [selectedCity, selectedDistrict, selectedWard]);

  const totalWithDelivery = total + (typeof deliveryFee === 'number' ? deliveryFee : 0);

  const onSubmit = (data: any) => {
    console.log(data);
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
              <p>Thanh toán khi nhận hàng</p>
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