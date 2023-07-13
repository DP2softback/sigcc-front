import { Col, Row } from 'react-bootstrap';
import './Content.css';

type LayoutProps = {
  title: string,
  body: any,
  route?: string,
  subtitle?: string,
  button?: any,
}

const Content = ({title, body, subtitle, route = '', button = ''} : LayoutProps) => {
  const header = (
		<div className="header">
			<Row>
				<Col>
					<div className="screenTitle">{title}</div>
				</Col>
				<Col md="auto" className="my-auto">
					{button}
				</Col>
			</Row>
			{subtitle ? <div className="subtitle">{subtitle}</div> : <></>}
		</div>
	);

  return (
    <>
      {header}
      {body}
    </>
  );
};

export default Content;