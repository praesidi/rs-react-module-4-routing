import { PrivateRoute } from "../../../shared/components/private-route/private-route";
import { Routes, Route } from "react-router";
import { CategoryItem } from "../../../pages/category-item/category-item";
import { Category } from "../../../pages/category/category";
import { Home } from "../../../pages/home/home";
import { Page404 } from "../../../pages/page-404/page-404";
import { SignIn } from "../../../pages/sign-in/sign-in";
import { Layout } from "../../../shared/components/layout/layout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/:category"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Category />} />
        <Route path=":id" element={<CategoryItem />} />
      </Route>

      <Route path="sign_in" element={<SignIn />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
