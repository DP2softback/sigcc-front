import {
	useState,
	createContext,
	useContext
} from "react";

const layoutConfig = {
	sidebarCompact: false,
	sidebarActive: false,
	sidebarVariant: "theme",
	sidebarCollapse: "lg",
	headerActive: false,
	headerTransition: false,
	headerVariant: "white",
	headerCollapse: "lg",
	breaks: {
		mb: 420,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200,
		xxl: 1540,
		any: Infinity
	}
};

const LayoutContext = createContext(layoutConfig);
const LayoutUpdateContext = createContext({
	sidebarCompact: () => {},
	sidebarMobile: () => {},
	headerMobile: () => {}
});

export function useLayout() {
	return useContext(LayoutContext);
}

export function useLayoutUpdate() {
	return useContext(LayoutUpdateContext);
}

function LayoutProvider({ children }) {
	const [layout, setLayout] = useState(layoutConfig);

	const updateLayout = {
		sidebarCompact: function () {
			const newLayout = {
				...layout,
				sidebarCompact: !layout.sidebarCompact
			};
			setLayout(newLayout);
		},
		sidebarMobile: function () {
			const newLayout = {
				...layout,
				sidebarActive: !layout.sidebarActive
			};
			setLayout(newLayout);
		},
		headerMobile: function () {
			const newLayout = {
				...layout,
				headerActive: !layout.headerActive
			};
			setLayout(newLayout);
		}
	};

	const body = document.querySelector("body");
	const observer = new ResizeObserver((entries) => {
		let width = entries[0].contentRect.width;
		// eslint-disable-next-line
		let headerBreak = eval(
			`layout.breaks.${layout.headerCollapse}`
		);
		// eslint-disable-next-line
		let sidebarBreak = eval(
			`layout.breaks.${layout.sidebarCollapse}`
		);
		if (
			width > headerBreak &&
			(layout.headerActive === true ||
				layout.headerTransition === true)
		) {
			const newLayout = {
				...layout,
				headerTransition: false,
				headerActive: false
			};
			setLayout(newLayout);
		}
		if (
			width > sidebarBreak &&
			layout.sidebarActive === true
		) {
			const newLayout = { ...layout, sidebarActive: false };
			setLayout(newLayout);
		}
	});
	observer.observe(body);

	return (
		<LayoutContext.Provider value={layout}>
			<LayoutUpdateContext.Provider value={updateLayout}>
				{children}
			</LayoutUpdateContext.Provider>
		</LayoutContext.Provider>
	);
}

export default LayoutProvider;
