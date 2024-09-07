import { useState, useEffect } from 'react'
import './App.css'
import  ItemsListing  from './components/listItems/ItemsListing';
import PostDetail from './components/postDetails/PostDetail';
import CustomSelect from './components/customSelect/CustomSelect';
import { Routes, Route, useLocation } from "react-router-dom";

function App() {

  const [items, setItems] = useState([]);
  const location = useLocation();
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [filerType, setFilterType] = useState([]);

  /***********States and function to handle the select dropdown***********/
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  //end of select dropdown//

  useEffect(() => {
    // Extract unique categories from the items array
    const uniqueCategories = [...new Set(items
      .map(item => item.type)  // Get category field
      .filter(category => category !== undefined && category !== '')  // Filter out undefined or empty categories
    )];
    setDistinctCategories(uniqueCategories);
    setFilterType(items);

  }, [items]);

  useEffect(() => {

    if(selectedOption === 'all'){
      setFilterType(items);
      return;
    }
    const filteredItems = items.filter(item => item.type === selectedOption);
    setFilterType(filteredItems);
  }, [selectedOption]);

  useEffect(() => {
    if(location.pathname === "/"){
      fetchAllData();
    }
  }, [])


  // Fetch to the backend to get the response from the AI
  async function fetchAllData(){

      const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          }
      }

      try{
          const response = await fetch('http://localhost:3000/getItems', options)
          const data = await response.json()
          setItems(data);
          //console.log(data)
          
      }
      catch(error){
          console.log(error)
      }
  }

  return (
    <>
      {location.pathname=='/' 
      ? <CustomSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} isOpen={isOpen} setIsOpen={setIsOpen} options={distinctCategories}/>
    :null}
      
      <Routes>
        <Route path="/" element={<ItemsListing items={filerType}/>}/>
        <Route path="/postDetail/:id" element={<PostDetail />} />
      </Routes>
    </>
  )
} 

export default App
