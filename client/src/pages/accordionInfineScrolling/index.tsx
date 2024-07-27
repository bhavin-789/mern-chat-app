// import Loader from "@/components/Loader";
import { apiClient } from "@/lib/api-client";
import { delay } from "@/lib/utils";
import { GET_ACCORDIONS_ROUTE } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AccordionInfiniteScrolling = () => {
  const [pageForIS, setPageForIS] = useState(1);
  const [dataForIS, setDataForIS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [accordionOpenForIS, setAccordionOpenForIS] = useState(false);
  const [showLoaderIS, setShowLoaderIS] = useState(true);

  const getAllTheAccordions = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `${GET_ACCORDIONS_ROUTE}?page=${pageForIS}&limit=25`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 && response.data.accordions) {
        if (!!dataForIS.length) {
          await delay(1000);
        }
        setDataForIS((prevData) => [...prevData, ...response.data.accordions]);
        setHasMore(response.data.accordions.length > 0);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Error during fetching all the accordions to my infinite scroll component",
          error.message
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTheAccordions(pageForIS);
  }, [pageForIS]);

  const handleScroll = useCallback(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      // Check if there is more data to fetch and if it's not already loading
      if (hasMore && !isLoading) {
        setPageForIS((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoaderIS(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
    // (async () => {
    //   await delay(3000);
    //   setShowLoader(false);
    // })();
  }, []);

  return (
    <>
      {showLoaderIS ? (
        <>
          {/* <div className="h-screen bg-gray-200 flex justify-center items-center">
            <Loader />
          </div> */}
          <div className="space-y-4 p-5">
            {Array.from({ length: 25 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-300 rounded-lg animate-pulse"
              >
                <div className="w-3/4 h-6 bg-gray-400 rounded"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-100vw bg-gray-200 overflow-y-auto p-5 rounded-lg">
          <Link to="/chat" className="text-white bg-green-500 rounded-lg p-2 ">
            Back to chat
          </Link>
          <div className="p-4">
            <div className="p-4 bg-gray-200 rounded-lg">
              {dataForIS.length > 0 &&
                dataForIS.map((accordion) => (
                  <div className="py-2" key={accordion._id}>
                    <div className="flex justify-between items-center">
                      <button
                        className="flex justify-between flex-1 pr-5 items-center"
                        onClick={() =>
                          setAccordionOpenForIS(!accordionOpenForIS)
                        }
                      >
                        <span>{accordion.question}</span>
                        {/* <span>{`${accordionOpen ? "-" : "+"}`}</span> */}
                        <div className="">
                          <svg
                            className="fill-indigo-500 shrink-0"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="7"
                              width="16"
                              height="2"
                              rx="1"
                              className={`transform origin-center transition duration-200 ease-out ${
                                accordionOpenForIS && "!rotate-180"
                              }`}
                            />
                            <rect
                              y="7"
                              width="16"
                              height="2"
                              rx="1"
                              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                accordionOpenForIS && "!rotate-180"
                              }`}
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div
                      className={` grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
                        accordionOpenForIS
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      } `}
                    >
                      <div className="overflow-hidden">{accordion.answer}</div>
                    </div>
                  </div>
                ))}
              {isLoading && (
                <div className="text-center mx-auto flex justify-center items-center p-5">
                  {/* <Loader /> */}
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
              )}
              {!hasMore && <p className="text-center">No more items!</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccordionInfiniteScrolling;
