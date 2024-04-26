import { useState } from "react";
import { Button, Container, Divider, Grid, Header, Icon, Modal, ModalActions, ModalContent, ModalDescription, Image } from "semantic-ui-react";

export default function ProductList(props: any) {
  
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
          {props.product.map((product: any) => {
            return (
              <Grid.Column width={3} style={{ padding: '10px', marginBottom: '20px' }}>
                <Container className="product">
                  <Image src={product.photoURL} alt={product.name} />
                  <Modal
                    onClose={() => handleClose(product.id)}
                    onOpen={() => handleOpen(product.id)}
                    open={open[product.id]}
                    trigger={
                      <Button circular className="shoppingcartcircle">
                        <Icon inverted size='large' className="innershoppingcartcircle" name="cart plus" style={{ position: 'absolute', top: '25%', left: '30%' }}/>
                      </Button>
                    }
                  >
                    <ModalContent image>
                      <Image size="small" src={((): string => { console.log(product.photoURL); return product.photoURL; })()} alt={product.name} />
                      <ModalDescription>
                        <Header>{product.name}</Header>
                        <p>{product.description}</p>
                        <h3><strong>{product.price}</strong><u>đ</u></h3>
                      </ModalDescription>
                    </ModalContent>
                    <ModalActions>
                      <Button color='black' onClick={() => handleClose(product.id)}>
                        Nope
                      </Button>
                      <Button
                        content="Yep, that's me"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => handleClose(product.id)}
                        positive
                      />
                    </ModalActions>
                  </Modal>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <h3><strong>{product.price}</strong><u>đ</u></h3>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </Container>
  )
}