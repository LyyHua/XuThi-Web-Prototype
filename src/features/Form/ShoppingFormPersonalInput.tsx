import { Container, Header, Form, FormGroup, Divider } from "semantic-ui-react";
import ProvinceDropDownOption from "./ProvinceDropDownOption";
import { useAppSelector, useAppDispatch, store } from "../../app/store/store";
import { FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import ShoppingFormInput, { setUsername, setUserEmail, setUserPhoneNumber, setUserAddress, setUserNote } from "../../app/store/ShoppingFormInput";
import { useEffect } from "react";

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

export default function ShoppingFormPersonalInput({register: registerProp, errors: errorsProp}: Props) {

    const shoppingFormState = useAppSelector((state) => state.shoppingFormState);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const savedFormState = localStorage.getItem('formState');
        if (savedFormState && savedFormState !== 'undefined') {
            try {
                const formState = JSON.parse(savedFormState);
                dispatch(setUsername(formState.username || ''));
                dispatch(setUserEmail(formState.useremail || ''));
                dispatch(setUserPhoneNumber(formState.userphonenumber || ''));
                dispatch(setUserAddress(formState.useraddress || ''));
                dispatch(setUserNote(formState.usernote || ''));
            } catch (error) {
                console.error('Error parsing form state from local storage:', error);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('formState', JSON.stringify(shoppingFormState));
    }, [shoppingFormState]);
    
    const handleInputChange = (e: any, action: any, field: any) => {
        const newValue = e.target.value;
        dispatch(action(newValue));
    };

    return (
        <Container className="shoppingformpersonalinput">
            <Header style={{marginBottom: '1.2em'}} content='THÔNG TIN ĐƠN HÀNG'/>
            <Form>
                <Header style={{fontFamily: "Montserrat, sans-serif"}} content='HỌ VÀ TÊN'/>
                <Form.Input
                    placeholder='Nhập họ và tên'
                    {...registerProp('username', {required: true})}
                    error={errorsProp.username && 'Bắt buộc phải điền tên'}
                    onChange={(e) => handleInputChange(e, setUsername, 'username')}
                    value={shoppingFormState.username || ''}
                />
                <FormGroup style={{justifyContent: 'space-between', maxWidth: '100%', margin: '0 auto', paddingBottom: '1.2em'}}>
                    <div style={{width: '48%'}}>
                        <Header style={{fontFamily: "Montserrat, sans-serif"}} content='EMAIL'/>
                        <Form.Input
                            style={{width: '100%'}} 
                            placeholder='Nhập email'
                            {...registerProp('useremail', {required: true})}
                            error={errorsProp.useremail && 'Bắt buộc phải điền email'}
                            onChange={(e) => handleInputChange(e, setUserEmail, 'useremail')}
                            value={shoppingFormState.useremail || ''}
                        />
                    </div>
                    <div style={{width: '48%'}}>
                        <Header style={{fontFamily: "Montserrat, sans-serif"}} content='SỐ ĐIỆN THOẠI'/>
                        <Form.Input
                            style={{width: '100%'}}
                            placeholder='Nhập số điện thoại'
                            {...registerProp('userphonenumber', {required: true})}
                            error={errorsProp.userphonenumber && 'Bắt buộc phải điền số điện thoại'}
                            onChange={(e) => handleInputChange(e, setUserPhoneNumber, 'userphonenumber')}
                            value={shoppingFormState.userphonenumber || ''}
                        />
                    </div>
                </FormGroup>
                <ProvinceDropDownOption/>
                <Header style={{fontFamily: "Montserrat, sans-serif", marginTop: '0 auto'}} content='ĐỊA CHỈ'/>
                <Form.Input 
                    placeholder='Địa chỉ'
                    {...registerProp('useraddress', {required: true})}
                    error={errorsProp.useraddress && 'Bắt buộc phải điền địa chỉ'}
                    onChange={(e) => handleInputChange(e, setUserAddress, 'useraddress')}
                    value={shoppingFormState.useraddress || ''}
                />
                <Header style={{fontFamily: "Montserrat, sans-serif"}}>GHI CHÚ ĐƠN HÀNG:</Header>
                <Form.TextArea 
                    placeholder='Nhập ghi chú'
                    {...registerProp('usernote', {required: false})}
                    onChange={(e) => handleInputChange(e, setUserNote, 'usernote')}
                    value={shoppingFormState.usernote || ''}
                />
            </Form>
            <Divider/>
        </Container>
  )
}