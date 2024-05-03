import { Button, Checkbox, Container, Divider, Grid, Input, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { toggleAllItemsChecked, toggleItemChecked, updateItemCount } from "../Product/ProductItemSlices";
import { useCallback, useEffect, useState } from "react";
import { selectAreAllItemsChecked } from "../../app/store/areAllItemsChecked";
import { useNavigate } from "react-router-dom";
import { createId } from "@paralleldrive/cuid2";
import { setCheckoutId } from "../../app/store/checkoutId";

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
    <Container style={{paddingTop: '8vh'}}>
      <Container style={{display: 'flex', alignItems: 'center'}}>
        <Checkbox style={{marginRight: '1vw'}} checked={areAllItemsChecked} onChange={() => dispatch(toggleAllItemsChecked())} />
        <h1 style={{fontFamily:'Montserrat, sans-serif'}}>Tất cả sản phẩm trong giỏ hàng</h1>
      </Container>
      <Grid>
        <Grid.Column width={10} style={{marginBottom: '5vh'}}> 
        <Divider />
          <ItemGroup divided>
            {cartItems.map((item, index) => {
              return (
                <Item key={item.id}>
                  <Checkbox 
                    style={{marginRight: '1vh'}} 
                    checked={item.checked} 
                    onChange={() => handleCheckboxChange(index)} />
                  <ItemImage size='small' src={item.photoURL} alt={item.id} />
                  <ItemContent verticalAlign="middle">
                    <ItemHeader content={item.name} />
                    <ItemDescription>
                      <p>{item.description}</p>
                      <p>Số lượng: {item.count}</p>
                      <p>Kích cỡ: {item.size}</p>
                      <p><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                      <Button icon='trash' onClick={() => dispatch({ type: 'productItem/clearitem', payload: { id: item.id, size: item.size } })} />
                      <Button content='-1' onClick={() => dispatch({ type: 'productItem/decrementCount', payload: { id: item.id, size: item.size } })} />
                      <Input
                        className="shopping-cart-input"
                        value={inputValues[index]}
                        onChange={handleInputChange(index)}
                        onKeyPress={handleInputKeyPress(index)}
                        onBlur={handleInputBlur(index)}
                        style={{'width': '60px', textAlign: 'center'}}
                      />
                      <Button content='+1' onClick={() => dispatch({ type: 'productItem/incrementCount', payload: { id: item.id, size: item.size } })} />
                    </ItemDescription>
                  </ItemContent>
                </Item>
              )
            })}
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={6}>
            <h1>Tạm tính</h1>
            <h3>{cartItems.filter(item => item.checked).reduce((acc, item) => acc + item.count * item.price, 0).toLocaleString()}<u>đ</u></h3>
            <Button onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
            <Button
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
