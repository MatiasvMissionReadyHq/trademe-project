
import React, { useState } from 'react';
import styles from './index.module.css';

function ItemsListing() {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        {
            id: 1,
            photos: [
                "b2e9dfe4-2062-49f5-847d-0b585695ec7f.jpg",
                "f0e5becd-c31f-4fef-8046-01d27b17f5b8.jpg"
            ],
            title: "Kawasaki Ninja ZX-6R",
            location: "Auckland, New Zealand",
            engine: "636cc",
            price: "$12,000",
            offer: "Or Near Offer"
        },
        {
            id: 2,
            photos: [
                "2022_YZF-R1_DPBMC_AUS_STA_001_1280x960.jpg",
                "pack-front-led-turn-signal-for-yamaha-yzf-r1-1000-2004-2006-_38556.jpg"
            ],
            title: "Yamaha YZF-R1",
            location: "Wellington, New Zealand",
            engine: "998cc",
            price: "$15,000",
            offer: "Or Near Offer"
        }
    ];

    const handleNext= () => {

        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        setActiveIndex((prevIndex) => prevIndex + 1);

        
    };
    
    const handlePrev = () => {
        setActiveIndex((prevIndex) => prevIndex - 1);
    };



    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.carousel}>
                    <img
                        src="b2e9dfe4-2062-49f5-847d-0b585695ec7f.jpg"
                        alt="Motorbike Image 1"
                        className={`${styles['carousel-img']} ${
                            activeIndex === 0 ? styles.active : ''
                        }`}
                    />
                    <img
                        src="f0e5becd-c31f-4fef-8046-01d27b17f5b8.jpg"
                        alt="Motorbike Image 2"
                        className={`${styles['carousel-img']} ${
                            activeIndex === 1 ? styles.active : ''
                        }`}
                    />
                    <div className={styles['carousel-controls']}>
                        <span className={styles.prev} onClick={handlePrev}>
                            ‹
                        </span>
                        <span className={styles.next} onClick={handleNext}>
                            ›
                        </span>
                    </div>
                </div>
                <div className={styles['card-details']}>
                    <h2>Kawasaki Ninja ZX-6R</h2>
                    <p className={styles.location}>Location: Auckland, New Zealand</p>
                    <p className={styles.engine}>Engine: 636cc</p>
                    <p className={styles.price}>
                        Current Bid: $12,000 <span className={styles.offer}>Or Near Offer</span>
                    </p>
                </div>
                <div className={styles['card-footer']}>
                    <label className={styles['compare-label']}>
                        <input type="checkbox" className={styles['compare-checkbox']} /> Compare
                    </label>
                    <button className={styles['bid-now-btn']}>Bid Now</button>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.carousel}>
                    <img
                        src="2022_YZF-R1_DPBMC_AUS_STA_001_1280x960.jpg"
                        alt="Motorbike Image 1"
                        className={`${styles['carousel-img']} ${
                            activeIndex === 0 ? styles.active : ''
                        }`}
                    />
                    <img
                        src="pack-front-led-turn-signal-for-yamaha-yzf-r1-1000-2004-2006-_38556.jpg"
                        alt="Motorbike Image 2"
                        className={`${styles['carousel-img']} ${
                            activeIndex === 1 ? styles.active : ''
                        }`}
                    />
                    <div className={styles['carousel-controls']}>
                        <span className={styles.prev} onClick={handlePrev}>
                            ‹
                        </span>
                        <span className={styles.next} onClick={handleNext}>
                            ›
                        </span>
                    </div>
                </div>
                <div className={styles['card-details']}>
                    <h2>Yamaha YZF-R1</h2>
                    <p className={styles.location}>Location: Wellington, New Zealand</p>
                    <p className={styles.engine}>Engine: 998cc</p>
                    <p className={styles.price}>
                        Current Bid: $15,000 <span className={styles.offer}>Or Near Offer</span>
                    </p>
                </div>
                <div className={styles['card-footer']}>
                    <label className={styles['compare-label']}>
                        <input type="checkbox" className={styles['compare-checkbox']} /> Compare
                    </label>
                    <button className={styles['bid-now-btn']}>Bid Now</button>
                </div>
            </div>
        </div>
    );
}
export default ItemsListing;
        