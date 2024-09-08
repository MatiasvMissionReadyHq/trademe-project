const CompareItemsComponent = (props) => {

    const {items, itemsIds} = props; 
    
    return(
        <>
            {items.map((item, i) => {
                if(itemsIds.includes(item._id)){
                    return (
                        <div key={item._id}>
                            <p>{item.make} {item.model}</p>
                            <p>Location: {item.location}</p>
                            <p>Engine: {item.engine}</p>
                            <p>Year: {item.year}</p>
                            <p>Current Bid: {item.currentBid}</p>
                        </div>
                    );
                }    
            })}
        </>    
    )
}

export default CompareItemsComponent;