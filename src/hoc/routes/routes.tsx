import { Routes, Route } from "react-router-dom";
import {
  CartPage,
  CataloguePage,
  ProductPage,
  HomePage,
  ErrorPage,
  TasksPage,
  AdminPage,
} from "../../pages";

export const RoutesHOC = () => {
  return (
    <Routes>
      <Route path="/task" element={<TasksPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
