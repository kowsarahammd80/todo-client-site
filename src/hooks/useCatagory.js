import { useEffect, useState } from 'react';

const useCatagory = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const [refetchData, setreFacthData] = useState(false)
    
    useEffect(() => {
        fetch("http://localhost:5000/api/category")
            .then(result => result.json())
            .then(data => { setCategories(data.data); setLoading(false) })
            
    }, [refetchData]);

    const refetch = () => setreFacthData((prevState) => !prevState);

   
    return [categories, loading, refetch]
};

export default useCatagory;