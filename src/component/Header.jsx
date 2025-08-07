import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";

const Header = ({ handleChange }) => {
  const debounceKeyword = useMemo(() => {
    console.log("debounce is memoized");
    return debounce(handleChange, 500);
  }, [handleChange]);

  /* handleChange is state setter. because it is passed as props eslint complain
    (https://stackoverflow.com/questions/59198906/why-is-a-state-variables-setter-needed-as-a-dependency-with-useeffect-when-pass)
  */

  useEffect(() => {
    console.log("Debounce is canceled");
    return () => {
      debounceKeyword.cancel();
    };
  }, [debounceKeyword]);

  return (
    <div>
      <div>
        <h1>IP Address Tracker</h1>
      </div>
      <div>
        <input
          type="text"
          name="keyword"
          id="keyword"
          onChange={(e) => debounceKeyword(e.target.value)}
          placeholder="Search for any IP address or URL"
        />
      </div>
    </div>
  );
};

export default Header;
