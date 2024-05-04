import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { Container, Form, FormGroup, Header } from "semantic-ui-react";

export default function ShoppingForm() {

  const {register, handleSubmit, control, formState: {errors, isValid, isSubmitting} } = useForm({
    mode: 'onTouched'
  });

  const deliveryOption = register('delivery', {required: true});

  let {id} = useParams();

  const [value, setValue] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
  }


  return (
    <Container>
      <Header content='THÔNG TIN GIAO HÀNG'/>
      <Form>
        <Header content='HỌ VÀ TÊN'/>
        <Form.Input
          placeholder='Nhập họ và tên'
          {...register('username', {required: true})}
          error={errors.username && 'Bắt buộc phải điền tên'}
        />
        <Header content='EMAIL'/>
        <Form.Input 
          placeholder='Nhập email'
          {...register('useremail', {required: true})}
          error={errors.useremail && 'Bắt buộc phải điền email'}
        />
        <Header content='SỐ ĐIỆN THOẠI'/>
        <Form.Input 
          placeholder='Nhập số điện thoại'
          {...register('userphonenumber', {required: true})}
          error={errors.userphonenumber && 'Bắt buộc phải điền số điện thoại'}
        />
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
  )
}