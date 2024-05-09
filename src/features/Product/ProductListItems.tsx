import { Grid, Container} from "semantic-ui-react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductListItems(props: any) {

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const navigate = useNavigate();
    
  return (
    <Grid centered>
        <Grid.Row>
          {props.products && props.products.map((products: any, index: number) => {
            const isHovered = hoveredImage === products.name;
            return (
              <Grid.Column key={index} width={3} style={{ padding: '1vw', marginBottom: '2vh' }}>
                <Container className="product">
                <div className="image-container" onClick={() => navigate(`/sanpham/${products.id}`)} style={{cursor: 'pointer'}}>
                  <img
                    src={products.photoURL}
                    alt={products.name}
                    className={`product-image ${isHovered ? 'fade-out' : 'fade-in'}`}
                  />
                  <img
                    src={products.photoURL2}
                    alt={products.name}
                    className={`product-image ${isHovered ? 'fade-in' : 'fade-out'}`}
                    onMouseEnter={() => setHoveredImage(products.name)}
                    onMouseLeave={() => setHoveredImage(null)}
                  />
                </div>
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