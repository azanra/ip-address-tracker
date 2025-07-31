import Info from "./Info";
import LocationMap from "./LocationMap";

const Body = ({ data }) => {
  return (
    <div>
      <Info data={data} />
      <LocationMap data={data} />
    </div>
  );
};

export default Body;
