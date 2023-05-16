import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://theivimare.com/_novaimg/galleria/1392343.jpg",
    "https://www.wanderlustingk.com/wp-content/uploads/2019/01/img-2568-copy.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://www.noviydom.ru/upload/iblock/058/proyekt_stilnoy_villy.jpg",
    "https://bekasovo.ru/sites/default/files/te-img/2020/11/art_10_1.jpg",
  ];
  const types = ["Отели", "Апартаменты", "Санатории", "Виллы", "Коттеджи"];

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{types[i]}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
