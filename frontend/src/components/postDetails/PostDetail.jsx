// PostDetail.js
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ItemsListing from "../listItems/ItemsListing";
import styles from "./postDetail.module.css";

function PostDetail(props) {
    const { id } = useParams();  // Get the post ID from the URL params
    const {itemsIds, setItemsId, fetchAllData} = props;

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
            const data = await response.json();
            setItems([data]);
            //console.log(data)
            
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <ItemsListing items={items} itemsIds={itemsIds} setItemsId={setItemsId} fetchAllData={fetchDataById} styleSingleItem={styles}/>
        </>
    );
}

export default PostDetail;