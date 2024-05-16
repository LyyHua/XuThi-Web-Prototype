import { Button, Checkbox, Container, Divider, Grid, Input, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { toggleAllItemsChecked, toggleItemChecked, updateItemCount } from "../Product/ProductItemSlices";
import { useCallback, useEffect, useState } from "react";
import { selectAreAllItemsChecked } from "../../app/store/AreAllItemsChecked";
import { useNavigate } from "react-router-dom";
import { createId } from "@paralleldrive/cuid2";
import { setCheckoutId } from "../../app/store/CheckoutId";

export default function ShoppingCartInfo() {

  const checkoutId = useAppSelector(state => state.checkoutId);

  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cartitem.cartItems)
  const dispatch = useAppDispatch();
  const areAllItemsChecked = useAppSelector(selectAreAllItemsChecked);

  const [inputValues, setInputValues] = useState(cartItems.map(item => item.count.toString()));

  useEffect(() => {
    setInputValues(cartItems.map(item => item.count.toString()));
  }, [cartItems]);

  useEffect(() => {
    // Get the checkoutId from localStorage
    const savedCheckoutId = localStorage.getItem('checkoutId');

    // If there's a saved checkoutId, use it
    if (savedCheckoutId) {
      dispatch(setCheckoutId(savedCheckoutId));
    } else {
      // Otherwise, generate a new checkoutId and save it in localStorage
      const newCheckoutId = createId();
      dispatch(setCheckoutId(newCheckoutId));
      localStorage.setItem('checkoutId', newCheckoutId);
    }
  }, [dispatch]);

  const handleInputChange = useCallback((index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  }, [inputValues]);
  
  const handleInputKeyPress = useCallback((index: number) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      let count = parseInt(inputValues[index]);
      count = isNaN(count) || count < 1 ? 1 : count;
      dispatch(updateItemCount({ index, count }));
      const newInputValues = [...inputValues];
      newInputValues[index] = count.toString();
      setInputValues(newInputValues);
    }
  }, [dispatch, inputValues]);
  
  const handleInputBlur = useCallback((index: number) => () => {
    let count = parseInt(inputValues[index]);
    count = isNaN(count) || count < 1 ? 1 : count;
    dispatch(updateItemCount({ index, count }));
    const newInputValues = [...inputValues];
    newInputValues[index] = count.toString();
    setInputValues(newInputValues);
  }, [dispatch, inputValues]);

  const handleCheckboxChange = useCallback((index: number) => {
    dispatch(toggleItemChecked(index));
  }, [dispatch]);

  return (
    <Container className="container-padding-top">
      <Container className="container-flex-align">
        <Checkbox className="checkbox-margin-right" checked={areAllItemsChecked} onChange={() => dispatch(toggleAllItemsChecked())} />
        <h1 style={{fontFamily:'Montserrat, sans-serif'}}>Tất cả sản phẩm trong giỏ hàng</h1>
      </Container>
      <Grid>
        <Grid.Column computer={10} mobile={16} className="grid-column-margin-bottom"> 
        <Divider />
          <ItemGroup divided>
            {cartItems.map((item, index) => {
              return (
                <Item key={`${item.id}-${item.size}`}>
                  <Checkbox
                    className="checkbox-item-margin"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(index)} />
                  <ItemImage size='small' src={item.photoURL} alt={item.id} className="item-image-style"  />
                  <ItemContent className="item-content">
                    <ItemHeader className="item-header" style={{fontFamily:'Montserrat, sans-serif'}}>{item.name}</ItemHeader>
                    <ItemDescription className="item-description">
                      <p style={{fontFamily:'Montserrat, sans-serif'}}>Số lượng: {item.count}</p>
                      <p style={{fontFamily:'Montserrat, sans-serif'}}>Kích cỡ: {item.size}</p>
                      <p style={{fontFamily:'Montserrat, sans-serif'}}><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                      <Button style={{marginLeft: '-0.2em'}} icon='trash' onClick={() => dispatch({ type: 'productItem/clearitem', payload: { id: item.id, size: item.size } })} />
                      <Button content='-' onClick={() => dispatch({ type: 'productItem/decrementCount', payload: { id: item.id, size: item.size } })} />
                      <Input
                        className="shopping-cart-input"
                        value={inputValues[index]}
                        onChange={handleInputChange(index)}
                        onKeyPress={handleInputKeyPress(index)}
                        onBlur={handleInputBlur(index)}
                        style={{'width': '60px', textAlign: 'center'}}
                      />
                      <Button 
                        content='+'
                        style={{marginLeft: '0.25vw'}}
                        onClick={() => dispatch({ type: 'productItem/incrementCount', payload: { id: item.id, size: item.size } })} />
                    </ItemDescription>
                  </ItemContent>
                </Item>
              )
            })}
          </ItemGroup>
          <Divider />
        </Grid.Column>
        <Grid.Column style={{marginBottom: '2em'}} computer={6} mobile={16}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1em', marginLeft: '1em' }}>
            <h2 style={{ fontFamily: 'Montserrat', margin: 0, marginRight: '10px' }}>Tạm tính:</h2>
            <h3 style={{ margin: 0, fontFamily: 'Montserrat', marginTop: '0.2em'}}>{cartItems.filter(item => item.checked).reduce((acc, item) => acc + item.count * item.price, 0).toLocaleString()}<u>đ</u></h3>
          </div>
          <Button className="continue-buying text-font" onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
          <Button
            className="checkout-button text-font"
            onClick={() => {
            navigate(`/thanhtoan/${checkoutId}`);
            }}
            style={{fontFamily:'Montserrat, sans-serif'}} 
            color="black">Thanh toán
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
