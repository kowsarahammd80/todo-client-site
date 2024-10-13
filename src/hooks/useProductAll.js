import React, { useEffect, useState } from 'react';

const useProductAll = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [refetchData, setreFacthData] = useState(false)
    
    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then(result => result.json())
            .then(data => { setProducts(data.data); setLoading(false) })
    }, [refetchData]);

    const refetch = () => setreFacthData((prevState) => !prevState);
    
    return [products, loading, refetch]
};

export default useProductAll;