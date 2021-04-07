import { Dashboard } from "../Pages/Dashboard.js";
import { UploadData } from "../Pages/UploadData.js";
import { Equipments } from "../Pages/Equipments.js";
import { Activities } from "../Pages/Activities.js";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Dashboard />,
  },
  {
    path: "/activities",
    exact: true,
    main: () => <Activities />,
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
