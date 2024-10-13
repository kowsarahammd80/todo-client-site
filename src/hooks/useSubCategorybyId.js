import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

const useSubCategorybyId = (_id) => {
    // const {_id} = useParams()
    const [idBySubCategoryData, setIdBySubCategoryData] = useState({}) 
    // console.log(idBySubCategoryData)
    const [loading, setLoading] = useState(false)
    // console.log(idByCategoryData)
    useEffect(()=> {
        fetch(`http://localhost:5000/api/subCategory/${_id}`)
        .then(result => result.json())
        .then(data => { setIdBySubCategoryData(data); setLoading(false);  })
    }, [])
    return {idBySubCategoryData, loading}
    
};

export default useSubCategorybyId;
