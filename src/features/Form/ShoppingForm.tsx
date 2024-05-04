import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { Container, Form, FormGroup, Header } from "semantic-ui-react";

export default function ShoppingForm() {

  let {id} = useParams();

  const {register, handleSubmit, control, setValue, formState: {errors, isValid, isSubmitting} } = useForm({
    mode: 'onTouched'
  });

  return (
    <Container clearing>
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
          <Form.Radio
            label='Trong khu vực TPHCM'
            value='insidecity'
            {...register('delivery', {required: true})}
            error={errors.delivery && 'Bắt buộc phải chọn'}
          />
          <Form.Radio
            label='Ngoài khu vực TPHCM'
            value='outsidecity'
            {...register('delivery', {required: true})}
            error={errors.delivery && 'Bắt buộc phải chọn'}
          />
        </FormGroup>
      </Form>
    </Container>
  )
}