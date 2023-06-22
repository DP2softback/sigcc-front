import { useEffect, useState } from 'react';
import { Button, Table} from 'react-bootstrap';
import './GestionCompetencias.css'
import {tipoCompetencia,CompetenciaTrabajador } from '../GestionDeCompetencias/Tipos';
import { useLocation, useNavigate } from 'react-router-dom';
import {EmpleadoDeArea} from '@features/Modulo2/Components/GestionDeCompetencias/Tipos';
import {TOKEN_SERVICE, URL_SERVICE}from '@features/Modulo2/services/ServicesApis'
const examplePhoto = 'https://media.istockphoto.com/id/1325565779/photo/smiling-african-american-business-woman-wearing-stylish-eyeglasses-looking-at-camera-standing.jpg?b=1&s=170667a&w=0&k=20&c=0aBawAGIMPymGUppOgw1HmV8MNXB1536B3sX_PP9_SQ='

const GestionCompetencia = (state) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = location.state;
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState(usuario.user__first_name + ' '+ usuario.user__last_name);
    const [cargoEmpleado, setCargoEmpleado] = useState(usuario.position__name);
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [competenciasData, setCompetenciasData] = useState<CompetenciaTrabajador[]>([]);

    useEffect(() => {     
      const fetchCompetencias = async () => {
        try {
          const body = {
            idCompetencia: 0,		//dejarlo así
            palabraClave: "",		//poner la palabra clave del buscador, si es nada pon ""
            idTipoCompetencia: 0,		//el idTipoCompetencia del buscador, si es todos pon 0
            activo: 2,			//el estado 0 o 1 (inactivo o activo), si es todos pon 2
            idEmpleado: usuario.id			//ponerle el idEmpleado
          };
  
          const response = await fetch(
            URL_SERVICE + '/gaps/competenceSearch',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN_SERVICE,
              },
              body: JSON.stringify(body),
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setCompetenciasData(data);
          } else {
            console.log('Error al obtener los datos de competencias');
          }
        } catch (error) {
          console.log('Error al obtener los datos de competencias:', error);
        }
      };
      fetchCompetencias();
    }, []);

    const handleOrdenarPorCampo = (campo) => {
        // Si se hace clic en el mismo campo, cambia el tipo de orden
        if (campo === campoOrdenamiento) {
          setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
          setCampoOrdenamiento(campo);
          setTipoOrden('ascendente');
        }
      };
    
      const datosFiltradosYOrdenados = () => {
        let datosOrdenados = [];
        switch (campoOrdenamiento) {
          case 'competence__code':
            datosOrdenados = competenciasData.sort((a, b) =>
              tipoOrden === 'ascendente'
                ? a.competence__code.localeCompare(b.competence__code)
                : b.competence__code.localeCompare(a.competence__code)
            );
            break;
          case 'competence__name':
            datosOrdenados = competenciasData.sort((a, b) =>
              tipoOrden === 'ascendente'
                ? a.competence__name.localeCompare(b.competence__name)
                : b.competence__name.localeCompare(a.competence__name)
            );
            break;
          case 'competence__type__name':
            datosOrdenados = competenciasData.sort((a, b) =>
              tipoOrden === 'ascendente'
                ? a.competence__type__name.localeCompare(b.competence__type__name)
                : b.competence__type__name.localeCompare(a.competence__type__name)
            );
            break;
          default:
            datosOrdenados = competenciasData;
        }
    
        return datosOrdenados;
      };  
  
    const renderTablaCompetencias = () => {
      const datosOrdenados = datosFiltradosYOrdenados();
        return (
            <Table striped bordered>
            <thead>
                <tr>
                    <th onClick={() => handleOrdenarPorCampo('competence__code')}>
                    Código
                    {campoOrdenamiento === 'competence__code' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('competence__name')}>
                    Nombre
                    {campoOrdenamiento === 'competence__name' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('competence__type__name')}>
                    Tipo de competencia
                    {campoOrdenamiento === 'competence__type__name' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('levelCurrent')}>
                    Nivel actual
                    {campoOrdenamiento === 'levelCurrent' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('levelRequired')}>
                    Nivel requerido
                    {campoOrdenamiento === 'levelRequired' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('likeness')}>
                    Porcentaje de adecuacion
                    {campoOrdenamiento === 'likeness' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('description')}>
                    Observación
                    {campoOrdenamiento === 'description' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                    )}
                    </th>
                </tr>
            </thead>
        <tbody>
          {datosOrdenados.map((item, index) => {
            const brecha = item.levelCurrent < item.levelRequired ? 'Si' : 'No';
            const observacion = item.levelCurrent < item.levelRequired ? 'Necesidad de curso de capacitación' : 'Nivel requerido es alcanzado';

            return (
              <tr key={index}>
                <td>{item.competence__code}</td>
                <td>{item.competence__name}</td>
                <td>{item.competence__type__name}</td>
                <td>{item.levelCurrent}</td>
                <td>{item.levelRequired}</td>
                <td>{item.likeness + ' %'}</td>
                <td>{observacion}</td>
              </tr>
            );
          })}
        </tbody>
          </Table>
        );
      };
  return (
    <div className="pantalla">
      <div className='titles'>
      <h2 className='Head'>Capacidades de empleado del área de TI</h2>
      <p className="text-muted subtitle">Capacidades por empleado.</p>
      </div>
      
    <div className='container-fluid'>
    <img alt='Foto de perfil del empleado' src={examplePhoto} style={{width: '80px',height: '80px', borderRadius:'50%',objectFit:'cover'}}></img>
    <div>{nombreEmpleado}</div>
    <div>{cargoEmpleado}</div>
    </div>
    
      <div className='container-fluid'>
      <hr style={{background:'black', height:'2px'}}></hr>
         {renderTablaCompetencias()}
      </div>
      <div className="col-sm-3 botones">
        <Button variant="outline-primary" className="me-2" onClick={()=>{navigate(-1)}}>
          Regresar
          </Button>
      </div>
    </div>
  );
};

export default GestionCompetencia;
