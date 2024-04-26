import { Container, Divider, Grid } from "semantic-ui-react";

export default function ProductList(props: any) {
  return (
    <Container textAlign="center" style={{marginTop: '20px', width: '90%'}} className="ProductList">
      <h1><strong>CÁC SẢN PHẨM CỦA CHÚNG TÔI</strong></h1>
      <Divider style={{ width: '95%' }} />
      <Grid centered>
        <Grid.Row>
          {props.product.map((product: any, index: number) => {
            return (
              <Grid.Column key={index} width={3} style={{ padding: '10px', marginBottom: '20px' }}>
                <Container className="product">
                  <img src={product.photoURL} alt={product.name} />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <h3><strong>{product.price}</strong><u>đ</u></h3>
                </Container>
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>
    </Container>
  )
}