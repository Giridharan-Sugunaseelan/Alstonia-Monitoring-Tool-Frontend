import "./App.css";
import VerticalDropdownComponent from "./components/ApplicationStatusComponent/VerticalDropDownComponent";
import InstanceComponent from "./components/InstanceComponent/InstanceComponent";
import ServerStatusComponent from "./components/ServerStatusComponent/ServerStatusComponent";
import ServiceNodeComponent from "./components/ServiceNodeComponent/ServiceNodeComponent";
import NavigationbarComponent from "./components/NavigationbarComponent/NavigationbarComponent";
import DashboardComponent from "./components/DashboardComponent/DashboardComponent";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import { Route, Routes } from "react-router-dom";
import StatusComponent from "./components/StatusComponent/StatusComponent";
import WebSocketListener from "./websocketlistener/WebSocketListener";

export default function App() {
  return (
    <>
      <WebSocketListener />
      <div className="h-screen flex flex-col">
        <div className="h-16 flex-shrink-0 bg-white border-b border-gray-300">
          <HeaderComponent />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-80 bg-gray-100 overflow-y-auto">
            <NavigationbarComponent />
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <Routes>
              <Route
                path="/servers/:serviceNode"
                element={<DashboardComponent />}
              />
              {/* <Route
                path="/application-statistics"
                element={<ApplicationStatistics />}
              /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
