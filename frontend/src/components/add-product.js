import React from "react";
import "./add-product.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  let local = localStorage.getItem("localinfo");
  local = JSON.parse(local);
  local = local.userid;
  const [ProductName, setProductName] = useState("");
  const [userid, setuserid] = useState(local);
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductCompany, setProductCompany] = useState("");
  const [Error, setError] = useState(false);
  const handle_Add_Product = async (e) => {
    if (!ProductName || !ProductPrice || !ProductCategory || !ProductCompany) {
      setError(true);
      return false;
    }
    // console.log("debug");
    // console.log(local.userid);
    // setuserid(local.userid);
    e.preventDefault();
    console.log(ProductName, ProductPrice, ProductCategory, ProductCompany);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        ProductName,
        userid,
        ProductPrice,
        ProductCategory,
        ProductCompany,
      }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result);
    navigate("/product");
  };
  return (
    <div className="add_product_page">
      <div className="add_product">
        <h1 className="form_heading">Add product</h1>
        {/* <form> */}
        <input
          type="text"
          placeholder="Product Name"
          className="product_input"
          id="product_input_name"
          required
          onChange={(e) => setProductName(e.target.value)}
        />
        {Error && !ProductName && (
          <span className="invalid_input">please enter product name</span>
        )}
        <input
          type="text"
          placeholder="Enter Product Price"
          className="product_input"
          id="product_input_price"
          required
          onChange={(e) => setProductPrice(e.target.value)}
        />
        {Error && !ProductPrice && (
          <span className="invalid_input">please enter product price</span>
        )}
        <input
          type="text"
          placeholder="Enter Product Category"
          className="product_input"
          id="product_input_category"
          required
          onChange={(e) => setProductCategory(e.target.value)}
        />
        {Error && !ProductCategory && (
          <span className="invalid_input">please enter product category</span>
        )}
        <input
          type="text"
          placeholder="Enter Product Company "
          className="product_input"
          id="product_input_"
          required
          onChange={(e) => setProductCompany(e.target.value)}
        />
        {Error && !ProductCompany && (
          <span className="invalid_input">please enter product company</span>
        )}
        <button
          type="submit"
          className="add_product_submit"
          onClick={handle_Add_Product}
        >
          add
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};
export default Add;
