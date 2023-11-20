
import "../style/DarkMode.css";
import { useDispatch, useSelector, } from "react-redux";
import { toggleDarkMode,  } from "../store/slices/darkMode";

const DarkMode = () => {

const dispatch = useDispatch()
const isDarkMode = useSelector((reducers) => reducers.darkMode);

 


  return (
    <div  className={isDarkMode? "container__darkmodeDark ":"container__darkmode"}>
      <header className={isDarkMode ?"headerDark":"headerr"}>
        <h1>Where in the Word?</h1>
        <p onClick={() => dispatch(toggleDarkMode())}>
          <i className={isDarkMode ? "bx bx-sm bx-sun":"bx bx-sm bx-moon"}></i>Dark Mode
        </p>
      </header>
    </div>
  );
};

export default DarkMode;
