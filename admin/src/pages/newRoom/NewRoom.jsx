import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotels");
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
    // const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    const roomNumbers = rooms.toString().trim().split(",").map((room) => ({ number: room }));

    try {
      if (editId) {
        // если editId есть, значит, мы редактируем существующий элемент
        await axios.put(`/rooms/${editId}`, { ...info, roomNumbers });
      } else {
        // если editId нет, значит, мы создаем новый элемент
        await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      }
    } catch (err) {
      console.log(err);
    }

    // try {
    //   await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
