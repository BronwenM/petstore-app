import "./styles.css";
import { useEffect, useState, useContext } from "react";
import { PetItem } from "../../PetItem";
import PetsOrderContext from "../../../context/petsOrderContext";
import { Search } from "../../Search";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useHistory } from "react-router";

export const PetsHomePage = () => {
  
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(true);

  const globalState = useContext(PetsOrderContext);

  const history = useHistory();

  //check if current user is logged in
  useEffect(
    () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if(!user){
          history.push("/login");
        }
      });
    }, []
  )

  useEffect(
    () => {
      getPets();
    }, []
  )

  useEffect(
    () => {
      handleSearchByBreed();
    }, [searchString]
  )

  const handleSearchByBreed = () => {
    
    //if search string was empty don't filter and show all pets
    if(searchString === ''){
      setFilteredPets(pets);
      return;
    }

    //filter
    const petsFiltered = pets.filter(
      (pet) => {
        const breed = pet.breed.stringValue.toLowerCase();
        const isMatch = breed.indexOf(searchString.trim().toLowerCase());

        return isMatch !== -1;
      }
    );
    console.log(petsFiltered);
    setFilteredPets(petsFiltered);
  }

  const getPets = async() => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();
      console.log(data);

      const formattedData = data.documents.map( (item) => {
        return item.fields;
      });
      
      console.log(formattedData);
      
      setPets(formattedData);
      setFilteredPets(formattedData);
      globalState.initializePets(formattedData);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const handleSearchUpdate = (event) => {
    setSearchString(event.target.value);
  }

  return (
    <div className="pets-page">
      <h1 className="pets-title">All Pets</h1>
      <Search handleSearchUpdate={handleSearchUpdate}/>
      <div className="pets-container">
          {
            filteredPets.map( (pet) => <PetItem image={pet.image.stringValue} name={pet.name.stringValue} breed={pet.breed.stringValue} age={pet.age.stringValue} type={pet.petType.stringValue} id={pet.id.stringValue} />)
          }

          {
            !loading && filteredPets.length === 0 && <p>Nothing found for {searchString}!</p>
          }
          {
            loading && <p>Loading Data...</p>
          }
      </div>
    </div>
  );
};