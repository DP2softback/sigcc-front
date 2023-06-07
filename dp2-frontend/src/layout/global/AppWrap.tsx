import classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const AppWrap: React.FC<Props> = ({ className, ...props } : Props) => {
	const compClass = classNames({
		"nk-wrap": true,
		[`${className}`]: className
	});
	return <div className={compClass}>{props.children}</div>;
}

export default AppWrap;
