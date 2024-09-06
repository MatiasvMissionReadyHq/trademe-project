import { useState, useEffect } from 'react'
import './App.css'
import  ItemsListing  from './components/listItems/ItemsListing';
import PostDetail from './components/postDetails/PostDetail';
import { Routes, Route, useLocation } from "react-router-dom";

function App() {

  const [items, setItems] = useState([]);
  const location = useLocation();
  
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
      <Routes>
        <Route path="/" element={<ItemsListing items={items}/>}/>
        <Route path="/postDetail/:id" element={<PostDetail />} />;
      </Routes>
    </>
  )
} 

export default App
