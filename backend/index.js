const express = require("express");
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const Products = require('./db/Products');

const Jwt = require('jsonwebtoken')
const jwtkey = 'e-comm'//based on it token is generated. It must be kept confiden9tial

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  
  const user = new User(req.body);
  let data = await user.save();
  data = data.toObject();
  delete data.pword;
  
      Jwt.sign({data},jwtkey,{expiresIn: "2h"},(err,token)=>{
        if(err){
          res.send({result:"Something went wrong, Please try after sometime!!"})
        }
        res.send({data,auth:token});

      })
      
    
});

app.post("/login", async (req, res) => {
  // let user = new User();
  console.log(req.body);
  if (req.body.mail && req.body.pword) {
    const data = await User.findOne(req.body).select("-pword");
    if (data)
      { 
        Jwt.sign({data},jwtkey,{expiresIn: "2h"},(err,token)=>{
          if(err){
            res.send({result:"Something went wrong, Please try after sometime!!"})
          }
          res.send({data,auth:token});

        })
        
      }
    else res.send({ result: "No user Found" });
  }
  else 
  res.send({result:"no User Found"})
});
app.post('/add-product',verifyToken ,async (req,res)=>{
  // res.send("Api sucessful")
  let products = new Products(req.body);
  let result = await products.save();
  res.send(result);
})

app.get('/products',verifyToken,async(req,res)=>{
  const products = await Products.find();
  if(products.length>0)
  res.send(products);
  else res.send({result:"No result found"});
})

app.delete('/delete/:id',async(req,res)=>{
 
  const result = await Products.deleteOne({_id:req.params.id})
  res.send(result);
})

app.get('/update/:id',async(req,res)=>{
  let result = await Products.findOne({_id:req.params.id})
  if(result)
  res.send(result);
  else
  res.send({result:"No result Found"});
})

app.put('/update-product/:id',verifyToken,async(req,res)=>{
  let result = await Products.updateOne({_id:req.params.id},{$set:req.body});
  if(result)
    res.send(result);
  else
    res.send({result:"No result Found"})
})

app.get('/search/:key',verifyToken,async (req,res)=>{
  const result = await Products.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
    ]
  })

  res.send(result);

})

function verifyToken(req,res,next){
  let token = req.headers['authorization']
  if(token){
    token = token.split(" ")[1];
    console.warn('middleware called',token)
    Jwt.verify(token , jwtkey , (err,vaild)=>{
      if(err){
        res.status(401).send({result:"Please provide valid token"})

      }
      else{
        next();
      }
    })
  }
  else{
    res.status(403).send({result:"please add token with header"})
  }
  
 
}

app.listen(5000);
