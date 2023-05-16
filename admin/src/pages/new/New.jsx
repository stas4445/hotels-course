import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [editId, setEditId] = useState(null); // новое состояние, чтобы отслеживать id элемента, который редактируется

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (id) {
      // делаем запрос на сервер, передав id
      axios.get(`/users/${id}`).then((res) => {
        // используем данные, чтобы установить состояние компонента
        setInfo(res.data);
        setEditId(id); // установка id редактируемого элемента в состояние
      });
    }
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    let url = info.img; // Используем текущее изображение по умолчанию
  
    if (file) { // Если выбрано новое изображение, загружаем его на Cloudinary
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dnsqecto5/image/upload",
          data
        );
        url = uploadRes.data.url; // Обновляем URL изображения
      } catch (err) {
        console.log(err);
      }
    }
  
    const dataToSend = { ...info, img: url }; // Объединяем введенные данные с новым URL изображения
    try {
      if (editId) {
        // если editId есть, значит, мы редактируем существующий элемент
        await axios.put(`/users/${editId}`, dataToSend);
      } else {
        // если editId нет, значит, мы создаем новый элемент
        await axios.post(`/auth/register`, dataToSend);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
