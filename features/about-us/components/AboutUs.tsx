import Image from "next/image";
import React from "react";

//Styles
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.about}>
      <Image
        className={styles.mainImage}
        src="/images/about-main.png"
        alt=""
        fill
      />
      <section className={styles.section}>
        <h2 className={styles.title}>Our Mission</h2>
        <p>
          At <strong>Luxe</strong>, we aim to bridge the gap between people and
          technology, offering high-quality electronics that enhance everyday
          life. Whether it’s for work, entertainment, or smart living, we’re
          committed to delivering innovative solutions at the best value.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Our Values</h2>
        <ul className={styles.list}>
          <li>
            <strong>Innovation:</strong> Embracing the latest trends and
            technologies to bring you the best.
          </li>
          <li>
            <strong>Customer-Centricity:</strong> Putting your needs first with
            exceptional service and support.
          </li>
          <li>
            <strong>Sustainability:</strong> Promoting eco-friendly products and
            practices for a better future.
          </li>
          <li>
            <strong>Quality:</strong> Partnering with trusted brands to ensure
            reliability and performance.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Our Story</h2>
        <p>
          Founded in 2020, <strong>Luxe</strong> began as a small online store
          with a passion for making technology accessible to everyone. Over the
          years, we’ve grown into a global platform, serving thousands of
          satisfied customers. Our commitment to innovation and customer
          satisfaction has made us a leader in the electronics industry.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Meet the Team</h2>
        <p>
          Behind every great product and service is a team of passionate
          individuals. Our diverse team of experts includes tech enthusiasts,
          customer support specialists, and logistics professionals working
          together to ensure you have a seamless shopping experience.
        </p>
        <div className={styles.section}>
          <div className={styles.teamMembers}>
            <div className={styles.member}>
              <Image
                className={styles.image}
                src="/images/team-member1.webp"
                alt=""
                width={180}
                height={180}
              />
              <p>CEO</p>
              <strong>John Doe</strong>
            </div>
            <div className={styles.member}>
              <Image
                className={styles.image}
                src="/images/team-member2.webp"
                alt=""
                width={180}
                height={180}
              />
              <p>Head of Operations</p>
              <strong>Jane Smith</strong>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Looking Ahead</h2>
        <p>
          As we continue to grow, our focus remains on enhancing your experience
          with innovative products, faster delivery, and more sustainable
          practices. We’re also planning to expand our range of smart home
          devices and eco-friendly electronics to meet the evolving needs of our
          customers.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Explore Our Products</h2>
        <p>
          Ready to upgrade your tech? Browse our wide selection of electronics
          and discover what’s possible.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
