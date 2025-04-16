import React from "react";

//Styles
import styles from "./Contact.module.scss";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.headline}>
        <h2>Contact Us</h2>
        <p>
          Feel free to reach out to us using the contact form below or via the
          details provided.
        </p>
      </div>
      <div className={styles.contactWrapper}>
        <ContactForm />
        <div className={styles.contactDetails}>
          <h3>Contact Details</h3>
          <p>
            <strong>Email:</strong> support@luxe.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Address:</strong>
          </p>
          <p>
            123 Electronics Avenue
            <br />
            Tech City, TX 75001
          </p>
          <p>
            <strong>Support Hours:</strong>
          </p>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
