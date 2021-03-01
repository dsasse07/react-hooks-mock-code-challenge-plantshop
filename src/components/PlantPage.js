import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")
  const API = "http://localhost:6001/plants"

  function handleNewPlant(plantData){
    const postConfig = {
      method:"POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify( plantData )
    }

    fetch(API, postConfig)
      .then( response => response.json() )
      .then( newPlantData => {
        setPlants([...plants, newPlantData])
      })
  }

  useEffect( () => {
    fetch(API)
      .then( response => response.json() )
      .then( plantData =>{
        const plants = plantData.map( plant => {
          return {...plant, inStock: true}
        })
        setPlants(plants)
      } )
  }, [])

  function handleStockToggle(id){
    const updatedPlants = plants.map( plant => {
      if (plant.id !== id) return plant
      return {...plant, inStock: !plant.inStock}
    })
    setPlants(updatedPlants)
  }


  function handleSearchChange(query){
    setSearch(query)
  }

  function handleDeletePlant(id){
    fetch(`${API}/${id}`, {method: "DELETE"})
      .then( () => {
        const updatedPlants = plants.filter(plant => {
          return plant.id !==id
        })
        setPlants(updatedPlants)
      })
  }

  function handleChangePrice({id, price}){

    const patchConfig = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify( {price: price} ) 
    }

    fetch(`${API}/${id}`, patchConfig)
    .then( response => response.json() )
    .then( updatedPlant => {
      const updatedPlants = plants.map( plant => {
        if (plant.id !== updatedPlant.id) return plant
        return {...plant, price: updatedPlant.price}
      })
      setPlants(updatedPlants)
    })
  }

  const filteredPlants = plants.filter(plant => {
    return plant.name.toLowerCase().includes( search.toLowerCase() )
  })

  return (
    <main>
      <NewPlantForm onNewPlantSubmit={handleNewPlant}/>
      <Search search={search} onSearchChange={handleSearchChange}/>
      <PlantList 
        plants={filteredPlants} 
        onStockToggle={handleStockToggle}
        onDeletePlant={handleDeletePlant} 
        onChangePrice={handleChangePrice}
      />
    </main>
  );
}

export default PlantPage;
