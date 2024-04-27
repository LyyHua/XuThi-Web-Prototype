import { Container, Icon, Menu, MenuItem, Popup, Search, Item, ItemContent, ItemDescription, ItemHeader, ItemImage, ItemGroup, Button, Divider } from "semantic-ui-react";
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
                  <div style={{marginBottom: '1em'}}>
                  <ItemGroup style={{marginLeft: '0.5vw'}}>
                    <Item key={index}>
                    <ItemImage size='small' className="cartitemimage" src={item.photoURL} alt={item.id} />
                    <ItemContent verticalAlign="middle" style={{paddingLeft: '1em'}}>
                      <ItemHeader style={{fontSize:'1em'}} content={item.name}/>
                      <ItemDescription style={{fontSize: '0.8em'}}>
                        <p>{item.description}</p>
                        <p>Số lượng: {item.count}</p>
                        <p><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
                </div>
                );
              })}
            </Popup.Content>
            <Divider />
            <Popup.Content style={{marginTop: '2.5vh', marginLeft: '0.5vw', height: '15vh'}} className="popupcartfooter">
              <Item style={{marginBottom: '1.5vh'}}>
                <ItemContent style={{display: 'flex', alignItems: 'center'}}>
                  <ItemHeader class='totalnavbar'>TỔNG CỘNG: </ItemHeader>
                  <ItemDescription>
                    <p className="totalnavbarbutindong" style={{marginLeft: '1em'}}><strong>{cartItems.reduce((total, item) => total + item.price * item.count, 0).toLocaleString()}<u>đ</u></strong></p>
                  </ItemDescription>
                </ItemContent>
              </Item>
              <Button
              style={{marginTop: '1vh', width: '45%', height: '7vh', marginRight:'1.5vw'}}
               className="clearallitem" 
               content='XEM GIỎ HÀNG' 
               color='black'
               size='large' 
               />
              <Button
                style={{marginTop: '1vh', width: '45%', height: '7vh'}} 
                className="checkoutbutton" 
                content='THANH TOÁN' 
                color='green' 
                size='large'
                />
            </Popup.Content>
          </Popup>
        </MenuItem>
      </Container>
    </Menu>
  );
}