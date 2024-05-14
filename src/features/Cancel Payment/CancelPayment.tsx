import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Container } from "semantic-ui-react";

export default function CancelPayment() {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/'); // Redirect to main page
      }, 5000); // Delay in milliseconds
  
      // Cleanup function to clear the timeout if the component unmounts before the delay
      return () => clearTimeout(timer);
    }, [navigate]);
    
  return (
    <Container className="emptycart" style={{marginTop: '7em', marginBottom: '5em'}}>
      <Image style={{marginBottom: '2em'}} src="https://firebasestorage.googleapis.com/v0/b/xuthi-6f838.appspot.com/o/emptyshoppingcart.jpg?alt=media&token=c16e07b7-de2b-4169-8080-1674b4630664" size='medium' centered />
      <h1 style={{fontFamily: 'Montserrat, sans-serif'}}>Thanh toán thất bại</h1>
      <h2 style={{fontFamily: 'Montserrat, sans-serif'}}>Đếm ngược thời gian quay trở lại trang chủ chính</h2>
    </Container>
  )
}