import React, { useState, useEffect } from "react";
import html2canvas from 'html2canvas';
import "../Editor.css";

const Editor = () => {
  const [textmeme, setTextmeme] = useState(); //para el texto
  const [colorTexto, setColor] = useState();  //para el color
  const [font, setFontsize] = useState();  //tipo de fuente
  const [positionY, setPositionY] = useState();  //posicionY
  const [positionX, setPositionX] = useState();  //posicionX
  const [fontW, setFontw] = useState();   //fuente grosor
  const [file, setFile] = useState(null);  //input file
  const [listImage, setListImage] = useState([]);  //lista de los tags
  const [resultApi, setResultApi] = useState([]);  //el result del fetch
  const [selectedImageURL, setSelectedImageURL] = useState(null);  // la url de la img a descargar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://pixabay.com/api/?key=39931870-1dccddaea0f53ff2f58effd86"
        );
        const response = await data.json();
        setResultApi(response);
        const tags =  response.hits.map((item) => item.tags);
        setListImage(tags);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  const textomeme = (e) => {
    setTextmeme(e.target.value);
  };
  const guardarImg = (e) => {
    const selectedTag = e.target.value;
    const selectedImage = resultApi.hits.find(
      (item) => item.tags === selectedTag
    );
    setSelectedImageURL(selectedImage ? selectedImage.webformatURL : null);
   
  };
  const colorText = (e) => {
    setColor(e.target.value);
  };
  const fontSize = (e) => {
    setFontsize(e.target.value);
  };
  const borrar = () => {
    setFile(null);
    setSelectedImageURL(null);
    const text = document.querySelector("#text");
    const input = document.querySelector("#img");
    if (input) {
      input.value = "";
      text.value = "";
      setTextmeme(null);
    }
  };
  const fontWeight = (e) => {
    setFontw(e.target.value);
  };

  const handleUserImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const descargar = () => {
    const figure = document.querySelector("#figure");
    const html2canvasProxy = html2canvas(figure, { useCORS: true });
    html2canvasProxy.then(function (canvas) {
      let img = canvas.toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "memepersonal.png";
      link.href = img;
      link.click();
    });
  };

  return (
    <div className="container-total">
      <div className="container-gral">
        <h1>Editor de memes</h1>
        <div className="container-edit">
          <div className="container-form">
            <div className="container-input">
              <label htmlFor="text">Ingresa el texto del meme:</label>
              <input
                onChange={textomeme}
                type="text"
                id="text"
                placeholder="Ingrese el texto"
              />
            </div>
            <div className="container-input">
              <label>Elegi la imagen:</label>
              <select onChange={guardarImg} name="" id="">
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                {listImage.map((image, index) => (
                  <option value={image} key={index}>
                    {image}
                  </option>
                ))}
              </select>
            </div>
            <div className="container-input">
              <label htmlFor="color">Ingrese el color:</label>
              <input
                type="text"
                onChange={colorText}
                placeholder="Ingrese el color del texto"
                id="color"
              />
            </div>
            <div className="container-input">
              <label htmlFor="">Ajuste el grosor</label>
              <select name="" onChange={fontWeight} id="">
                <option value="" disabled selected>
                  Seleccione una opción
                </option>
                <option value="200">Leve</option>
                <option value="400">Normal</option>
                <option value="600">Mediano</option>
                <option value="800">Grueso</option>
              </select>
            </div>
          </div>
          <div className="container-figure">
            <figure id="figure">
              <p
                className="position-absolute"
                style={{
                  color: `${colorTexto}`,
                  fontSize: `${font}px`,
                  top: `${positionY}px`,
                  left: `${positionX}px`,
                  fontWeight: `${fontW}`,
                }}
              >
                {textmeme}
              </p>
              {file ? (
                <img className="" src={file} alt="meme" />
              ) : selectedImageURL ? (
                <img className="" src={selectedImageURL} alt="Meme" />
              ) : null}
            </figure>
            <div className="container-btn">
              <button
                onClick={descargar}
                type="submit"
                className="btn btn-outline-success"
              >
                Descargar
              </button>
              <button onClick={borrar} className="btn btn-outline-danger">
                Borrar
              </button>
            </div>
          </div>
          <div className="container-form">
            <div className="container-input">
              <label htmlFor="font">Ingrese el tamaño de la fuente:</label>
              <input type="number" onChange={fontSize} name="" id="font" />
            </div>
            <div className="container-input">
              <label htmlFor="positionY">Ajuste la posicion vertical:</label>
              <input
                type="number"
                placeholder="+145"
                value={`${positionY}`}
                onChange={(e) => setPositionY(Number(e.target.value))}
                name=""
                id="positionY"
              />
            </div>
            <div className="container-input">
              <label htmlFor="positionX">Ajuste la posicion horizontal:</label>
              <input
                type="number"
                name=""
                id="positionX"
                placeholder="+1"
                value={`${positionX}`}
                onChange={(e) => setPositionX(Number(e.target.value))}
              />
            </div>
            <div className="container-input">
              <label htmlFor="img" className="label">
                Seleccione su imagen:
              </label>
              <input
                type="file"
                id="img"
                placeholder="hola"
                accept="image/*"
                onChange={handleUserImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
