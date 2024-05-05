import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Divider, DropdownProps, Form, FormGroup, Grid, Header, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import ProvinceDropDownOption from "./ProvinceDropDownOption";

export default function ShoppingForm() {

  const {register, handleSubmit, control, formState: {errors, isValid, isSubmitting} } = useForm({
    mode: 'onTouched'
  });

  let {id} = useParams();

  const [value, setValue] = useState('');

  const [deliveryFee, setDeliveryFee] = useState<string | number>("--------");

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const navigate = useNavigate();
  
  const cartItems = useAppSelector((state) => state.cartitem.cartItems)

  const selectedCity = useAppSelector((state) => state.province.selectedCity);
  const selectedDistrict = useAppSelector((state) => state.province.selectedDistrict);
  const selectedWard = useAppSelector((state) => state.province.selectedWard);
  
  const total = cartItems.filter(item => item.checked).reduce((acc, item) => acc + item.count * item.price, 0);

  const totalWithDelivery = total + (typeof deliveryFee === 'number' ? deliveryFee : 0);

  useEffect(() => {
    if (selectedCity && selectedDistrict && selectedWard) {
      if (selectedCity.value === 'city-79') {
        setDeliveryFee(0);
      } else {
        setDeliveryFee(30000);
      }
    } else {
      setDeliveryFee("-");
    }
  }, [selectedCity, selectedDistrict, selectedWard]);

  return (
    <Grid className="shoppingformfont" style={{marginTop: '4em', marginLeft: '4em', marginRight: '5em'}}>
      <Grid.Column width={10} style={{paddingRight: '3em'}}>
        <Container>
          <Header style={{marginBottom: '1.2em'}} content='THÔNG TIN ĐƠN HÀNG'/>
          <Form>
            <Header content='HỌ VÀ TÊN'/>
            <Form.Input
              placeholder='Nhập họ và tên'
              {...register('username', {required: true})}
              error={errors.username && 'Bắt buộc phải điền tên'}
            />
            <FormGroup style={{justifyContent: 'space-between', maxWidth: '100%', margin: '0 auto'}}>
              <div style={{width: '48%'}}>
                <Header content='EMAIL'/>
                <Form.Input
                  style={{width: '100%'}} 
                  placeholder='Nhập email'
                  {...register('useremail', {required: true})}
                  error={errors.useremail && 'Bắt buộc phải điền email'}
                />
              </div>
              <div style={{width: '48%'}}>
                <Header content='SỐ ĐIỆN THOẠI'/>
                <Form.Input
                  style={{width: '100%'}}
                  placeholder='Nhập số điện thoại'
                  {...register('userphonenumber', {required: true})}
                  error={errors.userphonenumber && 'Bắt buộc phải điền số điện thoại'}
                />
              </div>
            </FormGroup>
            <Header content='ĐỊA CHỈ'/>
            <Form.Input 
              placeholder='Địa chỉ'
              {...register('useraddress', {required: true})}
              error={errors.useraddress && 'Bắt buộc phải điền địa chỉ'}
            />
            <ProvinceDropDownOption/>
            <Header>GHI CHÚ ĐƠN HÀNG:</Header>
              <Form.TextArea 
                placeholder='Nhập ghi chú'
                {...register('usernote', {required: false})}
              />
          </Form>
          <Divider/>
        </Container>
      </Grid.Column>
      <Grid.Column width={6}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2 style={{margin: 0, padding: 0}}>Tóm tắt đơn hàng</h2>
          <h2 style={{margin: 0, padding: 0}}>{totalWithDelivery}<u>đ</u></h2>
        </div>
        <Segment placeholder>
          {cartItems.filter(item => item.checked).map((item, index) => (
              <div key={index} style={{marginBottom: '5.5vh'}}>
                <ItemGroup style={{marginLeft: '1.5vw'}}>
                  <Item key={index}>
                      <ItemImage size='small' className="cartitemimage" src={item.photoURL} alt={item.id} />
                      <ItemContent verticalAlign="top" style={{paddingLeft: '1em'}}>
                          <div className="itemheader">
                              <ItemHeader style={{fontSize:'0.9em', fontWeight: 'bold'}} content={item.name}/>
                          </div>
                          <ItemDescription style={{fontSize: '0.75em'}}>
                              <div style={{marginBottom: '0', marginTop: '-1.3vh'}}>
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
            <h2 style={{margin: 0, padding: 0}}>TỔNG CỘNG:</h2>
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