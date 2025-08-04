import { useState } from "react";
import "./App.css";
import Body from "./component/Body";
import Header from "./component/Header";
import useGetIpAddress from "./hooks/useGetIpAddress";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data, loading, error } = useGetIpAddress(searchKeyword);

  if (loading) {
    return <p>Loading the data...</p>;
  }

  if (error) {
    return <p>Failed to fetch the data</p>;
  }

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <Header handleChange={handleChange} />
      <Body data={data} />
    </div>
  );
}

export default App;
