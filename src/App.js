import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import React, { Component } from 'react';
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: []
  };
  componentDidMount() {
    this.getProducts();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  }
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " Added to cart ", 2);
    console.log(newCart)
  }
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: newCart })
    alertify.error(product.productName + " Remove to cart ", 2);
  }
  render() {

    let productInfo = { title: "Product List" }
    let categoryInfo = { title: "Category List" }
    return (
      <div >
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo} />
            </Col>
            <Col xs="9">
              <Switch>
                <Route exact path="/" render={props => (
                  <ProductList
                    {...props}
                    products={this.state.products}
                    currentCategory={this.state.currentCategory}
                    addToCart={this.addToCart}
                    info={productInfo} />
                )
                } />
                <Route exact path="/cart" render={props => (
                  <CartList
                    {...props}
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart}
                  />
                )
                } />
                <Route component={NotFound} />
              </Switch>

            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
