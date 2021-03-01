import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onStockToggle, onDeletePlant, onChangePrice }) {

  const plantComponents = plants.map( plant => {
    return (
      <PlantCard 
        key={plant.id} 
        plant={plant} 
        onStockToggle={onStockToggle}
        onChangePrice={onChangePrice}
        onDeletePlant={onDeletePlant}
      />
    )
  })

  return (
    <ul className="cards">{plantComponents}</ul>
  );
}

export default PlantList;
