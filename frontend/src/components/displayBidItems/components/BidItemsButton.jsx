import styles from "./bidItemsButton.module.css";
import { useNavigate } from "react-router-dom"; 

const BidItemsButton = (props)=>{

    const navigate = useNavigate();

    const handleCompareItems = () => {
        navigate('/bidItems');
    }
    return(     
        <button className={styles['bid-items-btn']} onClick={handleCompareItems}>Display Bids</button>
    )
}


export default BidItemsButton;