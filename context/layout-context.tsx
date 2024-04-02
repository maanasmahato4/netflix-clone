'use client';

import React, { createContext, useState } from 'react';

export interface LayoutContextProps {
	mobileMenuHidden: boolean;
	setMobileMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = createContext<LayoutContextProps>({
	mobileMenuHidden: false,
	setMobileMenuHidden: () => {},
});

export const LayoutContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [mobileMenuHidden, setMobileMenuHidden] = useState<boolean>(false);
	const LayoutContextValues = {
		mobileMenuHidden,
		setMobileMenuHidden,
	};
	return (
		<LayoutContext.Provider value={LayoutContextValues}>
			{children}
		</LayoutContext.Provider>
	);
};
