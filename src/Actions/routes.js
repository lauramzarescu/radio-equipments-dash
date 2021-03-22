import { Dashboard } from "../Pages/Dashboard.js";
import { Equipments } from "../Pages/Equipments.js";
import { UploadData } from "../Pages/UploadData.js";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Dashboard />,
  },
  {
    path: "/equipments",
    exact: true,
    main: () => <Equipments />,
  },
  {
    path: "/upload",
    exact: true,
    main: () => <UploadData />,
  },
];

export default routes;
