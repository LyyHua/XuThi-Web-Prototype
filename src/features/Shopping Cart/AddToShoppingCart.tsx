import { useState } from "react";
import { Modal, Button, Icon, ModalContent, ModalDescription, Header, ModalActions, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function AddToShoppingCart(props: any) {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const checkoutId = useAppSelector(state => state.checkoutId);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [active, setActive] = useState<string | null>(null);

  const handleClick = (size: string) => {
    setActive(size);
    setErrorMessage(null);
  };
  
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
        onClose={() => handleClose(props.productitems.id)}
        onOpen={() => handleOpen(props.productitems.id)}
        open={open[props.productitems.id]}
        trigger={
            <Button circular className="shoppingcartcircle">
            <Icon inverted size='large' className="innershoppingcartcircle" name="cart plus"/>
            </Button>
        }
        >
        <ModalContent image className="modalcontent custom-modal-content">
            <Image className="modal-image" size="small" src={props.productitems.photoURL} alt={props.productitems.name} />
            <ModalDescription className="modal-description custom-modal-description" >
                <Header>{props.productitems.name}</Header>
                <p>Mã: {props.productitems.id}</p>
                <h3><strong>{props.productitems.price.toLocaleString()}</strong><u>đ</u></h3>
                <Button icon className="closebutton" onClick={() => handleClose(props.productitems.id)}>
                    <Icon size='large' className="closebuttonicon" name="times"/>
                </Button>
            </ModalDescription>
        </ModalContent>
        <ModalContent className="modal-content-top">
            <h3 className="modal-content-title">Kích cỡ</h3>
        <ModalDescription className="modal-content-description">
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            </ModalDescription>
        </ModalContent>
        <ModalActions className="buttonholder">
            <Button
            className="addtocartbutton" 
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
                content="THANH TOÁN NGAY"
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
                        navigate(`/thanhtoan/${checkoutId}`);
                    }
                }}
            />
        </ModalActions>
    </Modal>
  )
}