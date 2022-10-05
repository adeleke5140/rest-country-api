import React, {useState} from 'react'
import lightMode from '/src/images/light_mode_FILL0_wght400_GRAD0_opsz48.png'
import darkMode from '/src/images/dark_mode_FILL0_wght400_GRAD0_opsz48.png'

function Top({theme, setTheme, imageTheme, setImageTheme}) {
    const [lightThemeBtn, setlightThemeBtn] = useState(true)
    const [darkThemeBtn, setdarkThemeBtn] =useState(false)

    const darkToggle =()=>{
        setTheme(!theme)
       setlightThemeBtn(true)
       setdarkThemeBtn(false)
       setImageTheme(!imageTheme)
    }

    const lightToggle =()=>{
        setTheme(!theme)
       setlightThemeBtn(false)
       setdarkThemeBtn(true)
       setImageTheme(!imageTheme)
    }


  return (
    <>
      <div id="top"  className={theme ? 'dark-mode' : 'light-mode' } >
        <h3>Where in the world?</h3>

       {darkThemeBtn && (
         <div onClick={darkToggle} className="light">
         <img src={darkMode} alt='DarkMode image' /> 
              <p>Dark Mode</p>
           </div>
       )}
         
         {lightThemeBtn &&(
            <div onClick={lightToggle} className="dark">
            <img src={lightMode} alt='lightMode image' />      
               <p>Light Mode</p>      
            </div>
         )}

     </div>
    </>
  )
}

export default Top
