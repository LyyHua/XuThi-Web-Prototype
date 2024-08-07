import { Icon, Modal, ModalContent, Tab, TabPane } from "semantic-ui-react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modalSlice";

export default function LoginForm() {
  const panes = [
    {menuItem: 'ĐĂNG NHẬP', render: () => <TabPane attached={false}><SignInForm /></TabPane>},
    {menuItem: 'ĐĂNG KÝ', render: () => <TabPane attached={false}><SignUpForm /></TabPane>},
  ]
  const dispatch = useAppDispatch();
  return (
    <Modal
        onClose={() => dispatch(closeModal())}
        className="login-modal"
        size="small"
        trigger={
            <Icon className="login-modal-icon" size="large" name='user circle' />
        }    
    >
      <ModalContent>
      <Tab
        className=""
        panes={panes} 
        menu={{ 
          secondary: true, 
          pointing: true, 
        }}
      />
      </ModalContent>
      
    </Modal>
  )
}