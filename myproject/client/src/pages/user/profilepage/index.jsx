import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { FaPencilAlt } from 'react-icons/fa'; 

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Seçilən fayl:", file); // Fayl məlumatlarını yoxlayın
//       setSelectedFile(file);
//     }
//   };

//   const handleDeleteAvatar = async () => {
//     try {
//       await updateUserAvatar(null);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Avatar silinərkən xəta:', error);
//     }
//   };

//   const handleUpdateAvatar = async () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('avatar', selectedFile);
  
//       try {
//         const response = await updateUserAvatar(formData);
//         console.log("Server cavabı:", response); // Server cavabını yoxlayın
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error('Avatar yenilənərkən xəta:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("İstifadəçi məlumatları yeniləndi:", user); // Yenilənmiş məlumatları yoxlayın
//   }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles["box"]}>
        <div className={styles.profileContainer}>
      <h1>Profilim</h1>
      <div className={styles.profileInfo}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <img src={user.avatar || 'https://via.placeholder.com/150'} alt="Avatar" />
            {/* <button className={styles.editIcon} onClick={() => setIsModalOpen(true)}>
              <FaPencilAlt />
            </button> */}
          </div>
        </div>
        <div className={styles.details}>
          <h2>Ad: <span>{user.name}</span></h2>
          <h2>Email: <span>{user.email}</span></h2>
          <h2>Cinsiyyət: <span>{user.gender}</span></h2>
          <h2>Universitet: <span>{user.university}</span></h2>
          <h2>Yaşayış yeri: <span>{user.location}</span></h2>
        </div>
      </div>


    </div>



    </div>

      );
};

export default ProfilePage;
