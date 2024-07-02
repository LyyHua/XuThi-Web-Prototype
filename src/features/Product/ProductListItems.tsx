import { Grid, Container, Reveal, RevealContent, Image, Placeholder} from "semantic-ui-react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";
import { useNavigate } from "react-router-dom";
import { ProductItems } from "./ProductItems";
export default function ProductListItems() {
  const navigate = useNavigate();
  
  return (
    <Grid centered>
        <Grid.Row>
          {ProductItems.map((products: any, index: number) => {
            return (
              <Grid.Column key={index} computer={3} mobile={8} style={{ padding: '1vw', marginBottom: '2vh' }}>
                <Container className="product">
                  <Reveal className="clickable" onClick={() => navigate(`/sanpham/${products.id}`)} animated="fade">
                    <RevealContent visible>
                      
                        <Placeholder style={{ height: 150, width: 150 }}>
                          <Placeholder.Image />
                        </Placeholder>
                      <Image alt={products.name} src={products.photoURL[0]} />
                    </RevealContent>
                    <RevealContent hidden>
                    <Image alt={products.name} src={products.photoURL[1]}/>
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