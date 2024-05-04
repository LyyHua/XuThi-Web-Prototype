import { Grid } from "semantic-ui-react";
import ShoppingForm from "../Form/ShoppingForm";

export default function CheckOut() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ShoppingForm/>
      </Grid.Column>
    </Grid>
  )
}