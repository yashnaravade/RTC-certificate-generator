import React, { useState } from "react";
import axios from "axios";
import '../App.css';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Confetti from "react-confetti";
import RTClogo from "../assets/img/RTClogo.png";
import HeaderImg from '../assets/img/header-img.png'
import surajPDF from "../blank_suraj.pdf";
import './CertificatePdf.css';


// import yashPDF from "../blank_yash.pdf";
// import riteshPDF from "../blank_ritesh.pdf";

function CertificatePdf() {
    const [confettiActive, setConfettiActive] = useState(false);
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const handleEmailChange = (e) => {
    e.preventDefault();

    if(e.target.value.length>=3){
    axios
      .post("/certificate/get", {
        student_email: e.target.value,
      })
      .then((res) => {
        setCertificates(res.data.certificates);
        //console.log(res.data.certificates);
      })
      .catch((err) => {
        console.log(err);
      })}     
  };

  async function createPdf(index, isDownload) {  
    
    setConfettiActive(true);
      setTimeout(() => {
        setConfettiActive(false);
      },30000);
    
    var url = '';
   
    url = surajPDF; 
    console.log("suraj");
    console.log(certificates[index].course_name);

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Courier);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText(certificates[index]._id, {
      x: width - 300,
      y: height - 50,
      size: 15,
      font: helveticaFont,
      color: rgb(0.6, 0, 1),
    });

    firstPage.drawText(certificates[index].student_name, {
      x: width / 2 - 200,
      y: height - 260,
      size: 45,
      font: helveticaFont,
      color: rgb(0.6, 0, 1),
    });

    firstPage.drawText(certificates[index].course_name, {
      x: width - 370,
      y: height - 318,
      size: 25,
      font: helveticaFont,
      color: rgb(0.6, 0, 1),
    });

    firstPage.drawText(certificates[index].completion_date, {
      x: width - 490,
      y: height - 355,
      size: 25,
      font: helveticaFont,
      color: rgb(0.6, 0, 1),
    });

    setIsCertificateVisible(true);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

    //saveAs(pdfDataUri, "newcertificate.pdf");
    document.getElementById("pdf").src = pdfDataUri + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

    var link = document.getElementById("download-btn");
    link.href =pdfDataUri;
    link.download = `${certificates[index].student_name}_${certificates[index]._id}.pdf`;
    if(isDownload===1)
    {
      link.dispatchEvent(new MouseEvent('click'));
    }
  }

   
    
  return (
    <>
   <div className="body">
   <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <div className="container">
        
        <div className="container-child mt-5 align-self-center">
        <img src={RTClogo} alt="logo" className="RTClogo img-fluid" />
          <div className="row">
            
            <div className="col-md-6">  
            <h3 className="mx-1">RTC</h3>
            <p className="mx-1 greeting-message"> Hello there! You have leveled up your skills with our course, and now it's time to get the certificate. 
Please enter your email address below to download your certificate</p>
         
                <div className="d-flex align-items-center">        
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={handleEmailChange}
                  className="form-control input-lg  mx-auto mt-3 Email-input"
                  style={{"fontSize":"16px"}}
                />
                </div>
    
                <div>
                {
                certificates.length>0 ?
                 certificates.map((certificate, index) => (
                  <CertificatePdf/>
                )):
                null
            }
              </div>
            </div>
    
            <div className="col-md-6 d-flex align-items-center" id="gopdf">
              {
                !isCertificateVisible ?
              <img src={HeaderImg} alt="header" className="img-fluid header-img" />
        
               :
               <iframe
                id="pdf"
                width="100%" height="500px"
                title="certificate-preview"
                type="application/pdf"
              >            This browser does not support PDFs. Please download the PDF to view it
              </iframe>
              
              }          
            </div>  
          </div>
              {
                confettiActive ?
                <Confetti />:
                null
              }
        </div>
        </div>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
    </>
  );
}

export default CertificatePdf