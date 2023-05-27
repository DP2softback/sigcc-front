import React, {useState} from 'react'
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap'

const Read = () => {
    const [palabrasClave, setPalabrasClave] = useState('');
    const [tipoOrden, setTipoOrden] = useState('ascendente');
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);
    const [tipoCompetencia, setTipoCompetencia] = useState('');
    const [campoOrdenamiento, setCampoOrdenamiento] = useState('');
    const hardcode = [
        { nombre: 'Programación en Java', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.45},
        { nombre: 'Liderazgo', tipo: 'Habilidades blandas', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 1.00 },
        { nombre: 'Programación modular', tipo: 'Conocimiento', nivelActual: 'Medio', nivelRequerido: 'Alto', porcAdecuacion: 0.86 },
        { nombre: 'Uso de Microsoft Word', tipo: 'Técnico', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 1.00 },
        { nombre: 'Innovación', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Gestión del Tiempo', tipo: 'Conocimiento', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.95 },
        { nombre: 'Pensamiento Analítico', tipo: 'Técnico', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 0.40 },
        { nombre: 'Negociación', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.49 },
        { nombre: 'Planificación Estratégica', tipo: 'Conocimiento', nivelActual: 'Alto', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Comunicación Interpersonal', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Alto', porcAdecuacion: 0.15 },
        { nombre: 'Resiliencia', tipo: 'Conocimiento', nivelActual: 'Medio', nivelRequerido: 'Alto', porcAdecuacion: 0.68 },
        { nombre: 'Adaptabilidad', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.52 },
        { nombre: 'Comunicación Escrita', tipo: 'Habilidades blandas', nivelActual: 'Medio', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Habilidades de Presentación', tipo: 'Conocimiento', nivelActual: 'Medio', nivelRequerido: 'Alto', porcAdecuacion: 0.75 },
        { nombre: 'Resolución de Conflictos', tipo: 'Técnico', nivelActual: 'Bajo', nivelRequerido: 'Alto', porcAdecuacion: 0.20 },
        { nombre: 'Pensamiento Crítico', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelRequerido: 'Medio', porcAdecuacion: 0.40 },
        { nombre: 'Empatía', tipo: 'Conocimiento', nivelActual: 'Alto', nivelRequerido: 'Alto', porcAdecuacion: 1.00 },
        { nombre: 'Toma de Decisiones', tipo: 'Técnico', nivelActual: 'Medio', nivelRequerido: 'Medio', porcAdecuacion: 1.00 },
        { nombre: 'Trabajo Bajo Presión', tipo: 'Habilidades blandas', nivelActual: 'Bajo', nivelRequerido: 'Alto', porcAdecuacion: 0.20 },
      ];
    const [competenciasData, setCompetenciasData] = useState(hardcode);
    

    const filtrarCompetencias = () => {
        let competenciasFiltradas = competenciasData;
      
        if (tipoCompetencia) {
          competenciasFiltradas = competenciasFiltradas.filter(competencia => competencia.tipo === tipoCompetencia);
        }

        if (palabrasClave) {
            const palabrasClaveLower = palabrasClave.toLowerCase();
            competenciasFiltradas = competenciasFiltradas.filter(competencia =>
              competencia.nombre.toLowerCase().includes(palabrasClaveLower) ||
              competencia.nivelActual.toLowerCase().includes(palabrasClaveLower) ||
              competencia.nivelRequerido.toLowerCase().includes(palabrasClaveLower)
            );
          }
        return competenciasFiltradas;
    };

    const limpiarFiltros = () => {
        setTipoCompetencia('');
    };

    const handleOrdenarPorCampo = (campo) => {
        if (campo === campoOrdenamiento) {
            setTipoOrden(tipoOrden === 'ascendente' ? 'descendente' : 'ascendente');
        } else {
            setCampoOrdenamiento(campo);
            setTipoOrden('ascendente');
        }
    };

    const datosFiltradosYOrdenados = filtrarCompetencias().sort((a, b) => {
        if (a[campoOrdenamiento] < b[campoOrdenamiento]) {
            return tipoOrden === 'ascendente' ? -1 : 1;
        }
        if (a[campoOrdenamiento] > b[campoOrdenamiento]) {
            return tipoOrden === 'ascendente' ? 1 : -1;
        }
        return 0;
    });

    const renderTablaBrechas = () => {
        const competenciasFiltradas = filtrarCompetencias();
      
        if (busquedaRealizada && competenciasFiltradas.length === 0) {
            return <p>No se encontraron resultados.</p>;
          }
        return (
            <Table striped bordered>
                <thead>
                <tr>
                    <th onClick={() => handleOrdenarPorCampo('nombre')}>
                        Nombre
                        {campoOrdenamiento === 'nombre' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                        )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('tipo')}>
                        Tipo
                        {campoOrdenamiento === 'tipo' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                        )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('nivelActual')}>
                        Nivel actual
                        {campoOrdenamiento === 'nivelActual' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                        )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('nivelRequerido')}>
                        Nivel requerido
                        {campoOrdenamiento === 'nivelRequerido' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                        )}
                    </th>
                    <th onClick={() => handleOrdenarPorCampo('porcAdecuacion')}>
                        % de adecuacion
                        {campoOrdenamiento === 'porcAdecuacion' && (
                        <i className={`bi bi-caret-${tipoOrden === 'ascendente' ? 'up' : 'down'}`}></i>
                        )}
                    </th>
                </tr>
                </thead>
                <tbody>
                {datosFiltradosYOrdenados.map((competencia, index) => (
                    <tr key={index}>
                        <td>{competencia.nombre}</td>
                        <td>{competencia.tipo}</td>
                        <td>{competencia.nivelActual}</td>
                        <td>{competencia.nivelRequerido}</td>
                        <td>{competencia.porcAdecuacion*100+"%"}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <h2>Consolidado de competencias</h2>
            <p className="text-muted">Agrega, edita y desactiva competencias</p>
            <Form className="mb-3">
                <InputGroup>
                <FormControl
                    placeholder="Ingrese palabras clave, código o nombre de las competencias"
                    aria-label="Buscar competencias"
                    aria-describedby="buscar-icono"
                    value={palabrasClave}
                    onChange={(e) => setPalabrasClave(e.target.value)}
                />
                <Button variant="outline-secondary" id="buscar-icono" onClick={() => setBusquedaRealizada(true)}>
                    <i className="bi bi-search"></i>
                </Button>
                </InputGroup>

                <Form.Group className="mb-3" controlId="filtroTipoCompetencia">
                <select className="form-select" value={tipoCompetencia} onChange={(e) => setTipoCompetencia(e.target.value)}>
                    <option hidden>Tipo de competencia</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Habilidades blandas">Habilidades blandas</option>
                    <option value="Conocimiento">Conocimiento</option>
                    {/* Agregar más opciones de tipo de competencia aquí */}
                </select>
                </Form.Group>

                <div className="d-flex justify-content-end">
                <Button variant="outline-secondary" className="me-2" onClick={limpiarFiltros}>
                    Limpiar Filtros
                </Button>
                <Button variant="primary">Buscar</Button>
                </div>
            </Form>
            {renderTablaBrechas()}
        </div>
        
    )
}

export default Read