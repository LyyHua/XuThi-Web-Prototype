import { Container, Icon, Menu, MenuItem, Popup, Search, Item, ItemContent, ItemDescription, ItemHeader, ItemImage, ItemGroup } from "semantic-ui-react";
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
            size='huge'
            mouseEnterDelay={100}
            mouseLeaveDelay={300}
            hoverable={true}
            className="popupcart"
            trigger={<Icon size='big' name="shopping cart" style={{ marginLeft: "0.5em" }} />}
          >
            <Popup.Header style={{margin: '1vw'}} className="popupcartheader"><strong>GIỎ HÀNG</strong></Popup.Header>
            <Popup.Content className="popupcartcontent">
              {cartItems.map((item, index) => {
                return (
                  <ItemGroup style={{marginLeft: '0.5vw'}}>
                    <Item key={index}>
                    <ItemImage size='small' className="cartitemimage" src={item.photoURL} alt={item.id} />
                    <ItemContent verticalAlign="middle">
                      <ItemHeader content={item.name}/>
                      <ItemDescription>
                        <p>{item.description}</p>
                        <p><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
                );
              })}
            </Popup.Content>
            <Popup.Content style={{marginTop: '2.5vh', marginLeft: '0.5vw', height: '10vh'}} className="popupcartfooter">
              <Item>
                <ItemContent style={{display: 'flex', alignItems: 'center'}}>
                  <ItemHeader class='totalnavbar'>TỔNG CỘNG: </ItemHeader>
                  <ItemDescription>
                    <p className="totalnavbarbutindong" style={{marginLeft: '1em'}}><strong>{cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()}<u>đ</u></strong></p>
                  </ItemDescription>
                </ItemContent>
              </Item>
              
            </Popup.Content>
          </Popup>
        </MenuItem>
      </Container>
    </Menu>
  );
}