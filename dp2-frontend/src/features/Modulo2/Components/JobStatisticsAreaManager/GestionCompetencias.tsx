import { useEffect, useState } from 'react';
import { Button, Table} from 'react-bootstrap';
import {tipoCompetencia,CompetenciaTrabajador } from '../GestionDeCompetencias/Tipos';
import { useLocation,  useNavigate  } from 'react-router-dom';

const GestionCompetenciaAM = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = location.state;
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState('Ángela Quispe Ramírez');
    const [cargoEmpleado, setCargoEmpleado] = useState('Supervisor - Ärea de TI');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [tipoCompetencias, setTipoCompetencias] = useState<tipoCompetencia[]>([]);
    const [competenciasData, setCompetenciasData] = useState<CompetenciaTrabajador[]>([]);

    useEffect(() => {        
      const fetchTipoCompetencias = async () => {
        try {
  
          const response = await fetch('https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/competenceTypes', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setTipoCompetencias(data);
          } else {
            console.log('Error al obtener los datos de competencias');
          }
        } catch (error) {
          console.log('Error al obtener los datos de competencias:', error);
        }
      };

      const fetchCompetencias = async () => {
        try {
          const body = {
            estado: 0, //dejarlo así - luego se podrá poner 1,2,3
            tipo: 0, //dejarlo así - luego se podrá poner 1,2,3
            activo: 2, //dejarlo así - luego se podrá poner 0,1,2
            idEmpleado: 1, // Poner el idEmpleado
          };
  
          const response = await fetch(
            'https://jqikkqy40h.execute-api.us-east-1.amazonaws.com/dev/api/v1/gaps/trainingNeedSearch',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token 5ad77c64f19039ef87cca20c2308ddbbaf3014bf',
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
      fetchTipoCompetencias();
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
                    <th onClick={() => handleOrdenarPorCampo('levelGap')}>
                    ¿Existe brecha?
                    {campoOrdenamiento === 'levelGap' && (
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
            //const observacion = item.levelCurrent < item.levelRequired ? 'Necesidad de curso de capacitación' : 'Nivel requerido es alcanzado';

            return (
              <tr key={index}>
                <td>{item.competence__name}</td>
                <td>{item.competence__type__name}</td>
                <td>{item.levelCurrent}</td>
                <td>{item.levelRequired}</td>
                <td>{brecha}</td>
                <td>{item.description}</td>
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
      <h2>Competencias de empleado</h2>
      <p className="text-muted">Competencias por empleado.</p>
      </div>
      
    <div className='container-fluid'>
    <img alt='Foto de perfil del empleado' src=''></img>
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
      <div className="col-sm-3 botones">
        <Button variant="outline-primary" className="me-2" onClick={()=>{}}>
        Exportar a excel
          </Button>
      </div>
    </div>
  );
};

export default GestionCompetenciaAM;
