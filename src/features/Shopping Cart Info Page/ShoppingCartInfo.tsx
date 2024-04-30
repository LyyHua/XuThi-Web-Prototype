import { Container, Grid, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";

export default function ShoppingCartInfo() {

  const cartItems = useAppSelector((state) => state.cartitem.cartItems)

  return (
    <Container>
      <h1 style={{marginTop: '10vh'}}>Giỏ hàng</h1>
      <Grid>
        <Grid.Column width={12}>
          <ItemGroup>
            {cartItems.map((item, index) => {
              return (
                <ItemGroup divided key={index}>
                  <Item>
                    <ItemImage size='small' src={item.photoURL} alt={item.id} />
                    <ItemContent verticalAlign="middle">
                      <ItemHeader content={item.name}/>
                      <ItemDescription>
                        <p>{item.description}</p>
                        <p>Số lượng: {item.count}</p>
                        <p>Kích cỡ: {item.size}</p>
                        <p><strong>{item.price.toLocaleString()}<u>đ</u></strong></p>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
              )
            })}
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={4}>

        </Grid.Column>
      </Grid>
    </Container>
  )
}