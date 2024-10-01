import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import  ItemsListing  from './components/listItems/ItemsListing';
import PostDetail from './components/postDetails/PostDetail';
import CustomSelect from './components/customSelect/CustomSelect';
import CompareItemsButton from './components/compareItems/CompareItemsButton';
import CompareItemsComponent from './components/compareItems/CompareItemsComponent';
import BidItemsButton from './components/displayBidItems/components/BidItemsButton';
import DisplayBidItems from './components/displayBidItems/DisplayBidItems';

function App() {

  const [items, setItems] = useState([]);
  const location = useLocation();
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [filerType, setFilterType] = useState([]);
  const [itemsIds, setItemsId] = useState([]);
  const [userBid, setUserBid] = useState(false);

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

    const filteredItems = items.filter(item => item.type === selectedOption);

    //update state if any user bid on any item
    const filteredUserBid = items.filter(item => item.userBid === true);
    if(filteredUserBid.length > 0){
      setUserBid(true);
    }else{
      setUserBid(false);
    }  
    //check if any filter applied before load the cards
    if(filteredItems.length > 0){
      setFilterType(filteredItems);
      return;
    }  
    setFilterType(items);

  }, [items, selectedOption]);

  useEffect(() => {

    if(selectedOption === 'all'){
      setFilterType(items);
      return;
    }
    const filteredItems = items.filter(item => item.type === selectedOption);
    setFilterType(filteredItems);
  }, [selectedOption]);

  useEffect(() => {
    // alert(location.pathname);
    if(location.pathname === "/"){
      fetchAllData();
    }
  }, [])

  useEffect(() => {
    return () => {
      if(items.length < 1){
        fetchAllData();
      }
    };
  }, [location]);

  


  // Fetch to the backend to get the response from the AI

  const fetchAllData = async () => {
  // async function fetchAllData(){

      const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          }
      }

      try{
          const response = await fetch('http://localhost:3000/getItems', options)
          const data = await response.json()
          
          
          if(typeof(data?.insertedIds)!=='undefined'){
            console.log('Data inserted successfully');
            fetchAllData();
            window.location.reload(); 
          }
          setItems(data);
          
      }
      catch(error){
          console.log(error)
      }
  }

  return (
    <>
      {location.pathname ==='/' 
      ? <div className='header-container'>
          <CustomSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} isOpen={isOpen} setIsOpen={setIsOpen} options={distinctCategories} setItemsId={setItemsId}/>
          {filerType.length > 1 && 
            <CompareItemsButton itemsIds={itemsIds}/>
          }
          {userBid === true &&
            <BidItemsButton/>
          }
        </div>
    :null}
      
      <Routes>
        <Route path="/" element={<ItemsListing items={filerType} itemsIds={itemsIds} setItemsId={setItemsId} fetchAllData={fetchAllData}/>}/>
        <Route path="/postDetail/:id" element={<PostDetail itemsIds={itemsIds} setItemsId={setItemsId} fetchAllData={fetchAllData}/>} />
        <Route path="/compareItems" element={<CompareItemsComponent items={items} itemsIds={itemsIds} />} />
        <Route path="/bidItems" element={<DisplayBidItems items={filerType} itemsIds={itemsIds} setItemsId={setItemsId} fetchAllData={fetchAllData}/>} />
      </Routes>
    </>
  )
} 

export default App
