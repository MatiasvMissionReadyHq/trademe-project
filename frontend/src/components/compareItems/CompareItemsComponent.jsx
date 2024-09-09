import React, { useEffect } from 'react';
import styles from './CompareItemsComponent.module.css';
const CompareItemsComponent = (props) => {

    const {items, itemsIds} = props; 
    
    
    return(
        <div className={styles.container}>
            {items.map((item, i) => {
                if(itemsIds.includes(item._id)){
                    return (
                        <div className={styles.card} key={item._id}>
                            <div className={styles['card-details']}>
                                <h3>{item.make} {item.model}</h3>
                                <p><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>Location:</span> {item.location}</p>
                                <p><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>Engine:</span> {item.engine}</p>
                                <p><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>Year:</span> {item.year}</p>
                                <p><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>gearbox:</span>{item.gearbox}</p>
                                <p><span style={{ fontWeight: 'bold' , fontSize: '15px'}}>Current Bid:</span>{item.currentBid}</p>
                            </div>    
                        </div>
                    );
                }    
            })}
        </div>    
    )
}

export default CompareItemsComponent;