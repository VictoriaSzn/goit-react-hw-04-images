import React from "react";
import { useState, useEffect } from "react";
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import Button from "./Button";
import Loader from './Loader';
import { Toaster } from 'react-hot-toast';
import styles from './styles.module.css';

export default function App (){
  const [textSearch, setTextSearch] = useState('')
  const [image, setImage] = useState([])
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
 
  useEffect(() => {
     if (textSearch.trim() === '') {
       return;
     }
    setStatus('pending');
    
    fetch(`https://pixabay.com/api/?q=${textSearch}&page=${page}&key=32852753-8f3b804226363e950fb952518&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => response.json())
          .then(image => {
              if (image.hits.length > 0) {
                setImage(prevState=>[...prevState, ...image.hits]);
                setStatus('resolved')
            }
            else { 
            //Promise.reject(new Error(`On request ${this.state.textSearch} nothing found!`),);
              alert(`On request ${textSearch} nothing found!`);
              setStatus('idle');
            return;
          }
            })
      .catch(error => {
        setError(error)
        setStatus('rejected')
      })
  },[textSearch, page])
    
  const handleFormSubmit = value => {
    if (value !== textSearch) {
      setTextSearch(value)
      setPage(1)
      setStatus('pending')
      setImage([])
  }}
 
  const handleLoadMo = () => {
    setPage(state => state + 1)
    setStatus('pending')
    }
 
    if (status === 'idle') {
      return (
        <div className={styles.App} >
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2000,
            }}
          />
          <Searchbar onSubmitProps={handleFormSubmit}  />
          </div>
      )
    }
             
      if (status === 'rejected') {
        return (
          <>
            <Searchbar onSubmitProps={handleFormSubmit} />
            <h1>{error.message}</h1>
          </>
        )
      }

      if (status === 'pending') {
        return (
          <>
            <Searchbar onSubmitProps={handleFormSubmit} />
              {image.length > 0 && <ImageGallery image={image} />} 
            <Loader />
          </>
        )
      }

      if (status === 'resolved') { 
        return (
          <>
          <Searchbar onSubmitProps={handleFormSubmit}  />
          <ImageGallery image={image}  />
          <Button onClick={handleLoadMo}/>
         </>
      )  
      }
  
 };
 