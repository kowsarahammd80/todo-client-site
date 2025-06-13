import React, { useEffect, useState } from 'react';

const useRegisterCusmotems = () => {
    const [registecustomers, setRegisCustomes] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/api/users/by-createBy?createBy=client`)
        .then(res => res.json())
        .then(data => {
            setRegisCustomes(data.users)
            setLoading(false)
        })
        .catch((error) => error.massage)
    }, [])
    return [registecustomers, loading]
};

export default useRegisterCusmotems;