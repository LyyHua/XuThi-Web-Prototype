import { Popup, Icon, ItemGroup, Item, ItemImage, ItemContent, ItemHeader, ItemDescription, Divider, Button, Container } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {

    const {cartItems} = useAppSelector(state => state.cartitem);

    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();

    const checkoutId = useAppSelector(state => state.checkoutId);

    return (
        <Container className="popupcontainer" style={{width: '100%'}}>
        <Popup
            position='bottom right'
            size='huge'
            mouseEnterDelay={100}
            mouseLeaveDelay={300}
            hoverable={true}
            className="popupcart"
            trigger={<Icon size='big' className="nav-bar-shopping-cart" name="shopping cart" style={{ marginLeft: "0.5em" }} />}
        >
            <Popup.Header style={{margin: '1vw'}} className="popupcartheader text-font"><strong>GIỎ HÀNG</strong></Popup.Header>
            <Popup.Content className="popupcartcontent">
                {cartItems.map((item, index) => {
                return (
                    <div key={index} className="itemitemgroup">
                        <ItemGroup className='itemgroup'>
                            <Item key={index}>
                                <ItemImage size='small' className="cartitemimage" src={item.photoURL[0]} alt={item.id} />
                                <ItemContent verticalAlign="top" style={{paddingLeft: '1.8em'}}>
                                    <div className="itemheader">
                                        <ItemHeader style={{fontSize:'0.9em', fontWeight: 'bold', fontFamily: 'Montserrat'}} content={item.name}/>
                                    </div>
                                    <ItemDescription style={{fontSize: '0.75em'}}>
                                        <div style={{marginBottom: '0', marginTop: '-1.3vh'}}>
                                            <p className="text-font" style={{marginBottom: '0.6vh'}}>{item.description}</p>
                                            <p className="text-font" style={{marginBottom: '0.6vh'}}>Số lượng: {item.count}</p>
                                            <p className="text-font" style={{marginBottom: '0.6vh'}}>Kích cỡ: {item.size}</p>
                                            <p className="text-font" style={{marginBottom: '0.6vh'}}><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                                        </div>
                                        <Button
                                            compact
                                            icon
                                            onClick={() => {
                                                dispatch({
                                                    type: 'productItem/clearitem',
                                                    payload: { id: item.id, size: item.size }
                                                });
                                            }}    
                                        >
                                            <Icon name='trash'/>
                                        </Button>
                                        <Button
                                            compact
                                            content='-1'
                                            onClick={() => {
                                                dispatch({
                                                    type: 'productItem/decrementCount',
                                                    payload: { id: item.id, size: item.size }
                                                });
                                            }}    
                                        ></Button>
                                        <Button
                                            compact 
                                            content='+1'
                                            onClick={() => {
                                                dispatch({
                                                    type: 'productItem/incrementCount',
                                                    payload: { id: item.id, size: item.size }
                                                });
                                            }}    
                                        ></Button>
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
                    <ItemHeader className='totalnavbar'>TỔNG CỘNG: </ItemHeader>
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
                    onClick={() => navigate(`/thanhtoan/${checkoutId}`)}
                />
            </Popup.Content>
        </Popup>
        </Container>
    )
}