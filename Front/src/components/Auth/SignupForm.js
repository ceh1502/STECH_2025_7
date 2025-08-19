import React, { useState, useEffect } from 'react';
import Kakao from '../../assets/images/png/AuthPng/Kakao.png';
import Google from '../../assets/images/png/AuthPng/Google.png';
import Eye from '../../assets/images/png/AuthPng/Eye.png';
import EyeActive from '../../assets/images/png/AuthPng/EyeActive.png';


const SignupForm = ({ onSuccess, className = '' }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        authCode: '',
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // New states for dynamic validation messages
    const [emailStatus, setEmailStatus] = useState(null); // 'idle', 'checking', 'available', 'unavailable'
    const [emailMessage, setEmailMessage] = useState('');
    const [authCodeStatus, setAuthCodeStatus] = useState(null); // 'idle', 'verifying', 'valid', 'invalid'
    const [authCodeMessage, setAuthCodeMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear general error when user starts typing
        if (error) setError(null);
    };
    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('아이디와 비밀번호 모두 입력해주세요.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('유효한 이메일을 입력해주세요.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        setError(null);

        try {
            console.log('로그인 시도:', formData);
            const success = true;
            if (success) {
                console.log('Login Successful!');
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormLoading = isSubmitting;

    return (
        <form onSubmit={handleSubmit} className={`loginForm ${className}`}>
            <div className="tab-container">
                <button type="button" className="loginTitle">로그인</button>
                <a href="./signup" type="button" className="loginTitleTosignup">회원가입</a>
            </div>

            <div className="formGroup">
                <label className="LoginformLabel ID" htmlFor="email">아이디</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="LoginformInput"
                    placeholder=""
                    required
                    autoComplete="email"
                    disabled={isFormLoading}
                />
            </div>

            <div className="formGroup">
                <label className="LoginformLabel PW" htmlFor="password">
                    비밀번호
                </label>
                <div className="passwordInputContainer">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="LoginformInput"
                        placeholder="최소 8자"
                        required
                        autoComplete="current-password"
                        disabled={isFormLoading}
                    />
                    <button
                        type="button"
                        className="LoginpasswordToggleButton"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isFormLoading}
                    >
                        {showPassword ? (
                            <img src={EyeActive} alt="showPassword" className="showPassword" />
                        ) : (
                            <img src={Eye} alt="showPassword" className="showPasswordActive" />
                        )}
                    </button>
                </div>
            </div>

                        <div className="formGroup">
                <label className="LoginformLabel PW" htmlFor="password">
                    비밀번호 확인
                </label>
                <div className="passwordInputContainer">
                    <input
                        type={showPasswordConfirm ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="LoginformInput"
                        placeholder="비밀번호 다시 입력"
                        required
                        autoComplete="current-password"
                        disabled={isFormLoading}
                    />
                    <button
                        type="button"
                        className="LoginpasswordToggleButton"
                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        disabled={isFormLoading}
                    >
                        {showPasswordConfirm ? (
                            <img src={EyeActive} alt="showPassword" className="showPassword" />
                        ) : (
                            <img src={Eye} alt="showPassword" className="showPasswordActive" />
                        )}
                    </button>
                </div>
            </div>

            <div className="formGroup">
                <label className="LoginformLabel ID" htmlFor="email">인증코드</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="LoginformInput"
                    placeholder=""
                    required
                    autoComplete="email"
                    disabled={isFormLoading}
                />
            </div>


            {error && <div className="errorMessage">⚠️ {error}</div>}

            <button
                type="submit"
                disabled={isFormLoading}
                className={`LoginsubmitButton ${isFormLoading ? 'loading' : ''}`}
            >
                {isFormLoading ? 'Loading...' : '회원가입'}
            </button>

            <div className="divider-container">
                <div className="divider"></div>
                <span className="divider-text">or</span>
                <div className="divider"></div>
            </div>

            <div className="social-buttons-container">
                <button type="button" className="socialButton google-button">
                    <img src={Google} alt="google" className="socialicon" />
                    구글로 로그인
                </button>
                <button type="button" className="socialButton kakao-button">
                    <img src={Kakao} alt="kakao" className="socialicon" />
                    카카오로 로그인
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
