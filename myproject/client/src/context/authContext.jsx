import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      console.log("LocalStorage-dan istifadəçi məlumatları:", storedUser); 
    }
  }, []);

  const login = (userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      console.error("Login error: userData is null or undefined");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };


  const updateUserAvatar = async (file) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('avatar', file);
      }

      const response = await axios.put('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data.user); 
    } catch (error) {
      console.error('Avatar yenilənərkən xəta:', error);
      throw error;
    }
  };


  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
