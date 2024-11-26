import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProdukDetail from "./pages/ProdukDetail";
import ThankYou from "./pages/ThankYou";
import SearchProduk from "./pages/SearchProduk";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./routes/Dashboard";
import Pembelian from "./routes/Pembelian";
import Produk from "./routes/Produk";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToggleFormProvider } from "./contexts/ToggleFormContext";
import User from "./routes/User";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="produk/:id" element={<ProdukDetail />} />
          <Route path="search/:query" element={<SearchProduk />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <DataProvider>
                  <ToggleFormProvider>
                    <AdminLayout />
                  </ToggleFormProvider>
                </DataProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pembelian" element={<Pembelian />} />
            <Route path="produk" element={<Produk />} />
            <Route path="user" element={<User />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
