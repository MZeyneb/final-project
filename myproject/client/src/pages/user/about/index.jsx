import React, { useState } from 'react';
import styles from './index.module.scss';
import image from "../../../assets/girl.png"

const About = ({ darkMode }) => {
  const [visibleSections, setVisibleSections] = useState({
    who: false,
    techs: false,
    contact: false,
    social: false,
    support: false,
  });

  const toggleSection = (section) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <>
      <section className={`${styles["about"]} ${darkMode ? styles["dark-mode"] : ""}`}>
        <div className="container">
            <h2>Platformamız Haqqında</h2>
          <div className={styles["box"]}>
            <div className={styles["avat"]}>
              <div className={styles["image"]}>
              <img src={image} alt="" />
              </div>

            </div>
            <div className={styles["block"]}>
              <h5>
                Edvance, tələbələrin təhsil həyatını asanlaşdırmaq üçün yaradılmış bir platformadır. Burada tələbələr imtahanlarını planlaşdıra, kitab tövsiyələri ala, yaxınlıqdakı məkanları kəşf edə və digər tələbələrlə əlaqə qura bilərlər.
              </h5>
            </div>
          </div>
          <ul>
            <li className={styles["who"]} onClick={() => toggleSection('who')}>
              Mən Kiməm?
            </li>
            <p className={`${styles["me"]} ${visibleSections.who ? styles["visible"] : ''}`}>
              Mən Mustafazadə Zeynəb, Azərbaycan Memarlıq və İnşaat Universitetinin tələbəsiyəm və bu layihəni tələbələrin gündəlik həyatını asanlaşdırmaq üçün hazırladım. Təhsil və texnologiyaya olan marağım məni bu layihəyə yönəltdi. Bu platforma vasitəsilə tələbələrin daha effektiv və məmnuniyyətli bir təhsil həyatı yaşamasını istəyirəm.
            </p>
            <li className={styles["techs"]} onClick={() => toggleSection('techs')}>
              Texnologiyalar
            </li>
            <p className={`${styles["used"]} ${visibleSections.techs ? styles["visible"] : ''}`}>
              Bu layihə React, Node.js, Express.js və MongoDB texnologiyaları əsasında qurulub.
            </p>
            <li className={styles["contact"]} onClick={() => toggleSection('contact')}>
              Əlaqə
            </li>
            <p className={`${styles["send"]} ${visibleSections.contact ? styles["visible"] : ''}`}>
              Əgər layihə ilə bağlı təklif və ya şikayətləriniz varsa, zeynebmustafa05@gmail.com ünvanına yaza bilərsiniz.
            </p>
            <li className={styles["social"]} onClick={() => toggleSection('social')}>
              Sosial Media
            </li>
            <p className={`${styles["follow"]} ${visibleSections.social ? styles["visible"] : ''}`}>
              Məni <a href="https://www.linkedin.com/in/zeyn%C9%99b-mustafazad%C9%99-54b857268/">Linkedin</a> üzərindən izləyə bilərsiniz.
            </p>
            <li className={styles["support"]} onClick={() => toggleSection('support')}>
              Təşəkkür
            </li>
            <p className={`${styles["thanks"]} ${visibleSections.support ? styles["visible"] : ''}`}>
              Bu layihənin hazırlanmasında dəstək olan dostlarıma və ailəmə xüsusi təşəkkürümü bildirirəm.
            </p>
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;