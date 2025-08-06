import { useEffect, useState } from "react";

const APIKEY = "at_SNRnb8LP1ushNxlF7SpgpK4RSXsS0";

function useGetIpAddress(searchKeyword, firstTimeRenderFetchOwnIp) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = getUrl(searchKeyword, firstTimeRenderFetchOwnIp);

  useEffect(() => {
    if (!url) return;

    fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Fetching error, ", response);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

function getUrl(searchKeyword, firstTimeRenderFetchOwnIp) {
  if (searchKeyword.length === 0 && firstTimeRenderFetchOwnIp) {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}`;
    return url;
  } else if (isValidUrl(searchKeyword)) {
    const urlInput = new URL(searchKeyword);
    const domain = urlInput.host;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}&domain=${domain}`;
    return url;
  } else if (isValidIpAddress(searchKeyword)) {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}&ipAddress=${searchKeyword}`;
    return url;
  } else {
    return false;
  }
}

export function isValidUrl(searchKeyword) {
  try {
    new URL(searchKeyword);
    return true;
  } catch {
    console.log(new Error("Not a valid url!"));
    return false;
  }
}

export function isValidIpAddress(searchKeyword) {
  /*
  https://stackoverflow.com/questions/23483855/javascript-regex-to-validate-ipv4-and-ipv6-address-no-hostnames/69685444#69685444
  */
  const ipv46_regex =
    /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/gm;

  const isValid = ipv46_regex.test(searchKeyword);
  return isValid;
}

export default useGetIpAddress;
