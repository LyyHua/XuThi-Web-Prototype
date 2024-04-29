import { useState } from "react";
import { Modal, Button, Icon, ModalContent, ModalDescription, Header, ModalActions, Image } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";

export default function AddToShoppingCart(props: any) {

const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [active, setActive] = useState<string | null>(null);

  const handleClick = (size: string) => {
    setActive(size);
    setErrorMessage(null);
  };

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleOpen = (id: string) => {
    setOpen(prevState => ({ ...prevState, [id]: true }));
  };

  const handleClose = (id: string) => {
    setActive(null);
    setOpen(prevState => ({ ...prevState, [id]: false }));
  };

  return (
    <Modal 
        className="modal"
        size='small'
        style={{width: '34%', height: '55%'}}
        onClose={() => handleClose(props.productitems.id)}
        onOpen={() => handleOpen(props.productitems.id)}
        open={open[props.productitems.id]}
        trigger={
            <Button circular className="shoppingcartcircle">
            <Icon inverted size='large' className="innershoppingcartcircle" name="cart plus" style={{ position: 'absolute', top: '25%', left: '30%' }}/>
            </Button>
        }
        >
        <ModalContent image className="modalcontent">
            <Image style={{marginLeft: '1.5vw'}} size="small" src={props.productitems.photoURL} alt={props.productitems.name} />
            <ModalDescription className="modal-description" style={{marginTop: '2vh'}}>
            <Header>{props.productitems.name}</Header>
            <p>{props.productitems.description}</p>
            <h3><strong>{props.productitems.price.toLocaleString()}</strong><u>đ</u></h3>
            <Button icon className="closebutton" onClick={() => handleClose(props.productitems.id)}>
                <Icon size='large' className="closebuttonicon" name="times"/>
            </Button>
            </ModalDescription>
        </ModalContent>
        <ModalContent style={{marginTop: '-2.5vh'}}>
            <h3 style={{marginLeft: '1.5vw'}}>Kích cỡ</h3>
        <ModalDescription style={{marginLeft: '1.5vw'}}>
            {props.productitems.size && props.productitems.size.map((size: string, index: number) => {
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
            {errorMessage && <p style={{color: 'red', marginTop: '1.5vh', marginBottom: '-1vh'}}>{errorMessage}</p>}
            </ModalDescription>
        </ModalContent>
        <ModalActions className="buttonholder">
            <Button
            className="addtocartbutton" 
            content='THÊM VÀO GIỎ HÀNG'
            color='black' 
            onClick={() => {
                if (active === null){
                setErrorMessage('Vui lòng chọn kích cỡ sản phẩm')
                }
                else{
                dispatch({
                type: 'productItem/addToCart', 
                payload: { 
                    name: props.productitems.name, 
                    id: props.productitems.id, 
                    photoURL: props.productitems.photoURL, 
                    amount: 1, 
                    price: props.productitems.price, 
                    description: props.productitems.description,
                    size: active
                }
                });
                handleClose(props.productitems.id);
                }
            }}
            />
            <Button
            className="pay"
            color='black'
            inverted
            style={{color: 'black', marginLeft: '3.5em', marginBottom: '1.5em', marginTop: '1em', marginRight: '2em'}}
            content="THANH TOÁN NGAY"
            />
        </ModalActions>
    </Modal>
  )
}