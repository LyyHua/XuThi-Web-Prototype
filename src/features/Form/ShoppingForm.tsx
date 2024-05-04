import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Form, FormGroup, Grid, Header, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";

export default function ShoppingForm() {

  const {register, handleSubmit, control, formState: {errors, isValid, isSubmitting} } = useForm({
    mode: 'onTouched'
  });

  let {id} = useParams();

  const [value, setValue] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const navigate = useNavigate();
  
  const cartItems = useAppSelector((state) => state.cartitem.cartItems)
  
  const total = cartItems.filter(item => item.checked).reduce((acc, item) => acc + item.count * item.price, 0).toLocaleString();

  return (
    <Grid style={{margin: '1em'}}>
      <Grid.Column width={10}>
        <Container>
          <Header content='THÔNG TIN ĐƠN HÀNG'/>
          <Form>
            <Header content='HỌ VÀ TÊN'/>
            <Form.Input
              placeholder='Nhập họ và tên'
              {...register('username', {required: true})}
              error={errors.username && 'Bắt buộc phải điền tên'}
            />
            <FormGroup inline>
              <div>
                <Header content='EMAIL'/>
                <Form.Input 
                  placeholder='Nhập email'
                  {...register('useremail', {required: true})}
                  error={errors.useremail && 'Bắt buộc phải điền email'}
                />
              </div>
              <div>
                <Header content='SỐ ĐIỆN THOẠI'/>
                <Form.Input 
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
            <FormGroup inline>
              <label>Giao hàng ở: </label>
              <Controller
                control={control}
                name="delivery"
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Radio
                    label='Trong khu vực TPHCM'
                    value='insidecity'
                    checked={value === 'insidecity'}
                    onChange={(e, {value}) => {
                      setValue(value as string);
                      field.onChange(value);
                    }}
                    error={errors.delivery && 'Bắt buộc phải chọn'}
                  />
                )}
              />
              <Controller
                control={control}
                name="delivery"
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Radio
                    label='Ngoài khu vực TPHCM'
                    value='outsidecity'
                    checked={value === 'outsidecity'}
                    onChange={(e, { value }) => {
                      setValue(value as string);
                      field.onChange(value);
                    }}
                    error={errors.delivery && 'Bắt buộc phải chọn'}
                  />
                )}
              />
            </FormGroup>
          </Form>
        </Container>
      </Grid.Column>
      <Grid.Column width={6}>
        <h1>Tóm tắt đơn hàng</h1>
        <h3>{total}<u>đ</u></h3>
        <Segment>
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
            <p>{total}đ</p>
          </div>
          <p>Phí vận chuyển</p>
        </Segment>
        <Button onClick={() => navigate('/giohang')}>Quay lại giỏ hàng</Button>
        <Button
          onClick={() => {onSubmit}}
          style={{fontFamily:'Montserrat, sans-serif'}} 
          color="black">Hoàn tất đơn hàng
        </Button>
      </Grid.Column>
    </Grid>
  )
}