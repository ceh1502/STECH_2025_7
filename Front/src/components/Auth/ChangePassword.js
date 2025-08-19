import React, { useState } from 'react';

// This component is for a password reset form, including validation for password length and matching.
const ChangePassword = () => {
    // Use state to manage form data for password and password confirmation.
    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
    });

    // Use state to manage validation errors.
    const [errors, setErrors] = useState({});

    // Handle input changes, updating the form data and clearing any related errors.
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));

        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: null }));
        }
    };

    // Validate the form data before submission.
    const validateForm = () => {
        const newErrors = {};

        // Password validation: must be at least 8 characters long.
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.'; // Please enter your password.
        } else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'; // Password must be at least 8 characters long.
        }

        // Password confirmation validation: must match the password field.
        if (!formData.passwordConfirm) {
            newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.'; // Please enter your password confirmation.
        } else if (formData.password !== formData.passwordConfirm) {
            newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.'; // Passwords do not match.
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission.
    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form is valid. Submitting data:', formData);
            // Here you would add the logic to send the new password to your backend.
            alert('비밀번호가 성공적으로 변경되었습니다!');
        } else {
            console.log('Form has errors.');
        }
    };

    return (
        <div className="find-page-container">
            <div className="find-page-card">
                <h2 className="find-title">비밀번호 재설정</h2>
                <p className="find-description">새로운 비밀번호를 입력해주세요.</p>

                {/* Password input group */}
                <div className="find-input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="최소 8자" // At least 8 characters
                    />
                    {errors.password && <p className="errorMessage">⚠️ {errors.password}</p>}
                </div>

                {/* Password confirmation input group */}
                <div className="find-input-group">
                    <label htmlFor="passwordConfirm">비밀번호 확인</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        placeholder="비밀번호 다시 입력" // Re-enter password
                    />
                    {errors.passwordConfirm && <p className="errorMessage">⚠️ {errors.passwordConfirm}</p>}
                </div>

                {/* Submission button */}
                <button
                    className="find-code-button"
                    onClick={handleSubmit}
                >
                    비밀번호 변경 → {/* Change Password */}
                </button>

                <div className="find-links-group">
                    <p>이미 계정이 있습니다. <a href="#" className="find-link">로그인하기</a></p>
                    <p>계정이 없다면? <a href="#" className="find-link">회원가입</a></p>
                </div>

                <hr className="find-divider" />

                <div className="find-help-section">
                    <p>문의사항이 있다면, <a href="#" className="link">고객 서비스</a>에 문의하여<br />도움을 받으세요.</p>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
