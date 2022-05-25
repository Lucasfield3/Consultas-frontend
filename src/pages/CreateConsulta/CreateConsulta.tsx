import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { ConsultaContext } from '../../context/Consulta/ConsultaContext';
import { PacienteContext } from '../../context/Paciente/PacienteContext';
import { NewConsulta } from '../../services/Consultas';
import { Paciente } from '../../services/Pacientes';
import './style.css';


export function CreateConsultas() {

  const { registerPaciente, getAllPacientes } = useContext(PacienteContext)


  const navigate = useNavigate()

  const { registerConsulta } = useContext(ConsultaContext)

  const { register, handleSubmit } = useForm<Paciente>()

  const { register: register2, handleSubmit: handleSubmit2, getValues } = useForm<NewConsulta>()

  async function onSubmitPaciente(data: Paciente){
    const paciente = await registerPaciente(data)

    if(paciente){
      console.log(paciente);
    }
   
  }

  async function onSubmitConsulta(){
    let today = new Date()
    let formatedDate = new Date(getValues('data'))
    let convertIso = formatedDate.toISOString()
    let hours = formatedDate.getHours()
    let minutes = formatedDate.getMinutes()
    console.log(convertIso);
    if(hours >= 17 || hours <= 8){
      if(minutes > 0){
        alert('Não se pode marcar nesse horaio')
        return
      }
    } 
    
    if(formatedDate < today){
      alert('Não se pode marcar nesse horaio')
        return
    }
    alert('Consulta Criada')
      await registerConsulta({
        data:convertIso,
        pacienteNome:getValues('pacienteNome'),
        pacienteTel:getValues('pacienteTel')
      }).then(()=>{
          setTimeout(()=>navigate('/home'), 200)
      })
    
  }

  useEffect(()=>{
    getAllPacientes()
  }, [])



  return (
    <>
     <PageDefault>
       <BackButton onClick={()=>navigate('/home')}/>
      <h1>Tela de criação</h1>
      <form onSubmit={handleSubmit(onSubmitPaciente)} className='form-consulta'>
        <h3>Cadastrar Paciente</h3>
          <input {...register("nome", {required:true})} placeholder='Nome' type="text" />
          <input {...register("telefone", {required:true})} placeholder='Telefone' type="tel" />
          <button>Cadastrar</button>
      </form>
      <form onSubmit={handleSubmit2(onSubmitConsulta)} className='form-consulta'>
        <h3>Marcar Consulta</h3>
        <input {...register2("pacienteNome", {required:true})}  placeholder="nome" type="text" />
        <input {...register2("pacienteTel", {required:true})} placeholder="telefone" type="text" />
        <input {...register2("data", {required:true})} placeholder="telefone" type="datetime-local" />
        <button type='submit'>criar</button>
      </form>
    
    </PageDefault>
    </>
  );
};