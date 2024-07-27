import { FC, lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
const Auth = lazy(() => import("./pages/auth"));
const Chat = lazy(() => import("./pages/chat"));
const Profile = lazy(() => import("./pages/profile"));
const AccordionPagination = lazy(() => import("./pages/accordionPagination"));
const AccordionInfiniteScrolling = lazy(
  () => import("./pages/accordionInfineScrolling")
);
// import { SocketProvider } from "./context/SocketContext";

// const Accordion = lazy(() => import("./pages/accordionPagination"));
// import Auth from "./pages/auth";
// import Chat from "./pages/chat";
// import Profile from "./pages/profile";
// import Accordion from "./pages/accordion";
// import { useAppStore } from "./store";
import { GET_USER_INFO } from "./utils/constants";
import { apiClient } from "./lib/api-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setUserInfo } from "./store/slices/storeSlice";
// import AccordionInfiniteScrolling from "./pages/accordionInfineScrolling";
// import AccordionPagination from "./pages/accordionPagination";

const App: FC = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.store);

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    // const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    // const { userInfo } = useAppStore();
    // const { userInfo } = useSelector((state: RootState) => state.store);
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/chat" /> : children;
  };

  const [loading, setLoading] = useState<boolean>(true);

  // const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    const getUSerData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          // setUserInfo(response.data);
          dispatch(setUserInfo(response.data));
        } else {
          // setUserInfo(undefined);
          dispatch(setUserInfo(undefined));
        }
      } catch (error) {
        // setUserInfo(undefined);
        dispatch(setUserInfo(undefined));
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUSerData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <Auth />
              </Suspense>
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              {/* <SocketProvider> */}
              <Suspense fallback={<p>Loading...</p>}>
                <Chat />
              </Suspense>
              {/* </SocketProvider> */}
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <Profile />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/accordion-pagination"
          element={
            <PrivateRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <AccordionPagination />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/accordion-infinite-scrolling"
          element={
            <PrivateRoute>
              <Suspense fallback={<p>Loading...</p>}>
                <AccordionInfiniteScrolling />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
