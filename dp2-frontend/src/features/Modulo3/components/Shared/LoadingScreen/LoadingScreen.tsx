import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
		<div style={{ height: "50vh", position: "relative" }}>
			<div
				style={{
					margin: 0,
					position: "absolute",
					top: "50%",
					left: "50%",
					msTransform: 'translate(-50%, 50%)',
					transform: 'translate(-50%, -50%)'
				}}>
				<div>
					<Spinner color="dark" />
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;