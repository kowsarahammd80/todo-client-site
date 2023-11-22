import React, { useEffect, useState } from 'react';

const useRegisterData = () => {

    const [registerDatas, setRegisterData] = useState([])

    const [loading, setLoading] = useState(true)
     
    useEffect(() => {
      
        fetch(`http://localhost:5000/dataGet`)
        .then(res => res.json())
        .then(data => {
            setRegisterData(data)
          setLoading(false)
          console.log(registerDatas)
        })
        .catch(e => console.log(e))

      },[registerDatas])
    
      return [registerDatas, loading];

};

export default useRegisterData;