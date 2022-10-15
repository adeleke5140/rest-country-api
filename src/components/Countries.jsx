import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import loading from "/src/images/loading.png";

export const imageVariant = {
  loading: {
    rotate: [0, 360],
    transition: {
      yoyo: Infinity,
    },
  },
};

function Countries({ theme, searchCountry, query, SetQuery }) {
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((res) => {
        // console.log(res.data)
        // Filtered only the required data from the request
        const transformedData = res.data.map((country) => {
          return {
            name: country?.name?.common,
            population: country?.population,
            subregion: country?.subregion,
            region: country?.region,
            capital: country?.capital?.join(", "),
            tld: country?.tld?.join(", "),
            flags: country?.flags?.png,
            get currencies() {
              let result = [];
              for (let key in country?.currencies) {
                result.push(country?.currencies[key].name);
              }
              return result.join(", ");
            },
            get languages() {
              let result = [];
              for (let key in country?.languages) {
                result.push(country?.languages[key]);
              }
              return result.join(", ");
            },
            get nativeName() {
              let result = [];
              for (let key in country?.name?.nativeName) {
                result.push(country?.name?.nativeName[key].common);
              }
              return result.join(", ");
            },
            get borders() {
              let result = [];
              country.borders?.forEach((item) => {
                res.data?.forEach((x) => {
                  if (x.cca3 === item) {
                    result.push(x.name.common);
                  }
                });
              });
              if (!result || result.length === 0) {
                return `No border country`;
              }
              return result.join(", ");
            },
          };
        });

        SetQuery(transformedData);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isloading) {
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
      <div className="container">
        {query
          .filter((data) => {
            if (searchCountry == "") {
              return data;
            } else if (
              data.name.toLowerCase().includes(searchCountry.toLowerCase())
            ) {
              return data;
            }
          })
          .map((data, index) => (
            <Link to={`/info/${data.name}`}>
              <article key={index}>
                <div>
                  <img src={data.flags} alt={data.name} />

                  <div
                    id="details"
                    className={theme ? "dark-mode" : "light-mode"}
                  >
                    <h3> {data.name} </h3>
                    <p> Population: {data.population} </p>
                    <p> Region: {data.region} </p>
                    <p> Capital: {data.capital} </p>
                    <p> NativeName: {data.borders} </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
      </div>
    </>
  );
}

export default Countries;
