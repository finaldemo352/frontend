import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen.js";
import LoginForm from "./screens/LoginForm";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductUpdateScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" exact component={LoginForm} />
          <Route path="/products/:id" component={ProductScreen} exact />
          <Route path="/cart" exact component={CartScreen} />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/admin/:id/edit" component={UpdateUserScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/page/:pageNumber" exact component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            exact
            component={HomeScreen}
          />
          <Route
            path="/admin/products/:id/edit"
            component={ProductUpdateScreen}
          />
        </main>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
