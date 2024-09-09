import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import style from './displayBidItems.module.css';
import Carousel from '../listItems/components/Carousel';


function DisplayBidItems({items, itemsIds, setItemsId, fetchAllData, styleSingleItem}) {


    // const {itemsIds, setItemsId, items, fetchAllData} = props;
    const styles = typeof(styleSingleItem)!=='undefined' ? styleSingleItem : style;

    const location = useLocation();
    const [itemUpdated, setItemUpdated] = useState(false);
    const handleCheckboxChange = (idRemove) => {

        return (event) => {
            if (event.target.checked && !itemsIds.includes(idRemove)) {
                setItemsId([...itemsIds,idRemove]);
            }else{
                setItemsId(prevIds => prevIds.filter(id => id !== idRemove));
            }
        };
        
    }

    useEffect(() => {  
        
        fetchAllData();
    },[itemUpdated])

    // Function to handle the bid update on mondoDB
    const handleBidUpdate = (id, userBid) => {
        return () => {

            if(userBid === true){
                return confirm('Are you sure you want to remove your bid?') &&
                updateBidById(id);
            }
            confirm('Are you sure you want to bid on this item?') &&
            updateBidById(id);
        }  
    }

    const updateBidById = async (itemId) => {

        try {
            const response = await fetch(`http://localhost:3000/updateBid/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            const data = await response.json();
            alert(data.message); // Display success message
            setItemUpdated(!itemUpdated); // Update the state to re-render the component
            
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                {items.map((item, i) => {
                    if(item.userBid === true)
                    return (
                        <div className={styles.card} key={item._id}>
                            <div className={styles.carousel}>
                                {typeof(item.photos)!=='undefined' ? <Carousel photos={item.photos}/> : null}
                            </div>
                            <div className={styles['card-details']}>
                                <h5>
                                    <Link to={`/postDetail/${item._id}`} style={{fontSize: '15px'}}>
                                        {item.make} {item.model}
                                    </Link>
                                </h5>
                                <p className={styles.location}><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>Location:</span> {item.location}</p>
                                <p className={styles.engine}><span style={{ fontWeight: 'bold', fontSize: '15px'}}>Engine:</span> {item.engine}</p>
                                <p className={styles.year}><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>Year:</span> {item.year}</p>
                                <p className={styles.price}>
                                    Current Bid: {item.currentBid}{' '}
                                    <span className={styles.offer}>Or Near Offer</span>
                                </p>
                            </div>
                            <div className={styles['card-footer']}>
                            {location.pathname ==='/' 
                                    ?
                                <label className={styles['compare-label']}>
                                    <input
                                        type="checkbox"
                                        className={styles['compare-checkbox']}
                                        checked={itemsIds.includes(item._id) ? true : false} 
                                        onClick={handleCheckboxChange(item._id)}
                                    />{' '}
                                
                                    Compare
                                </label>
                                :null}
                                <button className={styles['bid-now-btn']} onClick={handleBidUpdate(item._id, item.userBid)}>{item.userBid ===true ? 'Remove Bid' : 'Bid Now'}</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}       

export default DisplayBidItems;