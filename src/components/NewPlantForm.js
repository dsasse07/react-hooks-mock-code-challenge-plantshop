import React, { useState } from "react";

function NewPlantForm({ onNewPlantSubmit }) {

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0.00
  })

  const {name, image, price} = formData

  function handleFormChange(event){
    const key = event.target.name
    const value = event.target.value
    setFormData({...formData, [key]:value })
  }

  function handleSubmitForm(event){
    event.preventDefault()
    if (!name || !image || !price) return
    onNewPlantSubmit({...formData})
    setFormData({
      name: "",
      image: "",
      price: ""
    })
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmitForm}>
        <input type="text" name="name" placeholder="Plant name" value={name} onChange={handleFormChange} />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={handleFormChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={price} onChange={handleFormChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
