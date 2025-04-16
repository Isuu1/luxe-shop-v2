"use client";

import Image from "next/image";
import React, { useState } from "react";

//Icons
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
//Styles
import styles from "./FAQ.module.scss";

const FAQ = () => {
  const faq = [
    {
      id: 1,
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the My Orders section.",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be in original condition and packaging.",
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to many countries worldwide. Shipping fees and delivery times vary by location.",
    },
    {
      id: 4,
      question: "How do I reset my password?",
      answer:
        "Click on Forgot Password on the login page and follow the instructions sent to your email.",
    },
    {
      id: 5,
      question: "How can I contact customer support?",
      answer:
        "You can use the contact form below or reach us via the provided contact details.",
    },
  ];

  const [answerId, setAnswerId] = useState<number | null>(null);

  const handleAnswerVisibility = (itemId: number) => {
    setAnswerId(answerId === itemId ? null : itemId);
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.headline}>
        <h2>Support & FAQs</h2>
        <p>
          Find answers to common questions or contact us for further assistance.
        </p>
      </div>
      <div className={styles.faqWrapper}>
        <div className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          {faq.map((item) => (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => handleAnswerVisibility(item.id)}
            >
              <p className={styles.question}>
                {item.question}
                {answerId === item.id ? <FaMinus /> : <FaPlus />}
              </p>
              {answerId === item.id && (
                <p className={styles.answer}>{item.answer}</p>
              )}
            </div>
          ))}
        </div>
        <Image className={styles.image} src="/images/faq.png" alt="FAQ" fill />
      </div>
    </div>
  );
};

export default FAQ;
