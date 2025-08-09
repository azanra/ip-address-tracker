import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";

const Header = ({ handleChange }) => {
  const debounceKeyword = useMemo(() => {
    console.log("debounce is memoized");
    return debounce(handleChange, 500);
  }, [handleChange]);

  /* 
    handleChange is state setter and it stable, but because it is 
    passed as props eslint complains
    (https://stackoverflow.com/questions/59198906/why-is-a-state-variables-setter-needed-as-a-dependency-with-useeffect-when-pass)
  */

  useEffect(() => {
    return () => {
      console.log("Debounce is canceled");
      debounceKeyword.cancel();
    };
  }, [debounceKeyword]);

  /*  
    debouncedKeyword is stable because it cached the debounce funct 
    with useMemo and since the dependancy of useMemo is state setter 
    then it should be stable (https://react.dev/reference/react/useMemo)
  */

  return (
    <div className="header pt-8">
      <div className="flex justify-center items-center mb-[16px]">
        <h1 className="text-white font-bold text-3xl">IP Address Tracker</h1>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="keyword"
          id="keyword"
          onChange={(e) => debounceKeyword(e.target.value)}
          placeholder="Search for any IP address or URL"
          className="bg-white px-8 py-4 rounded-md w-[500px]"
        />
      </div>
    </div>
  );
};

export default Header;
