import React, { useState } from 'react';
import Header from '../LandingHome/Header';
import Footer from '../LandingHome/Footer';
import './deck.css';
import TeamLogo from '../../../assets/images/png/TeamPng/teamLogo.png';
import { Document, Page, pdfjs } from 'react-pdf';

// PDF.js worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Deck = () => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="deckContainer">
            <Header style={{ zIndex: '2' }} />

            <div className="deckheader">
                <div className="decklogoandtitle">
                    <img src={TeamLogo} alt="Stech Logo" className="deckheaderlogo" />
                    <h1 className="decktitle">IR Deck</h1>
                </div>
            </div>

            {/* PDF 미리보기 */}
            <div className="deckmain">
                <div className="pdfViewer">
                    <Document file="https://drive.google.com/file/d/1QXSPQIC6sH5josNck70QsrsP_UOJP2EM/view?usp=sharing" onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={900} />
                        ))}
                    </Document>
                </div>
            </div>

            <div className="deckmessage">
                <p>context</p>
            </div>

            <Footer />
        </div>
    );
};

export default Deck;
