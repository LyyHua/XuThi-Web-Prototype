import { Container, Icon, Menu, MenuItem, Search } from "semantic-ui-react";

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
          <Icon size='big' name="shopping cart" style={{ marginLeft: "0.5em" }} />
        </MenuItem>
      </Container>
    </Menu>
  );
}