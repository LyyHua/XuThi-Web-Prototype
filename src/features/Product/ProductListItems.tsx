import { Grid, Container, Reveal, RevealContent, Image} from "semantic-ui-react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";


export default function ProductListItems(props: any) {
    
  return (
    <Grid centered>
        <Grid.Row>
          {props.products && props.products.map((products: any, index: number) => {
            return (
              <Grid.Column key={index} computer={3} mobile={8} style={{ padding: '1vw', marginBottom: '2vh' }}>
                <Container className="product">
                  <Reveal animated="fade">
                    <RevealContent visible>
                      <Image src={products.photoURL}/>
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src={products.photoURL2}/>
                    </RevealContent>
                  </Reveal>
                  <AddToShoppingCart productitems = {products}/>
                  <h2 style={{fontFamily: 'Montserrat'}} className="product-title">{products.name}</h2>
                  <p className="product-id">Mã: {products.id}</p>
                  <h3 className="product-price"><strong>{products.price.toLocaleString()}</strong><u>đ</u></h3>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
  )
}