import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConsultaContext } from '../../context/Consulta/ConsultaContext';
import { Overlay } from '../Overlay/Overlay';
import { ViewConsulta } from '../ViewConsulta/ViewConsulta';
import './style.css'

type Props = {
  searchText:string;
};

export function ListaDeConsultas(props: Props) {

  const { getAllConsultas, consultas, getOneConsulta, removeOneConsulta, formatDate } = useContext(ConsultaContext)

  const [  toggle, setToggle ] = useState(false)

  useEffect(()=>{
    getAllConsultas()
  }, [])

    const navigate = useNavigate()

    let arrayFiltered = consultas!.filter((consulta)=>{
      if(consultas){
        return consulta.paciente?.nome.toLocaleLowerCase().indexOf(props.searchText.toLocaleLowerCase()) !== -1 || 
        String(consulta.data).toLocaleLowerCase().indexOf(props.searchText.toLocaleLowerCase()) !== -1;
      }
    })

    async function getCurrentConsulta(id:string){
      const currentConsulta = await getOneConsulta(id)
      if(currentConsulta){
        setToggle(true)
        return currentConsulta
      }
    }

    
    

  return (
    <>
      <Overlay onClick={()=>setToggle(false)} isShown={toggle}/>
       <ViewConsulta  onClick={()=>setToggle(false)} toggle={toggle}/>
      <div className="scroll-area">
        {arrayFiltered.map((consulta, index)=>{
          return (
            <>
              <div onClick={()=>getCurrentConsulta(consulta.id!)}  key={consulta.id} className="consulta">
                  <div className="infos">
                    <p className="paciente-name"><strong>Nome:</strong> {consulta.paciente?.nome}</p>
                    <p className="data"><strong>Data:</strong> {formatDate(consulta.data)}</p>
                  </div>
                  <div className="buttons">
                      <button onClick={(e)=> {
                        e.stopPropagation()
                        navigate(`/edicao/${consulta.id!}`)
                        }}>editar</button>
                      <button onClick={(e)=>{
                        e.stopPropagation()
                        removeOneConsulta(consulta.id!)
                        }}>deletar</button>
                  </div>
                </div>
            </>
          )
        })}
        { arrayFiltered.length === 0  && <h3 className='empty'>vazio</h3>}
      </div>
    </>
  );
};

