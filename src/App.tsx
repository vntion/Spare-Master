import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { SnackBarProvider } from "./contexts/SnackBarContext";
import { ToggleFormProvider } from "./contexts/ToggleFormContext";
import AdminLayout from "./pages/AdminLayout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProdukDetail from "./pages/ProdukDetail";
import RiwayatPembelian from "./pages/RiwayatPembelian";
import SearchProduk from "./pages/SearchProduk";
import SignUp from "./pages/SignUp";
import ThankYou from "./pages/ThankYou";
import Account from "./routes/Account";
import Dashboard from "./routes/Dashboard";
import Pembelian from "./routes/Pembelian";
import Produk from "./routes/Produk";
import ProtectedRoute from "./routes/ProtectedRoute";
import User from "./routes/User";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="produk/:id" element={<ProdukDetail />} />
          <Route path="search/:query" element={<SearchProduk />} />
          <Route path="cart" element={<Cart />} />
          <Route path="riwayat" element={<RiwayatPembelian />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <DataProvider>
                  <SnackBarProvider>
                    <ToggleFormProvider>
                      <AdminLayout />
                    </ToggleFormProvider>
                  </SnackBarProvider>
                </DataProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pembelian" element={<Pembelian />} />
            <Route path="account" element={<Account />} />
            <Route path="produk" element={<Produk />} />
            <Route path="user" element={<User />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
