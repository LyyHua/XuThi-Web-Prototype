import { Container, Menu, MenuItem } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function SimplifiedNavBar() {
  const navigate = useNavigate();
  return (
    <Menu borderless inverted fixed="top">
      <Container style={{ width: "90%" }}>
        <MenuItem onClick={() => navigate('/')} header>
          <img className="logo" src="/logo.svg" alt="logo" />
        </MenuItem>
      </Container>
    </Menu>
  )
}