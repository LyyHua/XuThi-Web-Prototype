import { Container, Divider } from "semantic-ui-react";
import ProductListItems from "./ProductListItems";

export default function ProductList(props: any) {
  return (
    <Container textAlign="center" style={{marginTop: '20px', width: '90%'}} className="ProductList">
      <h1><strong>CÁC SẢN PHẨM CỦA CHÚNG TÔI</strong></h1>
      <Divider style={{ width: '95%' }} />
      <ProductListItems products={props.product}/>
    </Container>
  )
}

