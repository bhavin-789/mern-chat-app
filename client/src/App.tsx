import { FC, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
// import { useAppStore } from "./store";
import { GET_USER_INFO } from "./utils/constants";
import { apiClient } from "./lib/api-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setUserInfo } from "./store/slices/storeSlice";

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
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
