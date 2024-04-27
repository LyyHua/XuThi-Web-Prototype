import { Image, Container, Icon, Menu, MenuItem, Popup, Search } from "semantic-ui-react";
import { useAppSelector } from "../../store/store";

export default function NavBar() {
  const {cartItems} = useAppSelector(state => state.cartitem);
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
          <Popup
            position='bottom right'
            size='small'
            mouseLeaveDelay={300}
            hoverable={true}
            hideOnScroll={false}
            className="popupcart"
            trigger={<Icon size='big' name="shopping cart" style={{ marginLeft: "0.5em" }} />}
          >
            <Popup.Header className="popupcartheader"><strong>GIỎ HÀNG</strong></Popup.Header>
            <Popup.Content className="popupcartcontent">
              {cartItems.map((item, index) => {
                return (
                  <Container key={index} className="cartitem">
                    <Image src={item.photoURL} alt={item.id} />
                    <p>{item.description}</p>
                    <p>{item.amount} x {item.price}</p>
                  </Container>
                );
              })}
            </Popup.Content>
          </Popup>
        </MenuItem>
      </Container>
    </Menu>
  );
}