import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=minsk,grodno,brest"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1590222053771-29484ea5d796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Минск</h1>
              <h2>{data[0]} options</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1590733959592-8c7c808236a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Гродно</h1>
              <h2>{data[1]} options</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1645263395131-75c23a35b467?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Брест</h1>
              <h2>{data[2]} options</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
