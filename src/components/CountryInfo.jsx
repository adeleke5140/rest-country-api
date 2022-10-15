import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import arrowBack from "/src/images/arrow_back_FILL0_wght400_GRAD0_opsz48.png";
import { motion } from "framer-motion";
import loading from "/src/images/loading.png";
import { imageVariant } from "./Countries";

function CountryInfo() {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { slug } = useParams();
  //make another API Call

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${slug}`)
      .then((res) => res.data)
      .then((data) => {
        let country = data;
        setCountry(country);
        console.log(country, Object.values(country[0].currencies)[0].name);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <motion.img
        variants={imageVariant}
        animate="loading"
        src={loading}
        className="loading-img"
        alt="loadingImg"
      />
    );
  }

  return (
    <>
      <div className="go-back" onClick={() => navigate(-1)}>
        <img src={arrowBack} alt="" className="imageLight-mode" />
        <p>Back</p>
      </div>

      <div>
        <div id="Country-info">
          <img src={country[0]?.flags.svg} alt="" width="240px" />
          <section id="first-part">
            <h4>
              Native Name{" "}
              {Object.values(country[0].name.nativeName)[0].official}
              <span>
                {
                  // country.name.nativeName.official
                }{" "}
              </span>{" "}
            </h4>
            <h4>
              {" "}
              Population: <span>{country[0]?.population}</span>{" "}
            </h4>
            <h4>
              {" "}
              Region: <span>{country[0]?.region} </span>{" "}
            </h4>
            <h4>
              Sub Region: <span> {country[0]?.subregion}</span>{" "}
            </h4>
            <h4>
              {" "}
              Capital: <span>{country[0]?.capital[0]}</span>{" "}
            </h4>
          </section>

          <section id="second-part">
            <h4>Top Level Domain: {country[0].tld[0]}</h4>
            <h4>Currencies: {Object.values(country[0].currencies)[0].name}</h4>
            <h4>Languages: {Object.values(country[0].languages)[0]}</h4>
          </section>

          <section id="border-countries">
            <p>Border Countries:</p>
            <ul className="borders">
              {
                country[0].borders ? (
                  country[0].borders.map(border => <li>
                    { border}
                  </li>)
                ): ( <p>No borders</p>)
              }
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default CountryInfo;
