import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./CartStyle";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
  cart,
  updateCartQuantityHandler,
  removeItemFromCartHandler,
  emptyCartHandler,
}) => {
  const classes = useStyles();

  const EmptyCard = () => (
    <Typography variant="subtitle1">
      No items.{" "}
      <Link className={classes.link} to="/">
        Back to product page!
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid key={item.id} item xs={12} sm={4} lg={3}>
            <CartItem
              item={item}
              updateItemQty={updateCartQuantityHandler}
              removeItemFromCart={removeItemFromCartHandler}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCartHandler}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Check Out
          </Button>
        </div>
      </div>
    </>
  );
  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCard /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
