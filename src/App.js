import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workshop1 from "./workshops/Workshop1";
import Workshop2 from "./workshops/Workshop2";
import Workshop3 from "./workshops/Workshop3";
import Workshop4 from "./workshops/Workshop4";
import Workshop5 from "./workshops/Workshop5";
import Workshop6 from "./workshops/Workshop6";
import Workshop7 from "./workshops/Workshop7";
import Workshop8 from "./workshops/Workshop8";
import AppChat from "./chat-ui/AppChat";
import AppChatBackend from "./chat-ui-backend/AppChat";
import Login from "./chat-ui/components/Login";
import Register from "./chat-ui/components/Register";

import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workshop1" element={<Workshop1 />} />
          <Route path="/workshop2" element={<Workshop2 />} />
          <Route path="/workshop3" element={<Workshop3 />} />
          <Route path="/workshop4" element={<Workshop4 />} />
          <Route path="/workshop5" element={<Workshop5 />} />
          <Route path="/workshop6" element={<Workshop6 />} />
          <Route path="/workshop7" element={<Workshop7 />} />
          <Route path="/workshop8" element={<Workshop8 />} />

          <Route
            path="/chatui"
            element={
              <RequireAuth>
                <AppChat />
              </RequireAuth>
            }
          />
          <Route
            path="/chatt-backend"
            element={
              <RequireAuth>
                <AppChatBackend />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
