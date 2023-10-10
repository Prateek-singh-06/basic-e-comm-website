import "./App.css";
import Nav from "./components/nav";
import Signup from "./components/signup";
import Footer from "./components/footer";
import PrivateComponent from "./components/privatecomponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Disable_default from "./components/default_key_disable";
import Signin from "./components/signin";
import Addproduct from "./components/add-product";
import Home from "./components/home";
import Productlist from "./components/product_list";
import UpdateProduct from "./components/update_product";
function App() {
  //here i have used ShortcutComponent as a function we can use it in return alos by writing <ShortcutComponent/>
  Disable_default();

  return (
    <div className="App">
      {/* <ShortcutComponent /> */}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Productlist />} />

          <Route element={<PrivateComponent />}>
            <Route path="/add" element={<Addproduct />} />
            <Route path="/update/:id" Component={UpdateProduct} />
            <Route path="/logout" element={<h1>logout</h1>} />
            <Route path="/profile" element={<h1>open profile</h1>} />
          </Route>

          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      {/* <Signin /> */}
      <Footer />
    </div>
  );
}

export default App;
