import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Home from "./pages/home/Home.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import { testEncryption } from "./utils/encryptionTest.js";

function App() {
  const { authUser } = useAuthContext();
  
  // Run encryption test in development
  if (import.meta.env.DEV) {
    useState(() => {
      setTimeout(testEncryption, 2000);
    });
  }
  
  return (
    <div className="min-h-screen bg-[#1E1F22] overflow-hidden">
      <div className={`flex items-center justify-center min-h-screen ${!authUser ? "p-4" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={!authUser ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#313338',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.24)'
          },
          success: {
            iconTheme: {
              primary: '#23a559',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#da373c',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
