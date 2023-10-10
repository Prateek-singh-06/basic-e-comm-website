const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");

//make a .env file to store this key
const KEY = "e-comm";

require("./DataBase/config");
const User = require("./DataBase/Users");
const Product = require("./DataBase/product");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  try {
    let userData = new User(req.body);
    let result = await userData.save();
    result = result.toObject();
    delete result.userPassword;
    delete result._id;
    Jwt.sign({ result }, KEY, { expiresIn: "2h" }, (err, token) => {
      resp.send({ success: true, user: result, auth: token });
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

app.post("/signin", async (req, resp) => {
  try {
    let user = await User.findOne(req.body).select("-_id -userPassword");
    if (user) {
      Jwt.sign({ user }, KEY, { expiresIn: "2h" }, (err, token) => {
        resp.send({ success: true, user, auth: token });
      });
    } else {
      resp.send({ success: false, user: "no user found" });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

app.post("/add-product", varifyToken, async (req, resp) => {
  try {
    let productdata = new Product(req.body);
    let result = await productdata.save();
    //console.log(result);

    resp.send({ success: true, product: result });
  } catch (error) {
    console.error(error);
    resp.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

app.get("/product", varifyToken, async (req, resp) => {
  try {
    let result = await Product.find();
    resp.send(result);
    //console.log(product);
  } catch (error) {
    console.error(error);
    resp.send({ success: false, message: error });
  }
});

app.get("/search/:key", varifyToken, async (req, resp) => {
  try {
    let result = await Product.find({
      $or: [
        { ProductName: { $regex: req.params.key } },
        // { ProductPrice: { $regex: req.params.key } },
        { ProductCategory: { $regex: req.params.key } },
        { ProductCompany: { $regex: req.params.key } },
      ],
    });
    resp.send(result);
    console.log(result);
  } catch (error) {
    console.error(error);
    resp.send({ success: false, message: error });
  }
});

app.get("/update/:id", varifyToken, async (req, resp) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    resp.send(result);
    //console.log(product);
  } catch (error) {
    console.error(error);
    resp.send({ success: false, message: error });
  }
});
app.put("/update/:id", varifyToken, async (req, resp) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body.Product,
      }
    );
    resp.send(result);
    //console.log(products);
  } catch (error) {
    console.error(error);
    resp.send({ success: false, message: error });
  }
});

app.delete("/product/:id", varifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

function varifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // resp.send({ token });
    Jwt.verify(token, KEY, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please provide valid token" });
      } else {
        next();
        // resp.send("hello");
      }
    });
  } else {
    resp.status(403).send({ result: "please provide token" });
  }
}
// const port = 5000;
app.listen(5000);
