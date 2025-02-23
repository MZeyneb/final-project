const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5005/auth/refresh-token", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.data.token;
    } catch (error) {
      console.error("Xəta:", error.response?.data?.message || error.message);
    }
  };
  
  export default refreshToken;