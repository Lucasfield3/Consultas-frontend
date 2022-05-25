import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { AuthContext, AuthContextProvider } from './context/Auth/AuthContext'
import { ConsultaContextProvider } from './context/Consulta/ConsultaContext'
import { PacienteContextProvider } from './context/Paciente/PacienteContext'
import { CreateConsultas } from './pages/CreateConsulta/CreateConsulta'
import { EditConsultas } from './pages/EditConsulta/EditConsulta'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'

function App() {
  interface PrivateProps{
    children:JSX.Element;
  }

  const Private = ({children}:PrivateProps)=>{
    const { authenticated, loading} = useContext(AuthContext)
    
    console.log(authenticated)

      if(authenticated){
        return children
      }


      if(!authenticated){
        return <Navigate to='/'/>
      }

      if(loading){
        return <h1>Loading...</h1>
      }
      return children
  
  }
  return (
    <Router>
    <AuthContextProvider>
    <PacienteContextProvider>
    <ConsultaContextProvider>
      <Routes>
        <Route element={<Login/>} path='/'></Route>
        <Route element={<Register/>} path='/register'></Route>
        <Route element={<Private><Home/></Private>} path='/home'></Route>
        <Route element={ <Private><CreateConsultas/></Private>} path='/criacao'></Route>
        <Route element={<Private><EditConsultas/></Private>} path='/edicao/:id'></Route>
      </Routes>
    </ConsultaContextProvider>
    </PacienteContextProvider>
    </AuthContextProvider>
</Router>
  )
}

export default App
