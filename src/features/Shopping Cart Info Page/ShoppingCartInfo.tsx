import { Button, Checkbox, Container, Divider, Grid, Input, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { toggleAllItemsChecked, toggleItemChecked, updateItemCount } from "../Product/ProductItemSlices";
import { useCallback, useEffect, useState } from "react";
import { selectAreAllItemsChecked } from "../../app/store/areAllItemsChecked";

export default function ShoppingCartInfo() {

  const cartItems = useAppSelector((state) => state.cartitem.cartItems)
  const dispatch = useAppDispatch();
  const areAllItemsChecked = useAppSelector(selectAreAllItemsChecked);

  const [inputValues, setInputValues] = useState(Array(cartItems.length).fill(''));

  useEffect(() => {
    setInputValues(Array(cartItems.length).fill(''));
  }, [cartItems]);

  const handleInputChange = useCallback((index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  }, [inputValues]);
  
  const handleInputKeyPress = useCallback((index: number) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      let count = parseInt(inputValues[index]);
      count = isNaN(count) || count < 1 ? 1 : count;
      dispatch(updateItemCount({ index, count }));
      const newInputValues = [...inputValues];
      newInputValues[index] = '';
      setInputValues(newInputValues);
    }
  }, [dispatch, inputValues]);

  const handleInputBlur = useCallback((index: number) => () => {
    let count = parseInt(inputValues[index]);
    count = isNaN(count) || count < 1 ? 1 : count;
    dispatch(updateItemCount({ index, count }));
    const newInputValues = [...inputValues];
    newInputValues[index] = '';
    setInputValues(newInputValues);
  }, [dispatch, inputValues]);

  const handleCheckboxChange = useCallback((index: number) => {
    dispatch(toggleItemChecked(index));
  }, [dispatch]);

  return (
    <Container>
      <h1 style={{marginTop: '10vh'}}>Tất cả sản phẩm trong giỏ hàng</h1>
      <Checkbox checked={areAllItemsChecked} onChange={() => dispatch(toggleAllItemsChecked())} />
      <Divider />
      <Grid>
        <Grid.Column width={12} style={{marginBottom: '5vh'}}> 
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
                        transparent 
                        defaultValue={item.count}
                        onChange={handleInputChange(index)}
                        onKeyPress={handleInputKeyPress(index)}
                        onBlur={handleInputBlur(index)} 
                      />
                      <Button content='+1' onClick={() => dispatch({ type: 'productItem/incrementCount', payload: { id: item.id, size: item.size } })} />
                    </ItemDescription>
                  </ItemContent>
                </Item>
              )
            })}
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={4}>
            <h1>Tổng cộng</h1>

        </Grid.Column>
      </Grid>
    </Container>
  )
}
