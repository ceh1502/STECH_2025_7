import React from 'react';
import Header from '../LandingHome/Header';
import Footer from '../LandingHome/Footer';
import TeamLogo from '../../../assets/images/png/TeamPng/teamLogo.png';
import T1 from '../../../assets/images/png/TeamPng/T1.png';
import T2 from '../../../assets/images/png/TeamPng/T2.png';
import T3 from '../../../assets/images/png/TeamPng/T3.png';
import T4 from '../../../assets/images/png/TeamPng/T4.png';
import T5 from '../../../assets/images/png/TeamPng/T5.png';
import T6 from '../../../assets/images/png/TeamPng/T6.png';
import T7 from '../../../assets/images/png/TeamPng/T7.png';
import './index.css';

const Team = () => {
    return (
        <div>
            <div className="mainContainer">
                <Header style={{ zIndex: '2' }} />
                <div className="toparea"></div>
                <div className="overviewContainer">
                    <div className="overview">
                        <div className="teamOverview">
                            <div className="team1">
                                <div>TEAM</div>
                                <div>
                                    <img src={TeamLogo} alt="teamLogo" />
                                </div>
                            </div>
                            <div className="team2">
                                <span>A TEAM OF ACTUAL </span>
                                <span>COLLEGE FOOTBALL PLAYERS</span>
                            </div>
                        </div>
                        <div className="teamIntro">
                            <div className="intro1">
                                Stech is founded by active Korean college football players who've experienced
                                <br />
                                the game from the inside.
                            </div>
                            <div className="intro2">
                                Drawing from firsthand knowledge on the field, we combine our experience with AI object recognition technology to automate game analysis and deliver actionable
                                strategic insights. With a deep understanding of the sport, strong technical expertise, and a commitment to innovation, our team is building tools that truly serve
                                athletes and coaches — because we are athletes ourselves.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="memberContainer">
                    <div className="firstRow">
                        <div className="T1">
                            <img src={T1} alt="t1" />
                            <div className="crewName" onClick={() => window.open('https://www.linkedin.com/in/josh-lee-5b5769164/', '_blank')}>
                                Josh Lee
                            </div>
                            <div className="crewPosition">Founder & CEO</div>
                        </div>
                        <div className="T2">
                            <img src={T2} alt="t2" />
                            <div className="crewName" onClick={() => window.open('https://www.linkedin.com/in/eugenekim512', '_blank')}>
                                Eugene Kim
                            </div>
                            <div className="crewPosition">Founder & CBO</div>
                        </div>
                        <div className="T3">
                            <img src={T3} alt="t3" />
                            <div className="crewName" onClick={() => window.open('http://www.linkedin.com/in/brianbluefootball', '_blank')}>
                                Brian Lee
                            </div>
                            <div className="crewPosition">Lead PM & Data Analyst</div>
                        </div>
                        <div className="T4">
                            <img src={T4} alt="t4" />
                            <div className="crewName" onClick={() => window.open('https://www.linkedin.com/in/%EC%97%AC%EC%96%B8%EB%A1%A0-990935367', '_blank')}>
                                Allan Lu
                            </div>
                            <div className="crewPosition">PM</div>
                        </div>
                        <div className="T5">
                            <img src={T5} alt="t5" />
                            <div className="crewName" onClick={() => window.open('https://www.linkedin.com/in/%EA%B1%B4-%EC%9D%B4-352aa1211/', '_blank')}>
                                Ken Lee
                            </div>
                            <div className="crewPosition">Lead Dev & Back-end</div>
                        </div>
                        <div className="T6">
                            <img src={T6} alt="t6" />
                            <div className="crewName" onClick={() => window.open('https://www.linkedin.com/in/jenicoon/', '_blank')}>
                                Jenicoon Lee
                            </div>
                            <div className="crewPosition">AI Dev</div>
                        </div>
                        <div className="T7">
                            <img src={T7} alt="t7" />
                            <div className="crewName" onClick={() => window.open('https://www.linkedin.com/in/pppbin/', '_blank')}>
                                Yves Son
                            </div>
                            <div className="crewPosition">Front-end</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Team;
