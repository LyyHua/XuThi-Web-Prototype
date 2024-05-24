import { FieldValues, useForm } from "react-hook-form";
import { Button, Form, Header } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { closeModal } from "../../app/common/modalSlice";

export default function SignInForm() {
  const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
    mode: 'onTouched',
  })

  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try{
        await signInWithEmailAndPassword(auth, data.email, data.password);
        dispatch(closeModal());
    } catch (error) {
        console.error('Error signing in:', error);
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Header content='EMAIL' />
        <Form.Input
            defaultValue=''
            placeholder='Nhập email'
            // eslint-disable-next-line no-useless-escape
            {...register('email', {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})}
            error={
                errors.email?.type === 'required' && 'Bắt buộc phải điền email' || 
                errors.email?.type === 'pattern' && 'Email không hợp lệ'
            }
        />
        <Header content='MẬT KHẨU' />
        <Form.Input
            type='password'
            defaultValue=''
            placeholder='Nhập mật khẩu'
            {...register('password', {required: true, minLength: 8})}
            error={
              errors.password?.type === 'required' && 'Bắt buộc phải điền mật khẩu' ||
              errors.password?.type === 'minLength' && 'Mật khẩu phải có ít nhất 8 ký tự'
            }
        />
        <Button
            loading={isSubmitting}
            disabled={!isValid || !isDirty || isSubmitting}
            type='submit'
            fluid
            size='large'
            color='black'
            content='ĐĂNG NHẬP'
        />
    </Form>
  )
}