import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ThankYouContainer = styled.div`
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ThankYouTitle = styled(motion.h1)`
  color: #2a52be;
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ThankYouMessage = styled(motion.p)`
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 2rem;
`;

const ThankYouImage = styled(motion.div)`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: white;
`;

function ThankYouPage() {
  return (
    <ThankYouContainer>
      <ThankYouTitle
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Thank You!
      </ThankYouTitle>
      
      <ThankYouMessage
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Your submission has been received successfully.
      </ThankYouMessage>
      
      <ThankYouMessage
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Our team will contact you shortly.
      </ThankYouMessage>
      
      <ThankYouImage
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
      >
        ✓
      </ThankYouImage>
    </ThankYouContainer>
  );
}

export default ThankYouPage;