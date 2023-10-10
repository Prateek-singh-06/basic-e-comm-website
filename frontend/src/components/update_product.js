import React, { useState } from "react";
import "./add-product.css";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming your route has a parameter named 'id'

  const [Product, setProduct] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductCategory: "",
    ProductCompany: "",
  });

  const handle_update_Product = async (e) => {
    e.preventDefault();
    let result2 = await fetch(`http://localhost:5000/update/${id}`, {
      method: "put",
      body: JSON.stringify({ Product }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Content-Type": "application/json",
      },
    });
    console.log(result2);

    navigate("/product");
  };

  const prefill = async () => {
    try {
      let result = await fetch(`http://localhost:5000/update/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      //console.log(result);

      setProduct({
        ProductName: result.ProductName,
        ProductPrice: result.ProductPrice,
        ProductCategory: result.ProductCategory,
        ProductCompany: result.ProductCompany,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useState(() => {
    prefill();
  }, []);

  return (
    <div className="add_product_page">
      <div className="add_product">
        <h1 className="form_heading">Update Product</h1>
        <input
          type="text"
          placeholder="Product Name"
          className="product_input"
          id="product_input_name"
          required
          value={Product.ProductName}
          onChange={(e) =>
            setProduct({ ...Product, ProductName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Product Price"
          className="product_input"
          id="product_input_price"
          required
          value={Product.ProductPrice}
          onChange={(e) =>
            setProduct({ ...Product, ProductPrice: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Product Category"
          className="product_input"
          id="product_input_category"
          required
          value={Product.ProductCategory}
          onChange={(e) =>
            setProduct({ ...Product, ProductCategory: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Product Company "
          className="product_input"
          id="product_input_"
          required
          value={Product.ProductCompany}
          onChange={(e) =>
            setProduct({ ...Product, ProductCompany: e.target.value })
          }
        />
        <button
          onClick={handle_update_Product}
          type="submit"
          className="add_product_submit"
        >
          update
        </button>
      </div>
    </div>
  );
};

export default Update;
