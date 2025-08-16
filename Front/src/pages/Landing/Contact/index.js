import React, { useState } from 'react';
import Header from '../LandingHome/Header';
import Footer from '../LandingHome/Footer';
import './contact.css';
import TeamLogo from '../../../assets/images/png/TeamPng/teamLogo.png';
import email from '../../../assets/images/png/ContactPng/email-icon.png';
import phone from '../../../assets/images/png/ContactPng/phone-icon.png';
import location from '../../../assets/images/png/ContactPng/location-icon.png';

const Contact = () => {
    const [expanded, setExpanded] = useState(null);

    const faqData = [
        {
            question: "StechPro는 무슨 서비스를 제공하나요?",
            answer: "StechPro offers a range of services including design, website development, and branding. We specialize in user experience (UX) design, responsive web design, custom software development, and more."
        },
        {
            question: "어떻게 이용하나요?",
            answer: "FAQ 답변 2"
        },
        {
            question: "StechPro로부터 어떤 도움을 받을 수 있나요?",
            answer: "FAQ 답변 3"
        },
        {
            question: "특별한 촬영 장비가 필요한가요?",
            answer: "FAQ 답변 4"
        },
        {
            question: "분석 리포트는 어떤 형식으로 제공되나요?",
            answer: "FAQ 답변 5"
        },
        {
            question: "분석에 걸리는 시간은 얼마나 걸리나요?",
            answer: "FAQ 답변 6"
        },
        {
            question: "어떤 종목을 지원하나요?",
            answer: "FAQ 답변 7"
        },
        {
            question: "서비스 이용 요금은 어떻게 되나요?",
            answer: "FAQ 답변 8"
        }
    ];

    const toggleFAQ = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div>
            <div className="contactContainer">
                <Header style={{ zIndex: '2' }} />
                
                <section className="contactSection">
                    <div className="contactHeader">
                        <h1>Hello We are</h1>
                        <img src={TeamLogo} alt="Stech Logo" className="contactLogo" />
                    </div>
                    <div className="contactLinks">
                        <a href="mailto:hello@squareup.com" className="contactLink">
                            <img src={email} alt="Email" className="contacticon" /> hello@squareup.com
                        </a>
                        <a href="tel:+9191813232309" className="contactLink">
                            <img src={phone} alt="phone" className="contacticon" /> +91 91813 23 2309
                        </a>
                        <a href="#" className="contactLink">
                            <img src={location} alt="location" className="contacticon" /> Get Location
                        </a>
                    </div>

                    <form className="contactForm">
                        <div className="formGroup">
                            <div className="inputRow">
                                <div className="inputWrapper">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" id="fullName" placeholder="Type here" />
                                </div>
                                <div className="inputWrapper">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="Type here" />
                                </div>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="reason">Why are you contacting us?</label>
                                <textarea id="reason" placeholder="Type here"></textarea>
                            </div>
                            <div className="inputWrapper">
                                <label htmlFor="message">Your Message</label>
                                <textarea id="message" placeholder="Type here"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="submitButton">Submit</button>
                    </form>
                </section>

                <section className="faqSection">
                    <div className="faqContent">
                        <h2>Frequently Asked Questions</h2>
                        <p>Still You have questions? Feel free to contact us: hello@squareup.com</p>
                    </div>
                    <div className="faqGrid">
                        <div className="faqColumn">
                            {faqData.slice(0, 4).map((item, index) => (
                                <div key={index} className={`faqItem ${expanded === index ? 'expanded' : ''}`}>
                                    <div 
                                        className={`faqHeader ${expanded === index ? 'expanded' : ''}`} 
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <span className="faqNumber">0{index + 1}</span>
                                        <h4>{item.question}</h4>
                                        <span className="toggleIcon">{expanded === index ? '—' : '+'}</span>
                                    </div>
                                    <div className={`faqBody ${expanded === index ? 'expanded' : ''}`}>
                                        <p>{item.answer}</p>
                                    </div>
                                 </div>
                            ))}
                        </div>
                        <div className="faqColumn">
                            {faqData.slice(4).map((item, index) => (
                                <div key={index + 4} className={`faqItem ${expanded === index + 4 ? 'expanded' : ''}`}>
                                    <div 
                                        className={`faqHeader ${expanded === index + 4 ? 'expanded' : ''}`} 
                                        onClick={() => toggleFAQ(index + 4)}
                                    >
                                        <span className="faqNumber">0{index + 5}</span>
                                        <h4>{item.question}</h4>
                                        <span className="toggleIcon">{expanded === index + 4 ? '—' : '+'}</span>
                                    </div>
                                    <div className={`faqBody ${expanded === index + 4 ? 'expanded' : ''}`}>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
};

export default Contact;