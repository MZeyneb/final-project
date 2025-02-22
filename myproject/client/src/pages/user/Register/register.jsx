import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './register.module.scss'; 
import image from "../../../assets/side-hero1.png"

const universities = [
  "Bakı Dövlət Universiteti",
  "Azərbaycan Dillər Universiteti",
  "Azərbaycan Texniki Universiteti",
  "Azərbaycan Tibb Universiteti",
  "Azərbaycan Memarlıq və İnşaat Universiteti",
  "Azərbaycan Dövlət İqtisad Universiteti",
  "Azərbaycan Dövlət Neft və Sənaye Universiteti",
  "Azərbaycan Milli Konservatoriyası",
  "Azərbaycan Dövlət Mədəniyyət və İncəsənət Universiteti",
  "Azərbaycan Turizm və Menecment Universiteti",
];

const addresses = [
  "Yasamal",
  "Nərimanov",
  "Gənclik",
  "20 Yanvar",
  "Mida",
  "Nəsimi",
  "Xətai",
  "Səbail",
  "Binəqədi",
  "Qaradağ",
  "Suraxanı",
  "Sabunçu",
  "Xəzər",
  "Əzizbəyov",
  "Həzi Aslanov",
  "Pirallahı",
  "Biləcəri",
  "Badamdar",
  "Bayıl",
  "Bakıxanov",
  "Bülbülə",
  "Əhmədli",
  "8-ci Km",
  "Lökbatan",
  "Maştağa",
  "Mərdəkan",
  "Şüvəlan",
  "Zığ",
  "Zirə",
  "Şağan",
  "Buzovna",
  "Bilgəh",
  "Nardaran",
  "Novxanı",
  "Qala",
  "Qobustan",
  "Qızıldaş",
  "Qobu",
  "Qaraçuxur",
  "Qışlaq",
  "Ramana",
  "Saray",
  "Şonqar",
  "Türkan",
  "Xırdalan",
  "Digər",
];

const Register = () => {
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  university: '',
  year: '',
  location: '',
  gender: '',
});

  const [searchUniversity, setSearchUniversity] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  const [searchAddress, setSearchAddress] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUniversitySearch = (e) => {
    const value = e.target.value;
    setSearchUniversity(value);
    setFormData({ ...formData, university: value });

    const filtered = universities.filter((uni) =>
      uni.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUniversities(filtered);
  };

  const handleAddressSearch = (e) => {
    const value = e.target.value;
    setSearchAddress(value);
    setFormData({ ...formData, location: value });

    const filtered = addresses.filter((address) =>
      address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAddresses(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/auth/register', formData);
      console.log(response.data);
      navigate('/login'); 
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('Bu email artıq istifadə olunub!');
        } else {
          setError('Qeydiyyat zamanı xəta baş verdi!');
        }
      } else {
        setError('Serverə qoşula bilmədi!');
      }
    }
  };

  return (
    <section className={styles["register"]}>
        <div className={styles["block"]}>
          <div className={styles["left"]}>
            <div className={styles["image"]}>
              <img src={image} alt="" />
            </div>
            <h1 className={styles["logo"]}>EDVANCE.</h1>
            <h3>Daha ağıllı plan, daha uğurlu tələbəlik!</h3>
          </div>
          <div className={styles["right"]}>
            <h1>Qeydiyyatdan keç!</h1>
            <hr />
            {error && <p className={styles["error-message"]}>{error}</p>}

            <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Adınız"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  required
>
  <option value="">Cinsiyyət seçin</option>
  <option value="male">Kişi</option>
  <option value="female">Qadın</option>
</select>
        <div className={styles["form-group"]}>
          <input
            type="text"
            name="university"
            placeholder="Universitet"
            value={searchUniversity}
            onChange={handleUniversitySearch}
            required
          />
          {filteredUniversities.length > 0 && (
            <ul className={styles["suggestions"]}>
              {filteredUniversities.map((uni, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchUniversity(uni);
                    setFormData({ ...formData, university: uni });
                    setFilteredUniversities([]);
                  }}
                >
                  {uni}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="number"
          name="year"
          placeholder="Təhsil ili"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <div className={styles["form-group"]}>
          <input
            type="text"
            name="location"
            placeholder="Yaşadığınız ərazi"
            value={searchAddress}
            onChange={handleAddressSearch}
            required
          />
          {filteredAddresses.length > 0 && (
            <ul className={styles["suggestions"]}>
              {filteredAddresses.map((address, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchAddress(address);
                    setFormData({ ...formData, location: address });
                    setFilteredAddresses([]);
                  }}
                >
                  {address}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Qeydiyyat</button>
        <p>Artıq bir hesabınız var? <Link to={"/login"}>Daxil olun</Link></p>
      </form>
          </div>
        </div>
      </section>
  );
};

export default Register;