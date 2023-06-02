type Props = {
	pageTitle: string;
	children?: React.ReactNode;
};

const EnhancedHeaderTitle = (props: Props) => {
	return (
		<>
			<h1>{props.pageTitle}</h1>
			<p>{props.children}</p>
		</>
	);
};

export default EnhancedHeaderTitle;
