import styled from "styled-components";
import { useCV } from "../CVContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Navbar = () => {
  const { undo, redo } = useCV();

  return (
    <Root>
      <nav>
        <div>Navbar</div>
        <RedoUndoBtnGroup>
          <button onClick={undo}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
          <button onClick={redo}>
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </RedoUndoBtnGroup>
        <DownloadCVButton />
      </nav>
    </Root>
  );
};

export default Navbar;

const Root = styled.div`
  z-index: 11;
  position: relative;
  background-color: #333;
  color: white;
  /* padding: 10px; */
  width: 100%;
  & > nav {
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

const RedoUndoBtnGroup = styled.div`
  margin-left: auto;
  margin-right: auto;
  & > button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #555;
    color: white;
    cursor: pointer;
  }
`;

const DownloadCVButton = () => {
  const handleDownloadPdf = async () => {
    const element = document.querySelector("#cv");

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
    <button
      style={{ background: "rgb(237, 37, 83)" }}
      onClick={handleDownloadPdf}
    >
      <i className="fa-solid fa-download"></i> Download
    </button>
  );
};
