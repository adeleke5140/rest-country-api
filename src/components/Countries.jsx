import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import loading from '/src/images/loading.png'


const imageVariant ={
  loading:{
    rotate:[0,360],
    transition:{
      yoyo:Infinity
    }
  }
}


function Countries({theme, searchCountry,query,SetQuery}) {
   const [isloading, setisLoading] = useState(true)
    
    

    

    useEffect(()=>{
     axios.get(`https://restcountries.com/v3.1/all`)
     .then(res => {
      console.log(res.data)
      SetQuery(res.data)
      setisLoading(false)
     })
     .catch(err =>{
      console.log(err)
     })
    },[])

    if (isloading) {
      return <motion.img variants={imageVariant} animate='loading' src={loading} className='loading-img' alt="loadingImg" />
    }


  return (
   <>
   <div className='container'>

     

   
   
    {
        query.filter((data)=>{
          if (searchCountry == ''){
            return data
          }
          else if(data?.name?.common.toLowerCase().includes(searchCountry.toLowerCase())){
            return data
          }
        }).map((data, index) =>  
      <Link to={`/info/${data?.name?.common}/${data.population}/${data.region}/${data.capital}/${data.subregion}`}>
       <article key={index}>
          <div >
          <img src={data?.flags?.png} alt={data?.name?.official}  />
        
      <div id="details"  className={theme ? 'dark-mode' : 'light-mode' }>
           <h3> {data?.name?.common} </h3>
          <p> Population: {data.population} </p>
          <p> Region: {data.region} </p>
          <p> Capital: {data.capital} </p>
      </div>
       
        </div>
       </article>
      </Link>
        )
      }
  
   


</div>
   </>
  )
}

export default Countries
