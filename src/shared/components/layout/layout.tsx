import styles from './layout.module.css';
import { Header } from '../../../widgets/header/header';
import { Footer } from '../../../widgets/footer/footer';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import type { ReactNode } from 'react';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<ErrorBoundary>{children}</ErrorBoundary>
			<Footer />
		</div>
	);
};
