import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Типы недвижимости</h1>
        <PropertyList />
        <h1 className="homeTitle">Посетители предпочитают</h1>
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default Home;
