import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './index.module.css';
import Carousel from './components/Carousel';


function ItemsListing(props) {


    const [itemsIds, setItemsId] = useState([]);

    const items = props.items;

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
        console.log(itemsIds);
    },[itemsIds])

    return (
        <>
            <div className={styles.container}>
                {items.map((item, i) => {
                    return (
                        <div className={styles.card} key={item._id}>
                            <div className={styles.carousel}>
                                <Carousel photos={item.photos} />
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
                                <label className={styles['compare-label']}>
                                    <input
                                        type="checkbox"
                                        className={styles['compare-checkbox']}
                                        onClick={handleCheckboxChange(item._id)}
                                    />{' '}
                                    Compare
                                </label>
                                <button className={styles['bid-now-btn']}>Bid Now</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default ItemsListing;
        