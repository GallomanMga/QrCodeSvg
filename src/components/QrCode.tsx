import { FormEvent, useRef, useState } from "react";
import QRCode from "qrcode.react";


export default function QrCode() {
  const qrRef = useRef<any | undefined>();

  const [url, setUrl] = useState("");
  const [color, setColor ] = useState("#141926")

  /*const downloadQRCodePng = (evt: FormEvent) => {
    evt.preventDefault(); 
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `${url}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  
  }; */

    
   const downloadQRCode = (evt: FormEvent) => {
    evt.preventDefault(); 
    
    const svg = qrRef.current.querySelector("svg");
    const svgXML = new XMLSerializer().serializeToString(svg);
    const dataUrl = "data:image/svg," + encodeURIComponent(svgXML);
  
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `${url}.svg`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  

  const qrCode = (
    <QRCode 
      id="qrCodeId"
      size={300}
      renderAs= "svg"
      value={url}
      bgColor="white"
      fgColor={color}
      level="Q"
     // imageSettings={{
     //   src: QrLogoImg2,
     //   excavate: true,
     //   width: 100 * 0.3,
     //   height: 300 * 0.1,
     // }}
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

        <button type="submit">Baixar QR Code SVG</button>

      </form>

      
   
      <div className="qr-container__qr-code" ref={qrRef}>
          {qrCode}
      </div>
    </div>
  );
}
