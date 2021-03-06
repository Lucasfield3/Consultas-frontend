
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { PageDefault } from '../../components/PageDefault/PageDefault';
import { ConsultaContext } from '../../context/Consulta/ConsultaContext';
import { NewConsulta } from '../../services/Consultas';
import moment from 'moment'

import './style.css';

export function EditConsultas() {

  const { consulta, getOneConsulta, editOneConsulta } = useContext(ConsultaContext)

  const { register, handleSubmit, reset, getValues } = useForm<NewConsulta>({
    defaultValues:{
      pacienteTel:'',
      pacienteNome:'',
      data:''
}})

const navigate = useNavigate()

  const { id } = useParams()

  useEffect(()=>{
    async function getCurrentConsultaOnEdit(){
      const currentConsulta = await getOneConsulta(id!)
      if(currentConsulta){
        let dateFormated = moment(currentConsulta.data).format('YYYY-MM-DDTHH:mm:ss.sssZ').substring(0, 16)
        reset({pacienteNome:currentConsulta.paciente?.nome!, 
          pacienteTel:currentConsulta.paciente?.telefone!,
          data:dateFormated
        })
        return currentConsulta
      }
    }
    getCurrentConsultaOnEdit()
  }, [])

  async function onSubmit(){
    let today = new Date()
    let formatedDate = new Date(getValues('data'))
    let convertIso = formatedDate.toISOString()
    let hours = formatedDate.getHours()
    let minutes = formatedDate.getMinutes()
    console.log(convertIso);
    if(hours < 8 ||( hours >= 17 && minutes >= 0)){
      console.log(hours, minutes);
      alert('Não se pode marcar nesse horaio')
      return
    } 
    
    if(formatedDate < today){
      alert('Não se pode marcar nesse horaio')
      return
    }
      await editOneConsulta(consulta!.id! ,{
        data:convertIso,
        pacienteNome:getValues('pacienteNome'),
        pacienteTel:getValues('pacienteTel')
      }).then(()=>{
          setTimeout(()=>navigate('/home'), 200)
      })
    
  }
console.log(getValues('data'));


  return (
    <>
    {consulta ? 
    <PageDefault>
      <BackButton onClick={()=>navigate('/home')}/>
      <h1>Tela de edição</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='form-edit'>
        <input {...register("pacienteTel" , {required:true})} placeholder='telefone do paciente' type="text" />
        <input {...register("pacienteNome" , {required:true})} placeholder='nome do paciente' type="text" />
        <input {...register("data", {required:true})}  placeholder="telefone" type="datetime-local" />
        <button type='submit' >Editar</button>
      </form>
    </PageDefault> : <h1>Loading</h1>
    
    }
    </>
  );
};