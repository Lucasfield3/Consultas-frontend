
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListaDeConsultas } from '../../components/ListaDeConsultas/ListaDeConsultas';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { AuthContext, DEFAULT_FUNCIONARIO } from '../../context/Auth/AuthContext';
import { ConsultaContext } from '../../context/Consulta/ConsultaContext';
import { PacienteContext } from '../../context/Paciente/PacienteContext';
import './style.css';

export function Home() {

  const navigate = useNavigate()
const [ searchText, setSearchText ] = useState('')
const { getAllConsultas } = useContext(ConsultaContext)
const { loading, funcionario } = useContext(AuthContext)
const { getAllPacientes } = useContext(PacienteContext)
 
useEffect(() => {
  console.log(funcionario);
  
  if(!loading){
    getAllConsultas()
    getAllPacientes()
  }
}, [])
  
  return (
    <>
    {loading  ? <h3>Loading...</h3> :
    <PageDefault>
      <h1>Lista de consultas</h1>
      <div className="container-consultas">
        <div className="campos">
          <strong>Pesquisa</strong>
          <input value={searchText} onChange={(e)=> setSearchText(e.target.value)} placeholder="pesquise aqui" type="text" />
        </div>
      </div>
        <ListaDeConsultas searchText={searchText}/>
        <button onClick={() =>navigate('/criacao')}>Criar Consulta</button>
    </PageDefault>
     }
    </>
  );
};