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
            answer: "Stech Pro는 코치와 팀을 위한 객체인식 AI 기반 스포츠 분석 플랫폼입니다. 영상을 업로드하면 AI가 자동으로 객체를 인식하고 경기 데이터를 분석해 리포트를 생성합니다."
        },
        {
            question: "어떻게 이용하나요?",
            answer: "경기 영상을 업로드 하면 AI가 자동으로 분석을 시작합니다. 별도의 장비 없이 데이터 및 분석 리포트를 받을 수 있습니다. "
        },
        {
            question: "StechPro로부터 어떤 도움을 받을 수 있나요?",
            answer: "플레이 유형, 주요 경기 상황 등의 분석을 통해 경기 데이터와 선수 데이터를 구체화하고 리포트를 통해 경기 피드백에 활용할 수 있습니다."
        },
        {
            question: "특별한 촬영 장비가 필요한가요?",
            answer: "일반 스마트폰, 캠코더로 사이드라인에서 촬영한 영상을 업로드 해주세요."
        },
        {
            question: "분석 리포트는 어떤 형식으로 제공되나요?",
            answer: "포지션별 움직임, 주요 스탯 등이 시각적으로 정리된 PDF 리포트와 함께, 대시보드 상에서 확인할 수 있는 인터랙티브 분석을 제공합니다."
        },
        {
            question: "분석에 걸리는 시간은 얼마나 걸리나요?",
            answer: "영상 업로드 이후 24시간 이내에 제공됩니다. 영상 길이나 화질에 따라 소요 시간은 달라질 수 있습니다."
        },
        {
            question: "어떤 종목을 지원하나요?",
            answer: "현재는 미식축구를 지원합니다. 추후 타 종목도 확장 예정입니다."
        },
        {
            question: "서비스 이용 요금은 어떻게 되나요?",
            answer: "경기 영상 1건 당 분석 단위로 과금되며, 정액제 요금제나 팀 단위 요금제도 제공합니다. 자세한 내용은 요금 안내 페이지를 확인해 주세요."
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
                        <div className="ContactformGroup">
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