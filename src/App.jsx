import { useState } from "react";
import "./App.css";
import Body from "./component/Body";
import Header from "./component/Header";
import useGetIpAddress, {
  isValidIpAddress,
  isValidUrl,
} from "./hooks/useGetIpAddress";
import useFirstRender from "./hooks/useFirstRender";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const keywordIsValidUrl = isValidUrl(searchKeyword);
  const keywordIsValidIp = isValidIpAddress(searchKeyword);
  const keywordIsNotValid = !keywordIsValidIp && !keywordIsValidUrl;

  const isFirstRender = useFirstRender();

  const { data, loading, error } = useGetIpAddress(
    searchKeyword,
    isFirstRender
  );

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-[1440px]">
        <Header handleChange={setSearchKeyword} />
        {keywordIsNotValid && searchKeyword.length > 0 && (
          <p className="absolute top-54 right-213 text-red-500 font-bold">
            Not a valid ip address or url...
          </p>
        )}
        {loading && (
          <p className="absolute top-54 right-220 text-blue-500 font-bold">
            Loading the data...
          </p>
        )}
        {error && (
          <p className="absolute top-54 right-215 text-red-500 font-bold">
            Failed to fetch the data
          </p>
        )}
        {!loading && error === null && <Body data={data} />}
      </div>
    </div>
  );
}

export default App;
