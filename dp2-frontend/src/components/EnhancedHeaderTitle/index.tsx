type Props = {
	pageTitle: string;
	children?: React.ReactNode;
};

const EnhancedHeaderTitle = (props: Props) => {
	return (
		<>
			<h1 className="display-1 mb-4">{props.pageTitle}</h1>
			<p>{props.children}</p>
		</>
	);
};

export default EnhancedHeaderTitle;
