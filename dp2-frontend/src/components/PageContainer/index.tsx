import React from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

type Props = {
	title: string;
	children?: React.ReactNode;
};

const PageContainer: React.FC<Props> = (props: Props) => {
	return (
		<>
			<Helmet>
				<title> {props.title} </title>
			</Helmet>
			<Container className="container-xxl">
				{props.children}
			</Container>
		</>
	);
};

export default PageContainer;
