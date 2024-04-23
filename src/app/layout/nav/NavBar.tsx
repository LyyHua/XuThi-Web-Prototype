import { Container, Icon, Menu, MenuItem, Search } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
        <Container>
            <MenuItem header>
                <img className="logo" src="/logo.svg" alt="logo"/>
            </MenuItem>
            <MenuItem name='Temporary'/>
            <MenuItem name='Still Temporary'/>
            <MenuItem position="right">
              <Search/>
              <Icon name="user circle outline" style={{marginLeft: '2em'}}/>
              <Icon name="shopping cart" style={{marginLeft: '2em'}}/>
            </MenuItem>
        </Container>
    </Menu>
  )
}