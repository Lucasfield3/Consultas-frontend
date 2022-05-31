import { createContext, ReactNode, useState } from 'react'
import { getToken } from '../../services/Authenticate';
import { createPaciente, Paciente } from '../../services/Pacientes'
import api from '../../services/utils/api';

type PacienteContextData = {
    registerPaciente: (data: Paciente) => Promise<Paciente | any>;
    pacientes: Paciente[];
    getAllPacientes: () => Promise<Paciente[] | any>;
}

type PacienteContextProviderProps = {
    children: ReactNode
}

export const PacienteContext = createContext({} as PacienteContextData)

export const PacienteContextProvider = ({ children }: PacienteContextProviderProps) => {
    const [pacientes, setPacientes] = useState<Paciente[]>([])

    async function registerPaciente(data: Paciente): Promise<Paciente | any> {
        const response = await createPaciente(data)
        const paciente = response.data as Paciente

        if (paciente) {
            console.log(paciente);
            alert('Paciente registrado.')
        }
    }

    async function getAllPacientes(): Promise<Paciente[] | any> {
        try {
            if (getToken()) {
                const { data } = await api.get<Paciente[]>('/pacientes')
                setPacientes(data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <PacienteContext.Provider value={{ getAllPacientes, registerPaciente, pacientes }}>
            {children}
        </PacienteContext.Provider>
    )

}