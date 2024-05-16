import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Grid, Message } from "semantic-ui-react";
import { ProductItems } from "../../../features/Product/ProductItems";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function ProductPage() {
    
    const checkoutId = useAppSelector(state => state.checkoutId);

    const { id } = useParams<{id: string}>();

    const [product, setProduct] = useState<any>(null);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [errorMessage,setErrorMessage] = useState<string | null>(null);

    const [active, setActive] = useState<string | null>(null);

    const list = [
        'Thanh toán qua VietQR. Miễn phí giao hàng khắp mọi tỉnh/thành Việt Nam'
      ]

    useEffect(() => {
        const product = ProductItems.find(item => item.id === id);
        setProduct(product);
    }, [id]);

    const handleClick = (size: string) => {
        setActive(size);
        setErrorMessage(null);
      };

    if (!product || !product.photoURL || !product.photoURL2) {
        return <div>Loading...</div>;
    }
    const images = [product.photoURL, product.photoURL2];

  return (
    <Container style={{width: '90%'}} className="product-page-container">
        <Grid>
            <Grid.Column mobile={16} computer={9}>
                <Carousel swipeable={true} showStatus={false} showArrows={false} infiniteLoop stopOnHover showThumbs={true} emulateTouch={true}>
                    {images.map((src, index) => (
                        <div key={index}>
                            <img style={{width: '100%'}} src={src} alt={`Product Image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </Grid.Column>
            <Grid.Column className="product-page-right-grid" mobile={16} computer={7}>
                <p style={{fontFamily: 'Montserrat', fontSize: '1.5em'}}>{product.name}</p>
                <p style={{fontFamily: 'Montserrat', fontSize: '1.3em', marginTop: '-0.7em'}}>Mã: {product.id}</p>
                <p style={{fontFamily: 'Montserrat', fontSize: '1.3em', marginTop: '-0.2em'}}><strong>{product.price.toLocaleString()}<u>đ</u></strong></p>
                <h3 style={{fontFamily: 'Montserrat', marginTop: 0}}>KÍCH CỠ</h3>
                <div>
                    {product.size && product.size.map((size: string, index: number) => {
                        return (
                            <Button
                                active={active === size} 
                                onClick={() => handleClick(size)} 
                                color={active === size ? 'black' : 'black'}
                                inverted={active !== size}
                                key={index}
                                className={'sizebutton ${active === size ? "active" : ""}'}
                                content={size}
                                size='large'
                                style={{color: active === size ? 'white' : 'black', marginRight: '1em', marginBottom: '1em'}}
                            />
                        );
                    })}
                    {errorMessage && <p style={{marginTop: '0', marginBottom: '1em'}} className="error-message text-font">{errorMessage}</p>}
                    <Message className="product-page-message" style={{fontFamily: 'Montserrat', marginTop: 0}} header='Ưu đãi từ cổng thanh toán' list={list}/>
                </div>
                <div className="product-page-button">
                    <Button
                        className="addtocartbutton text-font product-page-add-to-cart-button" 
                        content='THÊM VÀO GIỎ'
                        color='black' 
                        onClick={() => {
                            if (active === null){
                            setErrorMessage('Vui lòng chọn kích cỡ sản phẩm')
                            }
                            else{
                                dispatch({
                                    type: 'productItem/addToCart', 
                                    payload: { 
                                        name: product.name, 
                                        id: product.id, 
                                        photoURL: product.photoURL, 
                                        amount: 1, 
                                        price: product.price, 
                                        description: product.description,
                                        size: active
                                    }
                                });
                            }
                        }}
                    />
                    <Button
                        className="pay text-font"
                        color='black'
                        inverted
                        content="THANH TOÁN NGAY"
                        onClick={() => {
                            if (active === null){
                                setErrorMessage('Vui lòng chọn kích cỡ sản phẩm')
                            }
                            else{
                                dispatch({
                                    type: 'productItem/addToCart', 
                                    payload: { 
                                        name: product.name, 
                                        id: product.id, 
                                        photoURL: product.photoURL, 
                                        amount: 1, 
                                        price: product.price, 
                                        description: product.description,
                                        size: active
                                    }
                                });
                                navigate(`/thanhtoan/${checkoutId}`);
                            }
                        }}
                    />
                </div>
            </Grid.Column>
        </Grid>
    </Container>
  )
}