'use client';

import React, { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import PersonalInfoForm from './personalInfoForm';
import SubjectSelectionForm from './subjectSelectionForm';
import ProgressIndicator from './progressIndicator';
import { createUser } from '@/app/lid/action/action';
interface RegistrationClientWrapperProps {
  children?: React.ReactNode;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  state: string;
  targetScore: string;
  subjects: string[];
}

// Define the server action state type
/* type ServerActionState = {
  success?: boolean;
  message?: string;
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    phone?: string[];
    state?: string[];
    targetScore?: string[];
    subjects?: string[];
  };
}; */

export default function RegistrationClientWrapper({ children }: RegistrationClientWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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

  // Initialize useFormState with the imported createUser action
  const [state, formAction] = useFormState(createUser, {
    success: false,
    message: '',
    errors: {}
  });

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

  const validatePersonalInfo = (): boolean => {
    if (!formData.fullName.trim()) {
      alert('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return false;
    }
    if (!formData.password.trim()) {
      alert('Please enter a password');
      return false;
    }
    if (!formData.confirmPassword.trim()) {
      alert('Please confirm your password');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    if (!formData.state.trim()) {
      alert('Please select your state');
      return false;
    }
    if (!formData.targetScore.trim()) {
      alert('Please select your target score');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validatePersonalInfo()) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (formData.subjects.length !== 4) {
      alert('Please select exactly 4 subjects');
      return;
    }
    
    try {
      // Get the form data from the form element
      const form = event.currentTarget;
      const submitFormData = new FormData(form);
      
      // Add the subjects data
      submitFormData.append('subjects', JSON.stringify(formData.subjects));
      
      // Call the server action with just the FormData
      await formAction(submitFormData);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  // Show success message and redirect logic
  useEffect(() => {
    if (state.success) {
      alert('Registration successful! Welcome to JAMBPrep!');
      // The server action will handle the redirect
    }
  }, [state.success]);

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
              errors={state.errors}
            />
          )}

          {/* Step 2: Subject Selection */}
          {currentStep === 2 && (
            <form onSubmit={handleSubmit}>
              {/* Add hidden inputs for all form data */}
              <input type="hidden" name="fullName" value={formData.fullName} />
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="password" value={formData.password} />
              <input type="hidden" name="phone" value={formData.phone} />
              <input type="hidden" name="state" value={formData.state} />
              <input type="hidden" name="targetScore" value={formData.targetScore} />
              
              <SubjectSelectionForm
                selectedSubjects={formData.subjects}
                onSubjectToggle={handleSubjectToggle}
                onBack={handleBack}
                onSubmit={() => {}} // This will be handled by the form onSubmit
              />
            </form>
          )}

          {/* Terms and Conditions - Only show on step 1 */}
          {currentStep === 1 && children}
        </div>

        {/* Display form state messages */}
        {state.message && (
          <div className={`mt-4 p-4 rounded-lg ${state.success ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {state.message}
          </div>
        )}
      </div>
    </main>
  );
}