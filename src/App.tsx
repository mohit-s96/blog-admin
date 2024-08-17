import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Provider from "./components/provider/Provider";
import AuthRoute from "./utils/authRoute";
import Test from "./pages/test";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/create"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route path="/auth" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
