// PostDetail.js
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ItemsListing from "../listItems/ItemsListing";

function PostDetail() {
    const { id } = useParams();  // Get the post ID from the URL params

    const [items, setItems] = useState([]);

    useEffect(() => {  
        fetchDataById();
        //console.log(id);
    },[id])

    async function fetchDataById(){

        const options = {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
            }
        }

        try{
            const response = await fetch('http://localhost:3000/getItemsById', options)
            const data = await response.json()
            //setItems(data);
            setItems([data]);
            //console.log(data)
            
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <ItemsListing items={items}/>
        </>
    );
}

export default PostDetail;