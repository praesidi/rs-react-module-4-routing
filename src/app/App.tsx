import { Routes, Route } from "react-router";
import { Home } from "../pages/home/home";
import { Page404 } from "../pages/page-404/page-404";
import { Category } from "../pages/category/category";
import { Item } from "../pages/item/item";
import { Layout } from "../shared/components/layout/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:category" element={<Layout />}>
          <Route index element={<Category />} />
          <Route path=":id" element={<Item />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
