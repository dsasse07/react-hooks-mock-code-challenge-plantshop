import React, { useState } from "react";

function PlantCard({ plant, onStockToggle, onDeletePlant, onChangePrice }) {

  const { id, name, image, price, inStock } = plant
  const [newPrice, setNewPrice] = useState(price)

  function handleStockToggle(){
    onStockToggle(id)
  }

  function handleDeletePlant(){
    onDeletePlant(id)
  }

  function handlePriceChange(event){
    setNewPrice(event.target.value)
  }

  function submitPriceChange(event){
    event.preventDefault()
    onChangePrice({id, price: parseInt(newPrice) })
    event.target.value=""
  }

  return (
    <li className="card">
      <img src={image ? image : "https://via.placeholder.com/400"} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleStockToggle}>In Stock</button>
      ) : (
        <button onClick={handleStockToggle} >Out of Stock</button>
      )}
      <button onClick={handleDeletePlant} > Remove </button>
      <form onSubmit={submitPriceChange}>
        <label>
          Update Price
          <input type="number" name="price" step="0.01" placeholder="Update Price" value={newPrice} onChange={handlePriceChange}/>
        </label>
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
