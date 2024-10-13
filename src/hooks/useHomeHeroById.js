import { useEffect, useState } from 'react';

const useHomeHeroById = (_id) => {

    const [idByHomeHeroData, setIdByHomeHeroData] = useState({}) 
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        fetch(`http://localhost:5000/api/home-hero/${_id}`)
        .then(result => result.json())
        .then(data => { setIdByHomeHeroData(data); setLoading(false);  })
    }, [])

    return {idByHomeHeroData, loading}

};

export default useHomeHeroById;