import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Responsive.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Dashboard";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import ProductUpload from "./pages/ProductUpload";
import CategoryAdd from "./pages/CategoryAdd";
import CategoryList from "./pages/CategoryList";
import LoadingBar from "react-top-loading-bar";
import { Email } from "@mui/icons-material";

const Mycontext = createContext();

function App() {
  const [isSidebar, setisSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  // const [themeMode, setThemeMode] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );
  const [themeMode, setThemeMode] = useState(true);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [progress, setProgress] = useState(0);
  const [baseUrl, setBaseurl] = useState("http://localhost:4000");
  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: "fasle",
    open: false,
  });
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });
  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "dark");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    const handleResize = () => {
      setwindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const openNav = () => {
    setIsOpenNav(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const values = {
    isLogin,
    setIsLogin,
    isSidebar,
    setisSidebar,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    progress,
    setProgress,
    baseUrl,
    alertBox,
    setAlertBox,
    setUser,
    user,
  };

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className="topLoadingBar"
        />

        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
              <div
                className={`sidebarOverlay d-none ${
                  isOpenNav === true && "show"
                }`}
                onClick={() => setIsOpenNav(false)}
              ></div>
              <div
                className={`sidebarWrapper ${
                  isSidebar === true ? "toggle" : ""
                } ${isOpenNav === true ? "open" : ""}`}
              >
                <SideBar />
              </div>
            </>
          )}

          <div
            className={`content ${isHideSidebarAndHeader === true && "full"} ${
              isSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/product/details" element={<ProductDetails />} />
              <Route path="/product/list" element={<ProductList />} />
              <Route path="/product/edit/{_id}" element={<ProductList />} />
              <Route path="/product/delete/{_id}" element={<ProductList />} />
              <Route path="/product/upload" element={<ProductUpload />} />
              <Route path="/category/add" element={<CategoryAdd />} />
              <Route path="/category/list" element={<CategoryList />} />
              <Route path="/category/edit/{_id}" element={<CategoryList />} />
              <Route path="/category/delete/{_id}" element={<CategoryList />} />
            </Routes>
          </div>
        </div>
      </Mycontext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { Mycontext };
