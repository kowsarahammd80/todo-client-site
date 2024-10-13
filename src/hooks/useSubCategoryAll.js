import React, { useEffect, useState } from 'react';

const useSubCategoryAll = () => {
    const [subCategories, setSubCategories] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("http://localhost:5000/api/subCategory")
            .then(result => result.json())
            .then(data => { setSubCategories(data.data); setLoading(false) })
    }, []);
    
    return [subCategories, loading]
};

export default useSubCategoryAll;