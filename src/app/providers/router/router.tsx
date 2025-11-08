import { PrivateRoute } from '../../../shared/components/private-route/private-route';
import { Routes, Route, Outlet } from 'react-router';
import { lazy, Suspense, type ReactElement, type ReactNode } from 'react';
import { Loader } from '../../../shared/components/loader/loader';
import { ErrorBoundary } from '../../../shared/components/error-boundary/error-boundary';

const Home = lazy(() => import('../../../pages/home/home').then(module => ({ default: module.Home })));

const Catalog = lazy(() => import('../../../pages/catalog/catalog').then(module => ({ default: module.Catalog })));
const Location = lazy(() => import('../../../pages/location/location').then(module => ({ default: module.Location })));
const Character = lazy(() => import('../../../pages/character/character').then(module => ({ default: module.Character })));
const Episode = lazy(() => import('../../../pages/episode/episode').then(module => ({ default: module.Episode })));

const SignIn = lazy(() => import('../../../pages/sign-in/sign-in').then(module => ({ default: module.SignIn })));
const Page404 = lazy(() => import('../../../pages/page-404/page-404').then(module => ({ default: module.Page404 })));
const Layout = lazy(() => import('../../../shared/components/layout/layout').then(module => ({ default: module.Layout })));

interface RouteWrapperProps {
	children: React.ReactNode;
	fallback?: ReactElement;
}

export const RouteWrapper: React.FC<RouteWrapperProps> = ({ children, fallback }) => {
	return (
		<Suspense fallback={<Loader fullscreen />}>
			<ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
		</Suspense>
	);
};

const PrivateCatalogLayout: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <PrivateRoute>
            <Suspense fallback={<Loader fullscreen />}>
                <Layout>{children}</Layout>
            </Suspense>
        </PrivateRoute>
    );
};


export const Router = () => {
	return (
		<Routes>
			{/* home */}
			<Route
				path="/"
				element={
					<RouteWrapper>
						<Home />
					</RouteWrapper>
				}
			/>

			<Route 
                path="/locations"
                element={
                    <PrivateCatalogLayout>
                        <Outlet/>
                    </PrivateCatalogLayout>
                }
            >
				<Route index element={<Catalog catalog="locations" />} />
				<Route path=":id" element={<Location />} />
			</Route>

			<Route
                path="/episodes"
                element={
                    <PrivateCatalogLayout>
                        <Outlet/>
                    </PrivateCatalogLayout>
                }
            >
				<Route index element={<Catalog catalog="episodes" />} />
				<Route path=":id" element={<Episode />} />
			</Route>

			<Route
                path="/characters"
                element={
                    <PrivateCatalogLayout>
                        <Outlet/>
                    </PrivateCatalogLayout>
                }
            >
				<Route index element={<Catalog catalog="characters" />} />
				<Route path=":id" element={<Character />} />
			</Route>

			<Route
				path="sign_in"
				element={
					<RouteWrapper>
						<SignIn />
					</RouteWrapper>
				}
			/>

			{/* 404 */}
			<Route
				path="*"
				element={
					<RouteWrapper>
						<Page404 />
					</RouteWrapper>
				}
			/>
		</Routes>
	);
};
