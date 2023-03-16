import { useState } from "react";
import styles from './styles.module.css';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmitProps}) {
    const [value, setValue]= useState('')
    // state = {
    //     value: ''     
    // }
   const handleChange = evt => {
        setValue(evt.target.value);
    }

   const handleSubmit = evt => {
       evt.preventDefault();
       
        if (value.trim() === '') {
            return toast.error('your request is empty')
        }
        onSubmitProps(value.trim());
        setValue('');
    }
        return (
             <header className={styles.Searchbar} >
                <form onSubmit={handleSubmit} className={styles.SearchForm}>
                    <input
                        className={styles.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                         placeholder="Search images and photos"
                         value={value}
                         onChange={handleChange}
                     />
                      <button type="submit" className={styles.SearchForm_button}>
                        <ImSearch style = {{marginRight: 8}}/>
                     </button>
                </form>
            </header>
        )
    
};
Searchbar.propTypes = {
  onSubmitProps: PropTypes.func.isRequired,

};
