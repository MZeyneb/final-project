import React from 'react';
import styles from './home.module.scss';
import image from "../../../assets/girl-moon.png"
import { FaCalendarAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { MdForum } from "react-icons/md";
import image2 from "../../../assets/calendar.png"
import image3 from "../../../assets/Books.png"
import image4 from "../../../assets/Speech.png"
import image5 from "../../../assets/Confused.png"
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';



const Home = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const box2Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const box3Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
    <div className={styles["home"]}>
    <section className={styles["hero"]}>
      <div className="container">
    <div className={styles["box"]}>
    <div className={styles["block"]}>
    <div className={styles["text"]}>
    <h1>Bizim məqsədimiz, sizin uğurunuzdur!</h1>
    <p>Azərbaycan tələbələri üçün xüsusi hazırlanmış, sosial və şəxsi inkişaf platforması.</p>
    </div>
    <div className={styles["image"]}>
      <img src={image} alt=""/>
    </div>

    </div>

    </div>

      </div>
    </section>

    <section className={styles["features"]}>
      <div className="container">
        <h2>Tələbələr üçün ən vacib alətlər bir yerdə!</h2>
      <div className={styles["box"]}>
      <div className={styles["card"]}>
      <FaCalendarAlt className={styles["calendar"]}/>
      <h3>Planlayıcı</h3>
      <h4> İmtahan tarixlərini, xüsusi günləri qeyd et və vaxtını düzgün idarə et!</h4>
      </div>
      <div className={styles["card"]}>
      <IoBookSharp className={styles["book"]}/>
      <h3>Kitab Tövsiyələri</h3>
      <h4>Sevdiyin kitabları izləyib başqalarına tövsiyə et.</h4>
      </div><div className={styles["card"]}>
      <MdForum className={styles["forum"]}/>
      <h3>Forum</h3>
      <h4> Universitet yoldaşlarınla sual-cavab müzakirələri apar.</h4>
      </div>


      </div>

      </div>


    </section>

    <section className={styles["planner"]}>
    <div className="container">
      <div className={styles["box"]}>
        <div className={styles["avat"]}>
          <div className={styles["image"]}>
        <img src={image2} alt=""/>

          </div>
        </div>
        <div className={styles["text"]}>
        <h2>Planlayıcı</h2>
        <h4>Universitet həyatı təkcə dərslərlə məhdudlaşmır. Bəzən bir sualın cavabını tapmaq üçün saatlarla axtarış edirik, bəzən isə təcrübəli birinin tövsiyəsinə ehtiyac duyuruq. Forum bölməsi məhz bu məqsədlə yaradılıb – tələbələrin bir-birinə dəstək olduğu, suallarına cavab tapdığı və faydalı müzakirələr apardığı bir icma!</h4>
        </div>

      </div>
      <div className={styles["box2"]}>
        <div className={styles["text"]}>
        <h2>Forum</h2>
        <h4>Universitet həyatı təkcə dərslərlə məhdudlaşmır. Bəzən bir sualın cavabını tapmaq üçün saatlarla axtarış edirik, bəzən isə təcrübəli birinin tövsiyəsinə ehtiyac duyuruq. Forum bölməsi məhz bu məqsədlə yaradılıb – tələbələrin bir-birinə dəstək olduğu, suallarına cavab tapdığı və faydalı müzakirələr apardığı bir icma!</h4>
        </div>
        <div className={styles["avat"]}>
          <div className={styles["image"]}>
        <img src={image3} alt=""/>

          </div>
        </div>

      </div>

      <div className={styles["box3"]}>
        <div className={styles["avat"]}>
          <div className={styles["image"]}>
        <img src={image4} alt=""/>

          </div>
        </div>
        <div className={styles["text"]}>
        <h2>Forum</h2>
        <h4>Universitet həyatı təkcə dərslərlə məhdudlaşmır. Bəzən bir sualın cavabını tapmaq üçün saatlarla axtarış edirik, bəzən isə təcrübəli birinin tövsiyəsinə ehtiyac duyuruq. Forum bölməsi məhz bu məqsədlə yaradılıb – tələbələrin bir-birinə dəstək olduğu, suallarına cavab tapdığı və faydalı müzakirələr apardığı bir icma!</h4>
        </div>

      </div>
    </div>
    </section>

    <section className={styles["questions"]}>
      <div className="container">
      <div className={styles["box"]}>
      <div className={styles["avat"]}>
      <div className={styles["image"]}>
      <img src={image5} alt="" />
      </div>

      </div>

      <div className={styles["feedback"]}>
        <h2>Suallarınız və Təklifləriniz Var?</h2>
        <p>platformanı daha faydalı etmək üçün sənin fikirlərin bizim üçün önəmlidir!</p>
      <div className={styles["send"]}>
    <input type="email" placeholder=''/>
    <button>Gonder</button>

      </div>

      </div>

      </div>

      </div>


    </section>

   

    </div>
    </>
  );
};

export default Home;
