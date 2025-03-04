'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FormPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [formTouched, setFormTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Track valid state for each field
  const [validFields, setValidFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  // Validation functions
  const validateFirstName = (value: string) => (!value.trim() ? 'First name is required' : '');
  const validateLastName = (value: string) => (!value.trim() ? 'Last name is required' : '');
  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Valid email required';
    return '';
  };
  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be ≥6 characters';
    return '';
  };

  // Change handlers
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setFormTouched(true);
    const error = validateFirstName(value);
    setErrors((prev) => ({ ...prev, firstName: error || undefined }));
    setValidFields(prev => ({ ...prev, firstName: !error && value.trim().length > 0 }));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setFormTouched(true);
    const error = validateLastName(value);
    setErrors((prev) => ({ ...prev, lastName: error || undefined }));
    setValidFields(prev => ({ ...prev, lastName: !error && value.trim().length > 0 }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setFormTouched(true);
    const error = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: error || undefined }));
    setValidFields(prev => ({ ...prev, email: !error && value.trim().length > 0 }));
  };

  const handlePasswordBlur = () => {
    setFormTouched(true);
    if (passwordRef.current) {
      const value = passwordRef.current.value;
      const error = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: error || undefined }));
      setValidFields(prev => ({ ...prev, password: !error && value.length > 0 }));
    }
  };

  // Add password change handler to update in real-time
  const handlePasswordChange = () => {
    if (passwordRef.current) {
      const value = passwordRef.current.value;
      const error = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: error || undefined }));
      setValidFields(prev => ({ ...prev, password: !error && value.length > 0 }));
    }
  };

  // Form validation
  const validateForm = () => {
    const currentPassword = passwordRef.current?.value || '';
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(currentPassword);
    
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
    } = {};
    
    if (firstNameError) newErrors.firstName = firstNameError;
    if (lastNameError) newErrors.lastName = lastNameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if all fields are valid
  const allFieldsValid = 
    validFields.firstName && 
    validFields.lastName && 
    validFields.email && 
    validFields.password;

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    
    if (validateForm()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setSubmissionStatus('success');
    } else {
      setSubmissionStatus('error');
    }
  };

  // Cursor follower effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 dark:from-blue-900 dark:to-purple-900 p-4 sm:p-8 lg:p-12 relative overflow-hidden flex items-center justify-center">
      {/* Color test circles to verify color display */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <div className="w-8 h-8 bg-red-500 rounded-full"></div>
        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
      
      {/* Grid background - use inline style for gradient to ensure it works */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(to right, rgba(128,128,128,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      
      {/* Cursor follower - using inline styles to ensure the dynamic positioning works */}
      <div 
        className="hidden lg:block fixed w-64 h-64 rounded-full pointer-events-none mix-blend-screen blur-3xl"
        style={{
          left: `${mousePosition.x - 128}px`,
          top: `${mousePosition.y - 128}px`,
          transition: 'transform 0.1s ease-out',
          transform: 'translate3d(0, 0, 0)',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(79,70,229,0.1))'
        }}
      />
      
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit}
        className="relative w-full max-w-md mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl shadow-blue-500/30 border border-white/40 dark:border-white/10 overflow-hidden z-10"
      >
        {/* Form background gradient - use inline style to ensure it works */}
        <div className="absolute inset-0 -z-10" style={{
          background: 'linear-gradient(135deg, rgba(219,234,254,0.5), rgba(224,231,255,0.5))',
        }} />
        
        {/* Form title with direct color style */}
        <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#2563eb' }}>
          Sign Up
        </h2>

        {/* First Name Field */}
        <div className="mb-8">
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
            First Name
          </label>
          <div className="relative group h-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ maxWidth: '24px', maxHeight: '24px' }}>
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                stroke={errors.firstName ? '#ef4444' : validFields.firstName ? '#10b981' : '#94a3b8'} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="First name"
              className="w-full h-full pl-10 pr-10 rounded-lg border transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none group-hover:border-slate-300 dark:group-hover:border-slate-600"
              style={{
                borderColor: errors.firstName ? '#fca5a5' : validFields.firstName ? '#86efac' : '#e2e8f0',
                backgroundColor: errors.firstName ? 'rgba(254,226,226,0.5)' : 'transparent'
              }}
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
            />
            {validFields.firstName && !errors.firstName && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="rounded-full p-1 bg-green-200 dark:bg-green-700">
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="#15803d"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.firstName && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center text-sm"
              style={{ color: '#dc2626' }}
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.firstName}
            </motion.div>
          )}
        </div>

        {/* Last Name Field */}
        <div className="mb-8">
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
            Last Name
          </label>
          <div className="relative group h-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ maxWidth: '24px', maxHeight: '24px' }}>
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                stroke={errors.lastName ? '#ef4444' : validFields.lastName ? '#10b981' : '#94a3b8'} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Last name"
              className="w-full h-full pl-10 pr-10 rounded-lg border transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none group-hover:border-slate-300 dark:group-hover:border-slate-600"
              style={{
                borderColor: errors.lastName ? '#fca5a5' : validFields.lastName ? '#86efac' : '#e2e8f0',
                backgroundColor: errors.lastName ? 'rgba(254,226,226,0.5)' : 'transparent'
              }}
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
            />
            {validFields.lastName && !errors.lastName && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="rounded-full p-1 bg-green-200 dark:bg-green-700">
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="#15803d"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.lastName && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center text-sm"
              style={{ color: '#dc2626' }}
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.lastName}
            </motion.div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-8">
          <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
            Email
          </label>
          <div className="relative group h-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ maxWidth: '24px', maxHeight: '24px' }}>
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                stroke={errors.email ? '#ef4444' : validFields.email ? '#10b981' : '#94a3b8'} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              className="w-full h-full pl-10 pr-10 rounded-lg border transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none group-hover:border-slate-300 dark:group-hover:border-slate-600"
              style={{
                borderColor: errors.email ? '#fca5a5' : validFields.email ? '#86efac' : '#e2e8f0',
                backgroundColor: errors.email ? 'rgba(254,226,226,0.5)' : 'transparent'
              }}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {validFields.email && !errors.email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="rounded-full p-1 bg-green-200 dark:bg-green-700">
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="#15803d"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.email && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center text-sm"
              style={{ color: '#dc2626' }}
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </motion.div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-14">
          <label htmlFor="password" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ maxWidth: '24px', maxHeight: '24px' }}>
              <svg 
                width="20" 
                height="20" 
                fill="none" 
                stroke={errors.password ? '#ef4444' : validFields.password ? '#10b981' : '#94a3b8'} 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-lg border transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none group-hover:border-slate-300 dark:group-hover:border-slate-600"
              style={{
                borderColor: errors.password ? '#fca5a5' : validFields.password ? '#86efac' : '#e2e8f0',
                backgroundColor: errors.password ? 'rgba(254,226,226,0.5)' : 'transparent'
              }}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {validFields.password && !errors.password && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div className="rounded-full p-1 bg-green-200 dark:bg-green-700">
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="#15803d"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {errors.password && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center text-sm"
              style={{ color: '#dc2626' }}
            >
              <svg className="w-4 h-4 mr-1 flex-shrink-0" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.password}
            </motion.div>
          )}
        </div>

        <div className="mb-6"></div>

        <motion.button
          type="submit"
          disabled={isLoading || !allFieldsValid}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 relative overflow-hidden text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/40 dark:hover:shadow-blue-500/20 disabled:opacity-70 disabled:pointer-events-none"
          style={{
            background: allFieldsValid 
              ? 'linear-gradient(to right, #10b981, #14b8a6)'
              : 'linear-gradient(to right, #3b82f6, #4f46e5)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
              {allFieldsValid ? 'Create Account ✓' : 'Complete Form →'}
            </span>
          </div>
        </motion.button>

        {/* Success and error messages with direct color styling */}
        {submissionStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-lg backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(220,252,231,0.7)', 
              borderColor: '#86efac',
              borderWidth: '1px'
            }}
          >
            <p className="flex items-center font-medium" style={{ color: '#15803d' }}>
              <svg className="w-5 h-5 mr-2 flex-shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Form submitted successfully!
            </p>
          </motion.div>
        )}

        {submissionStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-lg backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(254,226,226,0.7)', 
              borderColor: '#fca5a5',
              borderWidth: '1px'
            }}
          >
            <p className="flex items-center font-medium" style={{ color: '#b91c1c' }}>
              <svg className="w-5 h-5 mr-2 flex-shrink-0" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please fix the errors above to continue
            </p>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}