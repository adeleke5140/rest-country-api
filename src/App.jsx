import { useState } from "react";
import useLocalStorage from "./Hooks/useLocalStorage";
import "./App.css";
import Countries from "./components/Countries";
import CountryInfo from "./components/CountryInfo";
import Filters from "./components/Filters";
import Top from "./components/Top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useLocalStorage("time", false);
  const [searchCountry, setSearchCountry] = useLocalStorage("date", "");
  const [query, SetQuery] = useState([]);
  const [imageTheme, setImageTheme] = useLocalStorage("theme", true);

  return (
    <div className="App">
      <Top
        theme={theme}
        setTheme={setTheme}
        imageTheme={imageTheme}
        setImageTheme={setImageTheme}
      />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filters
                  theme={theme}
                  setTheme={setTheme}
                  searchCountry={searchCountry}
                  setSearchCountry={setSearchCountry}
                />
                <Countries
                  theme={theme}
                  setTheme={setTheme}
                  searchCountry={searchCountry}
                  query={query}
                  SetQuery={SetQuery}
                />
              </>
            }
          />

          <Route
            path="/info/:slug"
            element={
              <CountryInfo
                theme={theme}
                imageTheme={imageTheme}
                setImageTheme={setImageTheme}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
