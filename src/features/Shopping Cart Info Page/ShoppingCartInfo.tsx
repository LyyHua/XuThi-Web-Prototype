import { Container, Grid, ItemGroup } from "semantic-ui-react";

export default function ShoppingCartInfo(props: any) {
  return (
    <Container>
      <h1 style={{marginTop: '10vh'}}>Giỏ hàng</h1>
      <Grid>
        <Grid.Column width={12}>
          <ItemGroup>
            
          </ItemGroup>
        </Grid.Column>
        <Grid.Column width={4}>

        </Grid.Column>
      </Grid>
    </Container>
  )
}