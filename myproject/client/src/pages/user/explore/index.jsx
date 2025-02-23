import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import styles from "./index.module.scss";

const Explore = ({ darkMode }) => {
  const { user, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsersByUniversity = async () => {
    try {
      const res = await axios.get("http://localhost:5005/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", res.data);
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error("API response is not an array:", res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Xəta:", error.response?.data?.message || error.message);
      setUsers([]);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return fetchUsersByUniversity();

    try {
      const res = await axios.get(`http://localhost:5005/users/search?university=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Search API Response:", res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Xəta:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsersByUniversity();
  }, []);

  return (
    <div className={`${styles["explore-container"]} ${darkMode ? styles["dark-mode"] : ""}`}>
      <h2>Kəşf Et</h2>

      <form onSubmit={handleSearch} className={styles["search-form"]}>
        <input
          type="text"
          placeholder="Universitet axtar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles["search-input"]}
        />
        <button type="submit" className={styles["search-button"]}>Axtar</button>
      </form>

      {/* İstifadəçiləri göstər */}
      <div className={styles["users-list"]}>
        {!Array.isArray(users) || users.length === 0 ? (
          <p>İstifadəçi tapılmadı.</p>
        ) : (
          users.map((u) => (
            <div key={u._id} className={styles["user-item"]}>
              <img src={u.avatar} alt={u.name} className={styles["user-avatar"]} />
              <p className={styles["user-info"]}>{u.name} - {u.university}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;