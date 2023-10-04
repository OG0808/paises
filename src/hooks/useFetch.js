import axios from "axios";
import {useState} from 'react'



const useFecth = (url) => {

  const [infoApi, setInfoApi] = useState();

  const getApi = () => {
    axios
      .get(url)
      .then((response) => setInfoApi(response.data))
      .catch((error) => console.log(error));
  };
  return [infoApi, getApi]
};

export default useFecth;