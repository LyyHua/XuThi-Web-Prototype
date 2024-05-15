import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import { ProductItems } from "../../../features/Product/ProductItems";

export default function ProductPage() {
    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const product = ProductItems.find(item => item.id === id);
        setProduct(product);
    }, [id]);

    if (!product || !product.photoURL || !product.photoURL2) {
        return <div>Loading...</div>;
    }
    const images = [product.photoURL, product.photoURL2];

  return (
    <Container>
        <Grid style={{paddingBottom: '6em'}}>
            <Grid.Column mobile={16} computer={10}>
                <Grid.Row>
                <Carousel width='100%' swipeable={true} showStatus={false} infiniteLoop stopOnHover showThumbs={true} emulateTouch={true}>
                    {images.map((src, index) => (
                        <div key={index}>
                            <img src={src} alt={`Product Image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
                </Grid.Row>
                  
            </Grid.Column>
            <Grid.Column mobile={16} computer={6}>

            </Grid.Column>
        </Grid>
    </Container>
  )
}