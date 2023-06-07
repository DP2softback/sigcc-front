import classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const AppMain: React.FC<Props> = ({ className, ...props } : Props) => {
	const compClass = classNames({
		"nk-main": true,
		[`${className}`]: className
	});
	return <div className={compClass}>{props.children}</div>;
}

export default AppMain;
