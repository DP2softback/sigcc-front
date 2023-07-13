import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table, Button, Modal } from "react-bootstrap";
import SearchInput from "./SearchInputOfertaLaboral/SearchInput";
import Form from "react-bootstrap/Form";

import { Chart } from "react-google-charts";

import DataTable from "react-data-table-component";
import FixedHeaderStory from "react-data-table-component";

import { Fragment, ChangeEvent, useEffect, useRef, useState } from "react";
import { ajax } from "@features/Modulo4/tools/ajax";
import moment from "moment";
import {
	SAMPLE_TOKEN,
	LOCAL_CONNECTION,
	LIST_ETAPAS_INDICADORES,
	LIST_ETAPAS_FIRST_STEP,
	LIST_ETAPAS_SECOND_STEP
} from "@features/Modulo4/utils/constants";
import { set } from "lodash";

const customStylesTablesPersonal = {
	header: {
		style: {
			fontSize: "1rem", // override the row height
			bold: true
		}
	}
};

function IndicadoresProcesoSeleccion(props: any) {
	const navigate = useNavigate();

	// MODAL DEL BUSCADOR, ABRE Y RETORNA LOS VALORES
	const [selectedNombreOferta, setSelectedNombreOferta] = useState("");
	const [selectedNombreOfertaFijo, setSelectedNombreOfertaFijo] = useState("");
	const [selectedPosicionID, setSelectedPosicionID] = useState(null);

	const [showModalBuscador, setShowModalBuscador] = useState(false);
	const handleShowBuscadorFromButtom = () => {
		setShowModalBuscador(true);
	};
	const handleCloseBuscadorFromButtom = () => {
		setShowModalBuscador(false);
	};
	const handleOptionSelectBuscador = (selectedOption) => {
		console.log(selectedOption);
		setSelectedNombreOferta("Oferta laboral - " + selectedOption.name);
		setSelectedNombreOfertaFijo(selectedOption.name);
		setSelectedPosicionID(selectedOption.id);
	};

	// TIPO DE ETAPAS
	const [optionsTipoEtapaSelec, setOptionsTipoEtapaSelec] = useState<any[]>([]);
	const [selectedTipoEtapaSelec, setSelectedTipoEtapaSelec] = useState(null);
	const [selectedTipoEtapaID, setSelectedTipoEtapaID] = useState(0);

	const handleOptionsTipoEtapaSelec = (optionRow: any) => {
		setSelectedTipoEtapaSelec(optionRow.name);
		setSelectedTipoEtapaID(optionRow.id);
	};

	const getTiposEtapas = async () => {
		const optionsRequest = {
			method: "GET",
			url: LOCAL_CONNECTION + LIST_ETAPAS_INDICADORES + selectedPosicionID,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			}
		};
		return await ajax(optionsRequest);
	};

	useEffect(() => {
		const fetchData = async () => {
			const tiposEtapas = await getTiposEtapas();
			console.log(tiposEtapas);
			setOptionsTipoEtapaSelec(tiposEtapas);
		};
		if (selectedPosicionID !== null) fetchData();
	}, [selectedPosicionID]);

	// MODAL DE BUSCAR
	const [informacionEtapa, setInformacionEtapa] = useState(null);
	const handleBuscar = () => {
		if (selectedPosicionID == null) {
			alert("Debe seleccionar una etapa para la oferta laboral");
			return;
		} else {
			const fetchDataTipo1 = async () => {
				const informacionEtapas = await getInformacionEtapasTipo1();
				setInformacionEtapa(informacionEtapas);
			};
			fetchDataTipo1();
		}
	};

	const getInformacionEtapasTipo1 = async () => {
		const dataPost = {
			hiring_process: selectedPosicionID,
			mandatory: [],
			affinity: 60
		};
		var conexion =
			selectedTipoEtapaID == 1
				? LIST_ETAPAS_FIRST_STEP
				: LIST_ETAPAS_SECOND_STEP;
		console.log(conexion);
		const optionsRequest = {
			method: "POST",
			url: LOCAL_CONNECTION + conexion,
			headers: {
				Authorization: `Token ${SAMPLE_TOKEN}`
			},
			data: dataPost
		};
		return await ajax(optionsRequest);
	};

	// ESTILOS
	const stylesSelect = {
		display: "flex",
		alignItems: "center",
		marginBottom: "0.78rem"
	};

	// VALIDA FORMULARIO
	const [validated, setValidated] = useState(false);
	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
		event.preventDefault();
	};

	// GRAFICO
	const [dataGraficoEtapa, setDataGraficoEtapa] = useState([]);
	const [dataTablaEtapa, setDataTablaEtapa] = useState<TableRow | any>([]);
	const [dataGraficoScores, setDataGraficoScores] = useState([]);
	interface TableRow {
		nombre_completo: number;
		puntaje: number;
		si_paso: string;
	}
	useEffect(() => {
		console.log(informacionEtapa);

		const obtenerDatosAprobadosDesaprobados = (dataGrafico) => {
			const dataGraficoMap = informacionEtapa
				? informacionEtapa.map(({ pass }) => ({
						resultado: pass
				  }))
				: [];

			let aprobados = 0;
			let desaprobados = 0;
			dataGraficoMap.forEach((elemento) => {
				if (elemento.resultado === "PASS") {
					aprobados++;
				} else {
					desaprobados++;
				}
			});
			const datosFormateados = [
				["Tipo", "Cantidad"],
				["Aprobado", aprobados],
				["Desaprobado", desaprobados]
			];
			console.log(datosFormateados);
			return datosFormateados;
		};
		setDataGraficoEtapa(obtenerDatosAprobadosDesaprobados(informacionEtapa));

		setDataTablaEtapa(
			informacionEtapa
				? informacionEtapa.map(({ applicant, pass, score }) => ({
						applicant: applicant,
						pass: pass === "PASS" ? "Aprobado" : "Desaprobado",
						score: score
				  }))
				: []
		);

		const scoresEtapa = informacionEtapa
			? informacionEtapa.map(({ score }) => ({
					score: score
			  }))
			: [];
		console.log(scoresEtapa);
		const calcularPercentiles = (valores, percentiles) => {
			const sortedValues = valores
				.map((valor) => parseInt(valor.score))
				.sort((a, b) => a - b);
			const indexes = percentiles.map((percentil) =>
				Math.floor((percentil / 100) * (sortedValues.length - 1))
			);
			const percentilesValues = indexes.map((index) => sortedValues[index]);
			return percentilesValues;
		};
		const percentiles = [25, 50, 75]; // Percentiles deseados
		const percentilesValues = calcularPercentiles(scoresEtapa, percentiles);
		const data = [
			["Percentil", "Valor"],
			[`${percentiles[0]}%`, percentilesValues[0]],
			[`${percentiles[1]}%`, percentilesValues[1]],
			[`${percentiles[2]}%`, percentilesValues[2]]
		];
		setDataGraficoScores(data);
	}, [informacionEtapa]);

	useEffect(() => {
		setInformacionEtapa(null);
	}, [selectedTipoEtapaSelec]);

	const data = [
		["Tipo", "Cantidad"],
		["Aprobado", 11],
		["Desaprobado", 2]
	];

	// TRABLA DEL GRAFICO
	const columns = [
		{
			name: "Nombre",
			selector: (row) => row.applicant.user.first_name
		},
		{
			name: "Resultado",
			selector: (row) => row.pass
		},
		{
			name: "Calificación",
			selector: (row) => row.score
		}
	];

	const stringPostulant =
		dataTablaEtapa.length == 1 ? " postulante)" : " postulantes)";
	const options = {
		title:
			"Resultados de " +
			selectedTipoEtapaSelec +
			"\n(" +
			dataTablaEtapa.length +
			stringPostulant,
		fontSize: 15,
		bold: false
	};

	return (
		<div
			style={{
				paddingLeft: "2rem",
				paddingRight: "4rem"
			}}>
			<div className="row">
				<div className="col">
					<h1>Indicadores del proceso de seleccion</h1>
					<p>
						<small className="opacity-50" style={{ marginBottom: "10rem" }}>
							Portal que presenta los indicadores del proceso de selección.
						</small>
					</p>
				</div>
			</div>

			<div className="row" style={{ paddingTop: "1rem" }}>
				<Row>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Form.Group as={Row}>
							<Form.Group as={Col} className="mb-3">
								<Form.Label style={{ fontSize: "15px" }}>
									Proceso de seleccion de oferta laboral: (*)
								</Form.Label>
								<Row>
									<Col xs={10}>
										<Form.Control
											as="textarea"
											type="text"
											placeholder="Seleccionar el proceso de seleccion para la oferta laboral"
											value={selectedNombreOfertaFijo}
											rows={2}
											readOnly={true}
											disabled={true}
										/>
									</Col>
									<Col xs={2}>
										<Button
											style={{
												width: "10rem",
												maxWidth: "10rem",
												minHeight: "100%"
											}}
											onClick={handleShowBuscadorFromButtom}>
											Buscar proceso selección
										</Button>
									</Col>
								</Row>
							</Form.Group>
						</Form.Group>
						<Form.Group as={Row} className="mb-4">
							<Row>
								<Col xs={4}>
									<Form.Label
										style={{ fontSize: "15px", paddingTop: "0.5rem" }}>
										Etapas del proceso de selección:
									</Form.Label>
								</Col>
								<Col>
									<Dropdown>
										<Dropdown.Toggle
											variant="secondary"
											id="dropdown-basic"
											style={{ width: "16rem" }}>
											{selectedTipoEtapaSelec == null
												? "Visualizar etapas"
												: selectedTipoEtapaSelec}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											{optionsTipoEtapaSelec
												? optionsTipoEtapaSelec.map((optionRow) => (
														<Dropdown.Item
															key={optionRow.id}
															onClick={() =>
																handleOptionsTipoEtapaSelec(optionRow)
															}>
															{optionRow.stage_type + " - " + optionRow.name}
														</Dropdown.Item>
												  ))
												: []}
										</Dropdown.Menu>
									</Dropdown>
								</Col>
							</Row>
						</Form.Group>

						<Form.Group as={Row} className="mb-4">
							<Col style={{ display: "flex", justifyContent: "center" }}>
								<Button
									style={{ width: "12rem", maxWidth: "12rem" }}
									type="submit"
									variant="primary"
									onClick={handleBuscar}>
									Generar resultados
								</Button>
							</Col>
						</Form.Group>
					</Form>
				</Row>
			</div>

			{informacionEtapa !== null && (
				<div
					style={{
						border: "1px solid rgba(0, 0, 0, 0.2)",
						minWidth: "80%",
						maxWidth: "80%",
						margin: "0 auto"
					}}>
					<Row>
						<div
							style={{
								margin: "0 auto",
								marginTop: "0.1rem"
							}}>
							<Chart
								chartType="PieChart"
								data={dataGraficoEtapa}
								options={options}
								width={"100%"}
								height={"430px"}
							/>
						</div>
					</Row>

					<Row>
						<div
							style={{
								margin: "0 auto",
								marginTop: "-5rem"
							}}>
							<Chart
								width={"100%"}
								height={"400px"}
								chartType="BarChart"
								loader={<div>Cargando gráfico</div>}
								data={dataGraficoScores}
								options={{
									title:
										"Referencia de calificación para el percentil entre los postulantes",
									hAxis: { title: "Percentil", minValue: 0, maxValue: 100 },
									vAxis: { title: "Valor percentil" },
									fontSize: 15,
									bold: false
								}}
								rootProps={{ "data-testid": "1" }}
							/>
						</div>
					</Row>

					<Row style={{ backgroundColor: "white", margin: "0 0.1rem" }}>
						<div
							style={{
								height: "20rem",
								minWidth: "80%",
								maxWidth: "80%",
								margin: "0 auto",
								marginTop: "-2rem"
							}}>
							<FixedHeaderStory
								title="Resultados del indicador por postulante"
								noDataComponent="No hay resultados de búsqueda"
								columns={columns}
								data={dataTablaEtapa}
								pagination
								fixedHeader
								fixedHeaderScrollHeight="14rem"
								customStyles={customStylesTablesPersonal}
							/>
						</div>
					</Row>
				</div>
			)}
			{showModalBuscador && (
				<SearchInput
					onClose={handleCloseBuscadorFromButtom}
					onSelect={handleOptionSelectBuscador}
				/>
			)}
		</div>
	);
}

/*


*/
export default IndicadoresProcesoSeleccion;
