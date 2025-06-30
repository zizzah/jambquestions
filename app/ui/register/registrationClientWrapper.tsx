'use client';

import React, { useState, useEffect } from 'react';
import PersonalInfoForm from './personalInfoForm';
import SubjectSelectionForm from './subjectSelectionForm';
import ProgressIndicator from './progressIndicator';
interface RegistrationClientWrapperProps {
  children?: React.ReactNode;
}

export default function RegistrationClientWrapper({ children }: RegistrationClientWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    state: '',
    targetScore: '',
    subjects: [] as string[]
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubjectToggle = (subjectId: string) => {
    setFormData(prev => {
      const currentSubjects = prev.subjects;
      const isSelected = currentSubjects.includes(subjectId);
      
      // English is required and cannot be deselected
      if (subjectId === 'english' && isSelected) {
        return prev;
      }
      
      if (isSelected) {
        // Remove subject
        return {
          ...prev,
          subjects: currentSubjects.filter(id => id !== subjectId)
        };
      } else {
        // Add subject (max 4 subjects)
        if (currentSubjects.length >= 4) {
          alert('You can only select up to 4 subjects');
          return prev;
        }
        return {
          ...prev,
          subjects: [...currentSubjects, subjectId]
        };
      }
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate personal info
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.state || !formData.targetScore) {
        alert('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Auto-select English as it's required
      if (!formData.subjects.includes('english')) {
        setFormData(prev => ({
          ...prev,
          subjects: ['english']
        }));
      }
      
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (formData.subjects.length !== 4) {
      alert('Please select exactly 4 subjects');
      return;
    }
    
    console.log('Registration data:', formData);
    alert('Registration successful! Welcome to JAMBPrep!');
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <main className="container mx-auto px-6 py-8">
      <div className={`max-w-lg mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <PersonalInfoForm
              formData={formData}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              onInputChange={handleInputChange}
              onShowPasswordToggle={() => setShowPassword(!showPassword)}
              onShowConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onNext={handleNext}
            />
          )}

          {/* Step 2: Subject Selection */}
          {currentStep === 2 && (
            <SubjectSelectionForm
              selectedSubjects={formData.subjects}
              onSubjectToggle={handleSubjectToggle}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}

          {/* Terms and Conditions - Only show on step 1 */}
          {currentStep === 1 && children}
        </div>

        {/* Additional content based on step */}
        {children}
      </div>
    </main>
  );
}