import React, { useState } from 'react';

const PasswordFindCode = () => {
    const [formData, setFormData] = useState({
        code: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '').substring(0, 6);
        setFormData((prev) => ({
            ...prev,
            [id]: numericValue,
        }));

        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: null }));
        }
    };

    const handleVerification = () => {
        const newErrors = {};
        const codeRegex = /^\d{6}$/;

        if (!formData.code) {
            newErrors.code = '인증번호를 입력해주세요.';
        } else if (!codeRegex.test(formData.code)) {
            newErrors.code = '유효한 6자리 인증번호를 입력해주세요.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('인증번호 확인:', formData.code);
            alert('인증이 완료되었습니다!');
        } else {
            console.log('유효성 검사 오류:', newErrors);
        }
    };

    return (
        <div className="findcode-page-container">
            <div className="findcode-page-card">
                <h2 className="findcode-title">연락처의 문자를 확인해보세요</h2>
                <p className="findcode-description">연락처에서 받은 인증번호를 입력해주세요</p>

                <div className="findcode-input-group">
                    <label htmlFor="code">인증번호</label>
                    <input
                        type="text"
                        id="code"
                        value={formData.code}
                        onChange={handleChange}
                        maxLength="6"
                    />
                    <a href="#" className="findcode-link">다시 보내기</a>
                    {errors.code && <p className="errorMessage">⚠️ {errors.code}</p>}
                </div>

                <button
                    className="findcode-code-button"
                    onClick={handleVerification}
                >
                    인증 확인 →
                </button>
            </div>
        </div>
    );
};

export default PasswordFindCode;
