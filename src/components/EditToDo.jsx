import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditToDo = () => {
  // Navigate to pages [react-router-dom]
  const navigate = useNavigate();

  useEffect(() => {
    setDefault();
  }, []);

  // Create data
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputDate, setInputDate] = useState("Date()");

  // Set Default Input
  const setDefault = () => {
    const todoList =
      localStorage.getItem("todoList") &&
      localStorage.getItem("todoList").length > 0
        ? JSON.parse(localStorage.getItem("todoList"))
        : [];

    const _todoList = () => {
      todoList.map((todo) => {
        if (todo._id === localStorage.getItem("editID")) {
          setInputTitle(todo.title);
          setInputDescription(todo.description);
          setInputDate(todo.date);
        }
      });
    };
    _todoList();
  };

  // Submit [Edit Todo]
  const onSubmitHandler = () => {
    const todoList =
      localStorage.getItem("todoList") &&
      localStorage.getItem("todoList").length > 0
        ? JSON.parse(localStorage.getItem("todoList"))
        : [];

    const _todoList = todoList.map((todo) => {
      if (todo._id === localStorage.getItem("editID")) {
        return {
          ...todo,
          title: inputTitle,
          description: inputDescription,
          date: inputDate,
        };
      } else {
        return todo;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(_todoList));
    localStorage.removeItem("editID");
    navigate("../todo/");
  };

  // Go to Edit -> Page
  const goToListPage = () => {
    localStorage.removeItem("editID");
    navigate("../todo/");
  };

  return (
    <>
      <form
        onSubmit={() => {
          onSubmitHandler();
        }}
      >
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box mb={3}>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography variant="h4" className="h4">
                  Edit Task
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    goToListPage();
                  }}
                >
                  Backward
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h6">
            Title{" "}
            <Typography
              className="label-require"
              variant="h6"
              component={"span"}
            >
              *
            </Typography>
          </Typography>
          <TextField
            required
            id="title"
            name="title"
            variant="outlined"
            placeholder="Enter Title"
            size="medium"
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
          />
          <Typography variant="h6">
            Description{" "}
            <Typography
              className="label-require"
              variant="h6"
              component={"span"}
            >
              *
            </Typography>
          </Typography>
          <TextField
            required
            id="description"
            name="description"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter Description"
            size="medium"
            value={inputDescription}
            onChange={(e) => {
              setInputDescription(e.target.value);
            }}
          />
          <Typography variant="h6">
            Due{" "}
            <Typography
              className="label-require"
              variant="h6"
              component={"span"}
            >
              *
            </Typography>
          </Typography>
          <DatePicker
            minDate={dayjs(Date())}
            format="DD/MM/YYYY"
            name="date"
            onChange={(value) => {
              setInputDate(value);
            }}
            slotProps={{
              textField: {
                required: true,
                defaultValue: dayjs(inputDate),
                value: dayjs(inputDate),
              },
            }}
          />
          <Button variant="contained" type="submit">
            Edit Task
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditToDo;
