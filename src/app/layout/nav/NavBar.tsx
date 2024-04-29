import { Container, Icon, Menu, MenuItem, Search } from "semantic-ui-react";
import ShoppingCart from "../../../features/Shopping Cart/ShoppingCart";

export default function NavBar() {

  return (
    <Menu borderless inverted fixed="top">
      <Container style={{ width: "90%" }}>
        <MenuItem header>
          <img className="logo" src="/logo.svg" alt="logo" />
        </MenuItem>
        <MenuItem name="Temporary" />
        <MenuItem name="Still Temporary" />
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