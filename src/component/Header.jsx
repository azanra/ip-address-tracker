import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";

const Header = ({ handleChange }) => {
  const debounceKeyword = useMemo(() => {
    return debounce(handleChange, 500);
  }, [handleChange]);

  /* handleChange is state setter. because it is passed as props eslint complain
    (https://stackoverflow.com/questions/59198906/why-is-a-state-variables-setter-needed-as-a-dependency-with-useeffect-when-pass)
  */

  useEffect(() => {
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
          onChange={debounceKeyword}
          placeholder="Search for any IP address or URL"
        />
      </div>
    </div>
  );
};

export default Header;
