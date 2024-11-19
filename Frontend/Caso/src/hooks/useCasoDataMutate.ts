import axios, { AxiosPromise } from "axios"
import { CasoData } from "../interface/CasoData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "../hooks/useCasoData"
const API_URL = 'http://localhost:8080'

const postData = async (data : CasoData) : AxiosPromise<any> => {

    const response = axios.post(API_URL + '/caso', data);
    return response;
}


export function useCasoDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn : postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['caso-data']}); // A chave deve ser a mesma usada no useQuery
        },
        onError: (error) => {
            console.error('Erro ao enviar os dados:', error);
        },
    })

    
     
    return mutate;



}






