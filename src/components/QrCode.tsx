import { FormEvent, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { toPng } from 'html-to-image';


export default function QrCode() {
  const qrRef = useRef<any | undefined>();

  const [url, setUrl] = useState("");
  const [color, setColor ] = useState("#141926")
  const [format, setFormat] = useState("svg");
  const [downloadSize, setDownloadSize] = useState<number>(280);
    
   const downloadQRCode = (evt: FormEvent) => {
    evt.preventDefault(); 

    const svg = qrRef.current.querySelector("svg");
    const formatExt = format === "svg" ? "svg" : "png"

    const newWidth = downloadSize; 
    const newHeight = downloadSize;
    svg.setAttribute("width", newWidth);
    svg.setAttribute("height", newHeight);

    const svgXML = new XMLSerializer().serializeToString(svg);
  
    if (format === "png") {
      toPng(svg)
        .then(function (dataUrl) {
          const anchor = document.createElement("a");
          anchor.href = dataUrl;
          anchor.download = `${url}.${formatExt}`;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        })
        .catch(function (error) {
          console.error('Erro ao converter SVG em PNG', error);
        });
    } else {
      // Para o formato SVG, você pode adicionar manualmente a extensão .svg
      const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);
  
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `${url}.${formatExt}`; // Adicione manualmente a extensão .svg
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };
  

  const qrCode = (
    <QRCode 
      id="qrCodeId"
      size={280}
      renderAs= "svg"
      value={url}
      bgColor="white"
      fgColor={color}
      level="Q"
    />
  )

  return (
    <div className="qr-container">

      <form onSubmit={downloadQRCode} className="qr-container__form">
       
      
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://produtos.altogiro.net/referencia"
        />
       
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="input rgb, hex or color"
        />

        <input
          type="number"
          value={downloadSize}
          onChange={(e) => setDownloadSize(Number(e.target.value))} // Converta para número
          placeholder="Tamanho do download"
        />


        <div className="radio-container">
          <div className="radio-button">
            <input
              type="radio"
              id="svgFormat"
              name="format"
              value="svg"
              checked={format === "svg"}
              onChange={() => setFormat("svg")}
            />
            <label htmlFor="svgFormat" className="radio-label">SVG</label>
          </div>
          <div className="radio-button">
            <input
              type="radio"
              id="pngFormat"
              name="format"
              value="png"
              checked={format === "png"}
              onChange={() => setFormat("png")}
            />
            <label htmlFor="pngFormat" className="radio-label">PNG</label>
          </div>
        </div>


        <button type="submit">Baixar QR Code</button>

      </form>

        
      <div className="qr-container__qr-code" ref={qrRef}>
          {qrCode}
      </div>
    </div>
  );
}
