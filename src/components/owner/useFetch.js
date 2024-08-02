import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/gym/myGym", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        
        setData(res.data);
      } catch (err) {
        console.log(err)
        
      }
    };

    fetchData();
  }, []);

  return { data };
};

export default useFetch;
