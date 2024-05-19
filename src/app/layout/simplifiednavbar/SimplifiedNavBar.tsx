import { Container, Menu, MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SimplifiedNavBar() {
  return (
    <Menu borderless inverted fixed="top">
      <Container style={{ width: "90%" }}>
        <MenuItem as={Link} href='/' header>
          <img className="logo" src="/logo.svg" alt="logo" />
        </MenuItem>
      </Container>
    </Menu>
  )
}