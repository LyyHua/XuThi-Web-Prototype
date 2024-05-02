import { Container, Image, Icon, Menu, MenuItem, Search } from "semantic-ui-react";
import ShoppingCart from "../../../features/Shopping Cart/ShoppingCart";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

  const navigate = useNavigate();

  return (
    <Menu borderless inverted fixed="top">
      <Container style={{ width: "90%" }}>
        <MenuItem onClick={() => navigate('/')} header>
          <img className="logo" src="/logo.svg" alt="logo" />
        </MenuItem>
        <MenuItem 
          position="right"
          positive='true'
          inverted='true'
          >
          <Search />
          <Icon size='big' name="user circle outline" style={{ marginLeft: "1em" }} />
          <ShoppingCart />
        </MenuItem>
      </Container>
    </Menu>
  );
}