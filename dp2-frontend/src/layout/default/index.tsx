import { useLayoutEffect } from "react";
import AppRoot from "../global/AppRoot";
import AppMain from "../global/AppMain";
import AppWrap from "../global/AppWrap";
import AppContent from "../global/AppContent";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LayoutProvider from "./LayoutProvider";

type Props = {
  title?: string;
	content?: string;
  children?: React.ReactNode;
}

const Default: React.FC<Props> = ({ title, content, ...props } : Props) => {
	useLayoutEffect(() => {
		document.title = `${title}`;
	});

	return (
		<LayoutProvider>
			<AppRoot>
				<AppMain>
					<Sidebar />
					<AppWrap>
						<Header />
						<AppContent content={content}>
							{props.children}
						</AppContent>
						<Footer />
					</AppWrap>
				</AppMain>
			</AppRoot>
		</LayoutProvider>
	);
}

export default Default;
