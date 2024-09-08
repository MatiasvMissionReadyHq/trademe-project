import React, { useState } from "react";
import styles from "./compareItemsButton.module.css";
import { useNavigate } from "react-router-dom"; 

const CompareItemsButton = (props)=>{

    const {itemsIds} = props;
    const navigate = useNavigate();
    
    const handleCompareItems = () => {

        if(itemsIds.length < 2){
            alert('Please select at least two items to compare');
            return;
        }

        navigate('/compareItems');

    }
    return(     
        <button className={styles['compare-items-btn']} on onClick={handleCompareItems}>Compare Items</button>
    )
}


export default CompareItemsButton;