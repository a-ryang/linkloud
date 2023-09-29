import { createBrowserRouter } from "react-router-dom";

import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;
