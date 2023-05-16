import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}м от центра</span>
        <span className="siTaxiOp">Можно с животными</span>
        <span className="siSubtitle">Номер с кондиционером</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Бесплатная отмена</span>
        <span className="siCancelOpSubtitle">
          Успейте забронировать по выгодной цене!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Включая налоги</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">Посмотреть</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
