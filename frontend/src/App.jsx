import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import HelperDashboard from "./pages/HelperDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RecordDetails from "./pages/RecordDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
<Route
  path="/doctor"
  element={<DoctorDashboard />}
/>

<Route
  path="/helper"
  element={<HelperDashboard />}
/>
<Route
  path="/record/:id"
  element={<RecordDetails />}
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;