import NavbarComp from "./components/Navbar/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Button, Form } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import MyAccount from "./components/MyAccount/MyAccount";
import Overview from "./components/MyAccount/Overview";
import { getCategories, getProducts } from "./DAL/api";
import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      setCategories(await getCategories());
      setProducts(await getProducts());
    }

    getData();
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header className="d-flex justify-content-between align-items-center px-4">
        <img src="/logo.png" id="logo" alt="logo" />
        <InputGroup id="search">
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-search"
          />
          <Button
            variant="outline-secondary"
            className="shadow-none"
            id="button-search"
          >
            Search
          </Button>
        </InputGroup>
      </header>
      <NavbarComp></NavbarComp>
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage products={products} categories={categories} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/item/:id" element={<ProductDetails />} />
          <Route path="/my-account/*" element={<MyAccount />}>
            <Route index element={<Overview />}></Route>
          </Route>
        </Routes>
      </main>
      <footer>
        <p>©2022 Built by Maayan Altarac</p>
      </footer>
    </div>
  );
}

export default App;
