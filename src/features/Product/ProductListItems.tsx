import { Grid, Container, Reveal, RevealContent, Image} from "semantic-ui-react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";
import { useNavigate } from "react-router-dom";


export default function ProductListItems(props: any) {
  const navigate = useNavigate();

  return (
    <Grid centered>
        <Grid.Row>
          {props.products && props.products.map((products: any, index: number) => {
            return (
              <Grid.Column key={index} computer={3} mobile={8} style={{ padding: '1vw', marginBottom: '2vh' }}>
                <Container className="product">
                  <Reveal className="clickable" onClick={() => navigate(`/sanpham/${products.id}`)} animated="fade">
                    <RevealContent visible>
                      <Image src={products.photoURL}/>
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src={products.photoURL2}/>
                    </RevealContent>
                  </Reveal>
                  <AddToShoppingCart productitems = {products}/>
                  <h2 onClick={() => navigate(`/sanpham/${products.id}`)} style={{fontFamily: 'Montserrat'}} className="product-title clickable">{products.name}</h2>
                  <p onClick={() => navigate(`/sanpham/${products.id}`)} className="product-id clickable">Mã: {products.id}</p>
                  <h3 onClick={() => navigate(`/sanpham/${products.id}`)} className="product-price clickable"><strong>{products.price.toLocaleString()}</strong><u>đ</u></h3>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
  )
}