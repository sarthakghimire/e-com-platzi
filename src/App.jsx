import { Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./pages/LoginForm";
import AdminPanel from "./pages/admin/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="customer">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute requiredRole="customer">
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute requiredRole="customer">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute requiredRole="customer">
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
