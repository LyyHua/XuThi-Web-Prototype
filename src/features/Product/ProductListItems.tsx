import { Grid, Container, Image} from "semantic-ui-react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";

export default function ProductListItems(props: any) {
    
  return (
    <Grid centered>
        <Grid.Row>
          {props.products && props.products.map((products: any, index: number) => {
            return (
              <Grid.Column key={index} width={3} style={{ padding: '1vw', marginBottom: '2vh' }}>
                <Container className="product">
                  <Image src={products.photoURL} alt={products.name} />
                  <AddToShoppingCart productitems = {products}/>
                  <h2>{products.name}</h2>
                  <p>{products.description}</p>
                  <h3><strong>{products.price.toLocaleString()}</strong><u>đ</u></h3>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
  )
}