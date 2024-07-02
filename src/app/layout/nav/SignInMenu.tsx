import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Dropdown, Menu } from "semantic-ui-react";

export default function SignInMenu() {

  const {currentUser} = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate('/');
  }
  return (
    <Menu.Item position='right' className="sign-in-menu">
        <Dropdown pointing='top right' text={currentUser?.ten || 'User'}>
            <Dropdown.Menu>
                <Dropdown.Item text='Thông tin tài khoản' icon='user' />
                <Dropdown.Item onClick={handleSignOut} text='Đăng xuất' icon='power' />
            </Dropdown.Menu>
        </Dropdown>
    </Menu.Item>
  )
}