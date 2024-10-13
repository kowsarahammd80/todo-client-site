import React, { useEffect, useState } from 'react';

const useHomeHeroAll = () => {
    
    const [homeHeroData, setHomeHeroData] = useState([])
    const [loading, setLoading] = useState(false)
    const [refetchData, setreFacthData] = useState(true)

   useEffect(() => {
    fetch(`http://localhost:5000/api/home-hero`)
    .then((result) => result.json())
    .then((data) => setHomeHeroData(data.data), setLoading(false))
    .catch((error) => error )

   }, [refetchData])

   const refetch = () => setreFacthData((prevState) => !prevState);

   return[homeHeroData, loading, refetch]
};

export default useHomeHeroAll;