import React, { useEffect, useState } from 'react';

const useProductById = (_id) => {

    const [idByProductData, setIdByProductData] = useState({}) 
    const [loadings, setLoading] = useState(false)
    const [refetchData, setreFacthData] = useState(false)
    // console.log(idByCategoryData)
    useEffect(()=> {
        fetch(`http://localhost:5000/api/products/${_id}`)
        .then(result => result.json())
        .then(data => { setIdByProductData(data); setLoading(false);  })
    }, [refetchData])
    const refetch = () => setreFacthData((prevState) => !prevState);
    return {idByProductData, loadings, refetch}

};

export default useProductById;