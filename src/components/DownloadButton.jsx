import jsPDF from "jspdf";

const DownloadButton = () => {
  const handleDownloadPdf = async () => {
    const element = document.querySelector("#cv");

    if (!element) {
      console.error("Element not found: #cv");
      return;
    }

    // Create a jsPDF instance with A4 dimensions
    const pdf = new jsPDF("portrait", "pt", "a4");

    // A4 page dimensions in points
    const pageWidth = 595.27; // -1 pt to avoid overflow
    const pageHeight = 841.88; // -1 pt to avoid overflow

    // Force the element to fit exactly within A4 page dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calculate the scale to fit the element within A4 dimensions
    const scaleX = pageWidth / elementWidth;
    const scaleY = pageHeight / elementHeight;
    const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

    // Adjust the height to avoid overflow
    const adjustedHeight = Math.min(elementHeight * scale, pageHeight);

    // Render the HTML into the PDF
    await pdf.html(element, {
      callback: (doc) => {
        doc.save("cv.pdf"); // Save the PDF
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: scale, // Apply calculated scale
        useCORS: true, // Allow cross-origin resources if needed
        scrollX: 0, // Prevent scrolling artifacts
        scrollY: 0,
      },
      width: pageWidth, // Force content width to match page
      height: adjustedHeight, // Restrict content height to avoid overflow
    });
  };

  return (
    <button
      style={{
        background: "rgb(237, 37, 83)",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
      }}
      onClick={handleDownloadPdf}
    >
      <i className="fa-solid fa-download"></i> Download
    </button>
  );
};

export default DownloadButton;
