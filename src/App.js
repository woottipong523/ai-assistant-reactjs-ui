// App.js
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/workshop1" element={<Workshop1 />} />
        <Route path="/workshop2" element={<Workshop2 />} />
        <Route path="/workshop3" element={<Workshop3 />} />
        <Route path="/workshop4" element={<Workshop4 />} />
        <Route path="/workshop5" element={<Workshop5 />} />
        <Route path="/workshop6" element={<Workshop6 />} />
        <Route path="/workshop7" element={<Workshop7 />} />
        <Route path="/workshop8" element={<Workshop8 />} />
        <Route path="/chatui" element={<AppChat />} />
        <Route path="/chatt-backend" element={<AppChatBackend />} />
        
      </Routes>
    </Router>
  );
}

export default App;
