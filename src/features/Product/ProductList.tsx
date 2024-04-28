import { useState } from "react";
import { Button, Container, Divider, Grid, Header, Icon, Modal, ModalActions, ModalContent, ModalDescription, Image } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";

export default function ProductList(props: any) {
  
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (size: string) => {
    setActive(size);
  };

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleOpen = (id: string) => {
    setOpen(prevState => ({ ...prevState, [id]: true }));
  };

  const handleClose = (id: string) => {
    setOpen(prevState => ({ ...prevState, [id]: false }));
  };

  return (
    <Container textAlign="center" style={{marginTop: '20px', width: '90%'}} className="ProductList">
      <h1><strong>CÁC SẢN PHẨM CỦA CHÚNG TÔI</strong></h1>
      <Divider style={{ width: '95%' }} />
      <Grid centered>
        <Grid.Row>
          {props.product.map((product: any, index: number) => {
            return (
              <Grid.Column key={index} width={3} style={{ padding: '1vw', marginBottom: '2vh' }}>
                <Container className="product">
                  <Image src={product.photoURL} alt={product.name} />
                  <Modal 
                    className="modal"
                    size='small'
                    style={{width: '35%', height: '50%'}}
                    onClose={() => handleClose(product.id)}
                    onOpen={() => handleOpen(product.id)}
                    open={open[product.id]}
                    trigger={
                      <Button circular className="shoppingcartcircle">
                        <Icon inverted size='large' className="innershoppingcartcircle" name="cart plus" style={{ position: 'absolute', top: '25%', left: '30%' }}/>
                      </Button>
                    }
                  >
                    <ModalContent image className="modalcontent">
                      <Image style={{marginLeft: '1.5vw'}} size="small" src={product.photoURL} alt={product.name} />
                      <ModalDescription className="modal-description" style={{marginTop: '2vh'}}>
                        <Header>{product.name}</Header>
                        <p>{product.description}</p>
                        <h3><strong>{product.price.toLocaleString()}</strong><u>đ</u></h3>
                        <Button icon className="closebutton" onClick={() => handleClose(product.id)}>
                          <Icon size='large' className="closebuttonicon" name="times"/>
                        </Button>
                      </ModalDescription>
                    </ModalContent>
                    <ModalContent style={{marginTop: '-2.5vh'}}>
                      <h3 style={{marginLeft: '1.5vw'}}>Kích cỡ</h3>
                    <ModalDescription style={{marginLeft: '1.5vw'}}>
                        {product.size.map((size: string, index: number) => {
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
                              style={{color: active === size ? 'white' : 'black', marginRight: '1vw'}}
                            />
                          );
                        })}
                      </ModalDescription>
                    </ModalContent>
                    <ModalActions className="buttonholder">
                      <Button 
                        className="addtocartbutton" 
                        content='THÊM VÀO GIỎ HÀNG'
                        color='black' 
                        onClick={() => {
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
                          handleClose(product.id);
                        }}
                        />
                      <Button
                        className="pay"
                        color='black'
                        inverted
                        style={{color: 'black', marginBottom: '1.5em', marginTop: '1em'}}
                        content="THANH TOÁN NGAY"
                      />
                    </ModalActions>
                  </Modal>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <h3><strong>{product.price.toLocaleString()}</strong><u>đ</u></h3>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </Container>
  )
}

