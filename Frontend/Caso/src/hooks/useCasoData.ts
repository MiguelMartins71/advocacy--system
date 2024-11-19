import axios, { AxiosPromise } from "axios"
import { CasoData } from "../interface/CasoData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async () : AxiosPromise<CasoData []> => {

    const response = axios.get(API_URL + '/caso')
    return response;
}


export function useCasoData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['caso-data'],
        retry: 2
    });
     
    return {

        ...query,
        data: query.data?.data
    }



}




