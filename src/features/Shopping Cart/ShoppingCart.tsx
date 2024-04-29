import { Popup, Icon, ItemGroup, Item, ItemImage, ItemContent, ItemHeader, ItemDescription, Divider, Button } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {

    const {cartItems} = useAppSelector(state => state.cartitem);
    
    const navigate = useNavigate();

    return (
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
                    <div key={index} style={{marginBottom: '1em'}}>
                    <ItemGroup style={{marginLeft: '0.5vw'}}>
                    <Item key={index}>
                    <ItemImage size='small' className="cartitemimage" src={item.photoURL} alt={item.id} />
                    <ItemContent verticalAlign="middle" style={{paddingLeft: '1em'}}>
                        <ItemHeader style={{fontSize:'0.9em'}} content={item.name}/>
                        <ItemDescription style={{fontSize: '0.75em'}}>
                        <p>{item.description}</p>
                        <p>Số lượng: {item.count}</p>
                        <p>Kích cỡ: {item.size}</p>
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
                    style={{marginTop: '2vh', width: '45%', height: '45%', marginRight:'1.5vw', justifyContent: 'center'}}
                    className="viewcartbutton"
                    content='XEM GIỎ HÀNG' 
                    color='black'
                    size='large'
                    onClick={() => navigate('/giohang')}
                />
                <Button
                    style={{marginTop: '1vh', width: '45%', height: '7vh'}}
                    className="checkoutbutton" 
                    content='THANH TOÁN' 
                    color='green' 
                    size='large'
                    onClick={() => navigate('/thanhtoan')}
                />
            </Popup.Content>
        </Popup>
    )
}