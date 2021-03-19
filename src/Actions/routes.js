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
    main: () => <Equipments />,
  },
  {
    path: "/upload",
    main: () => <UploadData />,
  },
];

export default routes;
