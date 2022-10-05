import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import arrowBack from '/src/images/arrow_back_FILL0_wght400_GRAD0_opsz48.png'

function CountryInfo() {
   const navigate = useNavigate();


  let {population, region, common,  capital, subregion } = useParams();

  
  

  return (
    <>
   
 
     
   <div className='go-back' onClick={()=> navigate(-1)}>
    <img src={arrowBack} alt=""  className='imageLight-mode'/>
    <h3>Back</h3>
     </div>


<div id="Country-info">

  {/* <img src={flag} alt="" /> */}

<h2>{common}</h2>

<div id="first-part">
  
<h4>Native Name: </h4>
<h4> Population: <span>{population}</span> </h4>
<h4> Region: <span>{region}</span> </h4>
<h4>Sub Region: <span>{subregion}</span> </h4>
<h4> Capital: <span>{capital}</span> </h4>

</div>

<div id="second-part">

  <h4>Top Level Domain:</h4>
  <h4>Currencies:</h4>
  <h4>Languages:</h4>

</div>

<div id="border-countries">
  <h3>Border Countries:</h3>

<div className="borders">
  <div>Country1</div>
  <div>Country2</div>
  <div>Country3</div>
</div>

</div>

</div>



    </>
  )
}

export default CountryInfo
