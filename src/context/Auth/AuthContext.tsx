
import { createContext, ReactNode,  useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Credentials, FuncionarioAuthenticated, getPayload, storeToken } from '../../services/Authenticate'
import { getFuncionario } from '../../services/Funcionario'
import api from '../../services/utils/api'

export let DEFAULT_FUNCIONARIO = {
    jwtToken:'', 
    name: '',
    senha: '',
} as FuncionarioAuthenticated



const storageItem = localStorage.getItem('funcionário')

let recoveredFuncionario:FuncionarioAuthenticated | null;

if(storageItem){
    recoveredFuncionario = JSON.parse(storageItem)
}



export type AuthContextData = {
    login: (data: Credentials) => Promise<FuncionarioAuthenticated | any> ;
    funcionario:FuncionarioAuthenticated;
    authenticated:boolean;
    loading:boolean;
}

export type AuthContextProviderProps = {
     children: ReactNode
}



export const AuthContext= createContext({} as AuthContextData)

export const AuthContextProvider = ({children}: AuthContextProviderProps) =>{

    const [ funcionario, setFuncionario ] = useState<FuncionarioAuthenticated>(!recoveredFuncionario ? DEFAULT_FUNCIONARIO : recoveredFuncionario);
    const [ loading, setLoading ] = useState<boolean>(false)

    const navigate = useNavigate()

    async function login(credentials: Credentials):Promise<FuncionarioAuthenticated | any>{

        setLoading(true)
        
        const {data} = await api.post<FuncionarioAuthenticated>('/funcionarios/signin', credentials)
        if(data){
            storeToken(data.jwtToken)
            console.log(data);
            setFuncionario(data)
            localStorage.setItem('funcionário', JSON.stringify(data))
            setTimeout(()=>{
                if(getPayload()){
                    navigate('/home')
                }
            }, 1000)
        }
        setLoading(false)
    }

     return(
          <AuthContext.Provider value={{ loading ,login, funcionario, authenticated:(!getPayload() ? false : true)}}>
               {children}
          </AuthContext.Provider>
     )

}