import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./theme.jsx";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ToDo from "./pages/ToDo.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddToDo from "./components/AddToDo.jsx";
import EditToDo from "./components/EditToDo.jsx";

import "./custom.scss";
import ViewToDo from "./layouts/ViewToDo.jsx";

const router = createBrowserRouter([
  {
    path: "todo/",

    element: (
      <ViewToDo>
        <ToDo />
      </ViewToDo>
    ),
  },
  {
    path: "todo/add",
    element: (
      <ViewToDo>
        <AddToDo />
      </ViewToDo>
    ),
  },
  {
    path: "todo/edit",
    element: (
      <ViewToDo>
        <EditToDo />
      </ViewToDo>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
