import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import image from "../../../assets/side-hero1.png";
import { auth, provider } from "../../../constants/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../../../context/authContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [welcomeText, setWelcomeText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login, logout } = useAuth(); 
  const fullText = "Xoş gəldiniz!";

  useEffect(() => {
    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setWelcomeText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 130);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      login(response.data.user);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("Email və ya şifrə yanlışdır!");
        } else if (error.response.status === 404) {
          setError("İstifadəçi tapılmadı!");
        } else {
          setError("Giriş zamanı xəta baş verdi!");
        }
      } else {
        setError("Serverə qoşula bilmədi!");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const response = await axios.post("http://localhost:5005/auth/google", {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      });
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        login(response.data.user); 
        navigate("/"); 
      } else {
        console.error("Token alınmadı!");
        setError("Serverdən düzgün cavab gəlmədi!");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("Google ilə giriş zamanı xəta baş verdi!");
    }
  };
  return (
    <section className={styles["login"]}>
      <div className={styles["block"]}>
        <div className={styles["left"]}>
          <div className={styles["image"]}>
            <img src={image} alt="" />
          </div>
          <h1 className={styles["logo"]}>EDVANCE.</h1>
          <h3>Daha ağıllı plan, daha uğurlu tələbəlik!</h3>
        </div>
        <div className={styles["right"]}>
          <h1>{welcomeText}</h1>
          <hr />
          
          {user ? (
            
            <div className={styles["user-info"]}>
              <h2>Salam, {user.name}!</h2>
              {user.avatar && <img src={user.avatar} alt="User Avatar" className={styles["user-avatar"]} />}
              <button onClick={logout} className={styles["logout-button"]}>Çıxış</button>
            </div>
          ) : (
            
            <>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Şifrə"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {error && <p className={styles["error-text"]}>{error}</p>}
                <button type="submit">Giriş</button>
              </form>
              
              <button className={styles["gsiMaterialButton"]} onClick={handleGoogleLogin}>
                <div className={styles["gsiMaterialButtonContentWrapper"]}>
                  <div className={styles["gsiMaterialButtonIcon"]}>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      style={{ display: "block" }}
                    >
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  </div>
                  <span>Sign in with Google</span>
                </div>
              </button>

              <p>
                Hesabınız yoxdur? indi <Link to={"/register"}>Qeydiyyatdan keç</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
