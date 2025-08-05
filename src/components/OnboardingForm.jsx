import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

// Animations
const float3D = keyframes`
  0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
  25% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg); }
  50% { transform: translateY(0) rotateX(0deg) rotateY(10deg); }
  75% { transform: translateY(-10px) rotateX(5deg) rotateY(0deg); }
`;

const buttonPress = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(4px) scale(0.98); }
  100% { transform: translateY(0) scale(1); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Global Animated Background
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: ${gradientBG} 15s ease infinite;
    min-height: 100vh;
    margin: 0;
    padding: 2rem;
    font-family: 'Montserrat', sans-serif;
  }
`;

// Styled Components
const FormContainer = styled(motion.div)`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: linear-gradient(145deg, #f8f9fa, #ffffff);
  border-radius: 20px;
  box-shadow: 
    15px 15px 30px rgba(0,0,0,0.1),
    -15px -15px 30px rgba(255,255,255,0.8),
    inset 5px 5px 10px rgba(255,255,255,0.5),
    inset -5px -5px 10px rgba(0,0,0,0.05);
  transform-style: preserve-3d;
  perspective: 1000px;
  border: 1px solid rgba(255,255,255,0.3);
  position: relative;
  overflow: hidden;
  animation: ${float3D} 8s ease-in-out infinite;
  backdrop-filter: blur(5px);
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(100, 200, 255, 0.2) 0%,
      rgba(255, 200, 150, 0.2) 100%
    );
    z-index: -1;
    border-radius: inherit;
  }
`;

const FormTitle = styled(motion.h2)`
  color: transparent;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 2.2rem;
  text-shadow: 
    2px 2px 4px rgba(0,0,0,0.1),
    -1px -1px 1px rgba(255,255,255,0.8);
  position: relative;
  transform: translateZ(20px);
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  background-clip: text;

  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    margin: 1rem auto 0;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
  transform-style: preserve-3d;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  color: #34495e;
  font-weight: 600;
  font-size: 1rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
  transform: translateZ(10px);
  padding-left: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: linear-gradient(145deg, #ffffff, #f0f2f5);
  box-shadow: 
    5px 5px 10px rgba(0,0,0,0.1),
    -5px -5px 10px rgba(255,255,255,0.8),
    inset 2px 2px 5px rgba(255,255,255,0.5),
    inset -2px -2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  transform: translateZ(0);
  
  &:focus {
    outline: none;
    box-shadow: 
      0 0 0 3px rgba(255, 138, 0, 0.3),
      8px 8px 15px rgba(0,0,0,0.1),
      -8px -8px 15px rgba(255,255,255,0.8);
    transform: translateZ(10px);
  }

  &::placeholder {
    color: #aaa;
    font-weight: 300;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1.1rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: linear-gradient(145deg, #ffffff, #f0f2f5);
  box-shadow: 
    5px 5px 10px rgba(0,0,0,0.1),
    -5px -5px 10px rgba(255,255,255,0.8),
    inset 2px 2px 5px rgba(255,255,255,0.5),
    inset -2px -2px 5px rgba(0,0,0,0.05);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23444' stroke='%23444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.2rem center;
  background-size: 1em;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  transform: translateZ(0);
  
  &:focus {
    outline: none;
    box-shadow: 
      0 0 0 3px rgba(255, 138, 0, 0.3),
      8px 8px 15px rgba(0,0,0,0.1),
      -8px -8px 15px rgba(255,255,255,0.8);
    transform: translateZ(10px);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.1rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background: linear-gradient(145deg, #ffffff, #f0f2f5);
  box-shadow: 
    5px 5px 10px rgba(0,0,0,0.1),
    -5px -5px 10px rgba(255,255,255,0.8),
    inset 2px 2px 5px rgba(255,255,255,0.5),
    inset -2px -2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  transform: translateZ(0);
  
  &:focus {
    outline: none;
    box-shadow: 
      0 0 0 3px rgba(255, 138, 0, 0.3),
      8px 8px 15px rgba(0,0,0,0.1),
      -8px -8px 15px rgba(255,255,255,0.8);
    transform: translateZ(10px);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.3rem;
  background: linear-gradient(145deg, #ff8a00, #e52e71);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  box-shadow: 
    8px 8px 15px rgba(0,0,0,0.1),
    -5px -5px 10px rgba(255,255,255,0.5),
    0 5px 0 rgba(229, 46, 113, 0.7);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.2s ease;
  transform: translateZ(0);
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #e52e71, #ff8a00);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
  }
  
  span {
    position: relative;
    z-index: 2;
    display: block;
    transform: translateZ(20px);
  }
  
  &:hover {
    transform: translateZ(10px) translateY(-3px);
    box-shadow: 
      10px 10px 20px rgba(0,0,0,0.1),
      -5px -5px 10px rgba(255,255,255,0.5),
      0 8px 0 rgba(229, 46, 113, 0.7);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    animation: ${buttonPress} 0.3s ease;
    transform: translateZ(5px) translateY(2px);
    box-shadow: 
      5px 5px 10px rgba(0,0,0,0.1),
      -3px -3px 5px rgba(255,255,255,0.5),
      0 2px 0 rgba(229, 46, 113, 0.7);
  }
  
  &:disabled {
    background: linear-gradient(145deg, #95a5a6, #7f8c8d);
    box-shadow: 
      5px 5px 10px rgba(0,0,0,0.1),
      -3px -3px 5px rgba(255,255,255,0.5),
      0 5px 0 rgba(127, 140, 141, 0.7);
    cursor: not-allowed;
    transform: translateZ(0);
    
    &:hover {
      box-shadow: 
        5px 5px 10px rgba(0,0,0,0.1),
        -3px -3px 5px rgba(255,255,255,0.5),
        0 5px 0 rgba(127, 140, 141, 0.7);
      transform: translateZ(0);
    }
  }
  
  &.success {
    background: linear-gradient(145deg, #00b09b, #96c93d);
    box-shadow: 
      8px 8px 15px rgba(0,0,0,0.1),
      -5px -5px 10px rgba(255,255,255,0.5),
      0 5px 0 rgba(150, 201, 61, 0.7);
    
    &::before {
      background: linear-gradient(145deg, #96c93d, #00b09b);
    }
    
    &:hover {
      box-shadow: 
        10px 10px 20px rgba(0,0,0,0.1),
        -5px -5px 10px rgba(255,255,255,0.5),
        0 8px 0 rgba(150, 201, 61, 0.7);
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding: 0.8rem;
  background: linear-gradient(145deg, #fff0f0, #ffe6e6);
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
  box-shadow: 
    3px 3px 5px rgba(0,0,0,0.05),
    -3px -3px 5px rgba(255,255,255,0.5);
  transform-style: preserve-3d;
  transform: translateZ(5px);
`;

const SuccessMessage = styled(motion.div)`
  color: #27ae60;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.3rem;
  background: linear-gradient(145deg, #f0fff4, #e6ffe8);
  border-radius: 12px;
  border-left: 4px solid #27ae60;
  box-shadow: 
    5px 5px 10px rgba(0,0,0,0.05),
    -5px -5px 10px rgba(255,255,255,0.5);
  transform-style: preserve-3d;
  transform: translateZ(10px);
  position: relative;
  
  &::after {
    content: "✓";
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) translateZ(15px);
    font-size: 1.5rem;
    color: #27ae60;
  }
`;

const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    propertyType: "",
    budget: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    const { fullName, mobile, email } = formData;
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!mobileRegex.test(mobile)) newErrors.mobile = "Please enter a valid mobile number";
    if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validate()) return;
  
  setIsSubmitting(true);
  
  try {
    await axios.post("http://localhost:5000/api/submit", formData);

    setSubmitSuccess(true);
    setTimeout(() => {
      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        city: "",
        propertyType: "",
        budget: "",
        message: ""
      });
      setSubmitSuccess(false);
      navigate("/thank-you"); // Added navigation here
    }, 3000);
  } catch (error) {
    console.error(error);
    setErrors({ submit: "Submission failed. Please try again later." });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
      <GlobalStyle />
      <FormContainer
        initial={{ opacity: 0, rotateX: -15 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FormTitle
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Property Inquiry
        </FormTitle>
        
        {submitSuccess && (
          <SuccessMessage
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring" }}
          >
            Thank you! Your form has been submitted successfully.
          </SuccessMessage>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Label>Full Name</Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <ErrorMessage
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {errors.fullName}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Label>Mobile Number</Label>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              type="tel"
            />
            {errors.mobile && (
              <ErrorMessage
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {errors.mobile}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Label>Email Address</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              type="email"
            />
            {errors.email && (
              <ErrorMessage
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {errors.email}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Label>City of Interest</Label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter preferred city"
            />
          </FormGroup>
          
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Label>Property Type</Label>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Villa">Villa</option>
              <option value="Farmhouse">Farmhouse</option>
            </Select>
          </FormGroup>
          
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Label>Budget Range</Label>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your budget range"
            />
          </FormGroup>
          
          <FormGroup
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Label>Additional Comments</Label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any specific requirements or comments"
            />
          </FormGroup>
          
          {errors.submit && (
            <ErrorMessage
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {errors.submit}
            </ErrorMessage>
          )}
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            className={submitSuccess ? "success" : ""}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
          </SubmitButton>
        </form>
      </FormContainer>
    </>
  );
};

export default OnboardingForm;