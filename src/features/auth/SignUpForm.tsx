import { FieldValues, useForm } from "react-hook-form";
import { Button, Form, Header } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { signIn } from "./authSlice";

export default function SignUpForm() {
  const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
    mode: 'onTouched',
  })
  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try{
        const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(userCreds.user, {
            displayName: `${data.ho} ${data.ten}`,
        });
        dispatch(signIn(userCreds.user));
    } catch (error){
      console.log(error);
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Header className="text-font" content='HỌ' />
          <Form.Input
              defaultValue=''
              placeholder='Nhập họ của bạn'
              {...register('ho', {required: true})}
              error={errors.ho && 'Bắt buộc phải điền họ'}
          />
      <Header className="text-font" content='TÊN' />
        <Form.Input
            className="text-font"
            defaultValue=''
            placeholder='Nhập tên của bạn'
            {...register('ten', {required: true})}
            error={errors.ten && 'Bắt buộc phải điền tên'}
      />
      <Header className="text-font" content='EMAIL' />
      <Form.Input
          className="text-font"
          defaultValue=''
          placeholder='Nhập email'
          // eslint-disable-next-line no-useless-escape
          {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}
          error={
              errors.email?.type === 'required' && 'Bắt buộc phải điền email' || 
              errors.email?.type === 'pattern' && 'Email không hợp lệ'
          }
      />
      <Header className="text-font" content='MẬT KHẨU' />
      <Form.Input
          className="text-font"
          type='password'
          defaultValue=''
          placeholder='Nhập mật khẩu'
          {...register('password', {required: true})}
          error={errors.password && 'Bắt buộc phải điền mật khẩu'}
      />
      <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type='submit'
          fluid
          size='large'
          color='black'
          className="text-font"
          content='TẠO TÀI KHOẢN'
      />
    </Form>
  )
}