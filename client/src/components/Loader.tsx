import { useEffect, useState } from "react";

const Loader = (WrappedComponent) => {
  return () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }, []);
    return (
      <>
        {showLoader ? (
          <div className="h-screen bg-gray-200 flex justify-center items-center">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <WrappedComponent />
        )}
      </>
    );
  };
};

export default Loader;
