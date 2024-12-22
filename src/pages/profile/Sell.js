import React, { useState,useEffect } from "react";

const handleClick =async(blockchainId,togglePop)=>{
  const response = await fetch('https://backend-gamma-silk.vercel.app/api/user/getproduct', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "blockchainId":blockchainId })
  })
  const prod = await response.json()
  togglePop(prod.prods)
}

const TableRow = ({ product,togglePop,index}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{product.uname}</td>
      <td>{product.des}</td>
      {/* <td>{product.date}</td> */}
      <td>{product.price}</td>
      <td><button onClick={() => handleClick(product.blockchainId,togglePop)}>View</button></td>
    </tr>
  );
};


const Sell = ({togglePop,user}) => {
  const [products,setProducts]=useState([])
  useEffect(() => {
    try {
      const products =user.listing
      setProducts(products)
    } catch (error) {
      console.log(error)
    }
  }, [user]);
  return (
    <div>
      <section class="attendance">
        <div class="attendance-list">
          <h1>Listed Products</h1>
          <table class="table">
          <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        {/* <th>Date</th> */}
        <th>Start Price</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product,index) => (
        <TableRow key={index} product={product} togglePop={togglePop} index={index+1}/>
      ))}
    </tbody>
    </table>
        </div>
      </section>
    </div>
  );
};

export default Sell;