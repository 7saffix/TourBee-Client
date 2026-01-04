import { Outlet } from "react-router";
import CommonLayout from "./components/ui/layout/CommonLayout";

const App = () => {
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
};

export default App;
