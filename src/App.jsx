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

  // const { data, loading, error } = useGetIpAddress(
  //   searchKeyword,
  //   isFirstRender
  // );

  const data = {
    ip: "8.8.8.8",
    location: {
      country: "US",
      region: "California",
      city: "Mountain View",
      lat: 37.40599,
      lng: -122.078514,
      postalCode: "94043",
      timezone: "-07:00",
      geonameId: 5375481,
    },
    domains: [
      "0d2.net",
      "003725.com",
      "0f6.b0094c.cn",
      "007515.com",
      "0guhi.jocose.cn",
    ],
    as: {
      asn: 15169,
      name: "Google LLC",
      route: "8.8.8.0/24",
      domain: "https://about.google/intl/en/",
      type: "Content",
    },
    isp: "Google LLC",
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-[1440px]">
        <Header handleChange={setSearchKeyword} />
        {keywordIsNotValid && searchKeyword.length > 0 && (
          <p>Not a valid ip address or url...</p>
        )}
        {/* {loading && <p>Loading the data...</p>}
      {error && <p>Failed to fetch the data</p>}
      {!loading && error === null && <Body data={data} />} */}
        <Body data={data} />
      </div>
    </div>
  );
}

export default App;
