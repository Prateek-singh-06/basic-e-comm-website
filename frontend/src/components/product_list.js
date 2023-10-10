import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Product_list = (e) => {
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    // e.preventDefault();

    let result = await fetch("http://localhost:5000/product", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    // console.log(result);
    result = await result.json();
    setProducts(result);
    // console.log(result);
  };

  const Handle_delete_product = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    getProducts();
    // console.log(result);
  };

  const Search_Handle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        method: "get",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  const navigate_update = async (id) => {
    navigate(`/update/${id}`);
  };
  return (
    //i added css in app.css file
    <div className="Product_listing_container">
      <h1 className="Product_list_heading">Product list</h1>
      <input
        id="search_bar"
        type="text"
        placeholder="Search Product"
        onChange={Search_Handle}
      ></input>
      <ul className="Product_lists">
        <li id="s_no">S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {Products.map((item, index) => (
        <ul className="Product_lists">
          <li id="s_no">{index + 1}</li>
          <li>{item.ProductName}</li>
          <li>{item.ProductPrice}</li>
          <li>{item.ProductCategory}</li>
          <li>{item.ProductCompany}</li>
          <li>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => Handle_delete_product(item._id)}
            >
              delete
            </button>
            <span>/</span>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => navigate_update(item._id)}
            >
              update
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};
export default Product_list;
