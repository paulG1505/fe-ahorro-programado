import {useState,useEffect} from 'react'
import { getParametric } from '../api'

const useFetchAPF = () => {
    const [apf, setApf] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const loadApf = async () => {
        const data = await getParametric();
        const resp = await data[0]
        setApf({ id: resp.id, duracion: resp.dur_plan_min, mma: resp.mont_min_apert, tasa_min: resp.tasa_int_min, tasa_base: resp.tasa_int_base, tasa_max: resp.tasa_int_max });
        setIsLoading(false)
    }
    useEffect(() => {
        loadApf();
    }, [])

    return {
        apf,
        isLoading
    }
  
}

export default useFetchAPF