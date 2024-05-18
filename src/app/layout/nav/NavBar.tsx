import { Container, Menu, MenuItem } from "semantic-ui-react";
import ShoppingCart from "../../../features/Shopping Cart/ShoppingCart";
import { Link } from "react-router-dom";
import SearchBar from "../../../features/SearchBar/SearchBar";

export default function NavBar() {
  return (
    <Menu borderless inverted fixed="top">
      <Container style={{ width: "90%" }}>
        <MenuItem as={Link} to="/" header>
          <img className="logo" src="https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/logo.svg?alt=media&token=36c79b2a-caee-42c5-ae2c-332582a50c82" alt="logo" />
        </MenuItem>
        <MenuItem 
          position="right"
          positive='true'
          inverted='true'
          >
          <SearchBar />
          <ShoppingCart />
        </MenuItem>
      </Container>
    </Menu>
  );
}