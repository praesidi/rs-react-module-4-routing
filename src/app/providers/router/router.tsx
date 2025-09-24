import { PrivateRoute } from "../../../shared/components/private-route/private-route";
import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { Loader } from "../../../shared/components/loader/loader";

const Home = lazy(() => import('../../../pages/home/home').then(module => ({default: module.Home})));
const Category = lazy(() => import('../../../pages/category/category').then(module => ({default: module.Category})));
const CategoryItem = lazy(() => import('../../../pages/category-item/category-item').then(module => ({default: module.CategoryItem})));
const SignIn = lazy(() => import('../../../pages/sign-in/sign-in').then(module => ({default: module.SignIn})));
const Page404 = lazy(() => import('../../../pages/page-404/page-404').then(module => ({default: module.Page404})));
const Layout = lazy(() => import('../../../shared/components/layout/layout').then(module => ({default: module.Layout})));

export const Router = () => {
  return (
    <Routes>
      {/* home */}
      <Route 
        path="/"
        element={
          <Suspense fallback={<Loader fullscreen/>}>
            <Home />
          </Suspense>
        }
      />

      {/* category / item */}
      <Route
        path="/:category"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loader fullscreen/>}>
              <Layout />
            </Suspense>
          </PrivateRoute>
        }
      >
        <Route index element={<Category />} />
        <Route path=":id" element={<CategoryItem />} />
      </Route>

      {/* sign in */}
      <Route
        path="sign_in"
        element={
          <Suspense fallback={<Loader fullscreen/>}>
            <SignIn />
          </Suspense>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader fullscreen/>}>
            <Page404 />
          </Suspense>
        }
      />
    </Routes>
  );
};
