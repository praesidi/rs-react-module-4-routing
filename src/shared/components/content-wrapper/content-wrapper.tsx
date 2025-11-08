import styles from './content-wrapper.module.css';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { Loader } from '../../../shared/components/loader/loader';
import type { ReactNode } from "react";

interface ContentWrapperProps<T> {
	children: ReactNode;
	data: T | null;
	loading: boolean;
	error: string | null;
}

export const ContentWrapper = <T,>({ children, data, loading, error }: ContentWrapperProps<T>) => {
	if (error !== null) {
		return (
			<div className={styles.error_container}>
				<ErrorMessage
					message="Ошибка при выполнении запроса"
					description={error}
				/>
			</div>
		);
	}

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader />
			</div>
		);
	}

	if (data === null) {
		return (
			<p>
				No Data Found
			</p>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{ children }
			</div>
		</div>
	);
};
