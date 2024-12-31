import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styled from "styled-components";
import Template1 from "./templates/Template1";
import { useCV } from "../CVContext";

const CVGenerator = () => {
  const { undo, redo } = useCV();

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;

    // Capture the div as canvas
    const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
    const imgData = canvas.toDataURL("image/png");

    // Create a jsPDF instance
    const pdf = new jsPDF("portrait", "pt", "a4"); // A4 format

    // Calculate dimensions to fit the A4 page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("cv.pdf");
  };

  return (
    <div>
      <div>
        <button onClick={undo}>undo</button>
        <button onClick={redo}>redo</button>
      </div>
      <PDFContainer ref={printRef}>
        <Template1 />
      </PDFContainer>
      <button onClick={handleDownloadPdf}>Download as PDF</button>
    </div>
  );
};

export default CVGenerator;

const PDFContainer = styled.div`
  width: 21cm;
  height: 29.7cm;
  background-color: white;
  margin: 0 auto;
  color: black;
  font-family: sans-serif;
`;
