import  { useState, useEffect } from "react";
import styles from "./compareItemsButton.module.css";
import { useNavigate } from "react-router-dom"; 

const CompareItemsButton = ({itemsIds})=>{

    const navigate = useNavigate();
    
    const handleCompareItems = () => {

        if(itemsIds.length < 2){
            alert('Please select at least two items to compare');
            return;
        }

        navigate('/compareItems');

    }

    return(     
        <button className={styles['compare-items-btn']} onClick={handleCompareItems}>Compare Items</button>
    )
}


export default CompareItemsButton;