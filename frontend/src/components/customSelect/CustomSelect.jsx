import React, { useEffect, useState } from 'react';
// import './CustomSelect.css'; // Import the CSS file for styling
import styles from './CustomSelect.module.css';

const CustomSelect = (props) => {
    
    const { selectedOption, setSelectedOption, isOpen, setIsOpen, options, setItemsId } = props;

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        setItemsId([])
    }, [selectedOption]);

    return (
        
        <div className={styles['custom-select-container']}>
            <div className={`${styles['custom-select']}  `} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles['custom-select']}>
                    {selectedOption ? selectedOption : 'Select a category'}
                </div>
                <div className={` ${styles['custom-option']} ${isOpen ? styles['open'] : styles['close']}`}>
                    <div key='12344' className={styles['custom-option']} onClick={() => handleSelect('all')}>
                        All Categories
                    </div>
                    {options.map((option, index) => (
                    <div key={index} className={styles['custom-option']} onClick={() => handleSelect(option)}>
                        {option}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;
