import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddToDo = () => {
  // Genarate _ID with uuid
  const generateID = uuidv4();
  // Navigate to pages [react-router-dom]
  const navigate = useNavigate();

  // Create data
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputDate, setInputDate] = useState(Date());

  // Submit [Add Todo]
  const onSubmitHandler = () => {

    const _todoList =
      localStorage.getItem("todoList") &&
      localStorage.getItem("todoList").length > 0
        ? JSON.parse(localStorage.getItem("todoList"))
        : [];
    localStorage.setItem(
      "todoList",
      JSON.stringify([
        ..._todoList,
        {
          _id: generateID,
          title: inputTitle,
          description: inputDescription,
          date: inputDate,
          complete: false,
        },
      ])
    );

    navigate("../todo/");
  };

  return (
    <>
      <Box bgcolor={"white"}>
        <form onSubmit={ ()=>{ onSubmitHandler()}}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box mb={3}>
              <Grid container justifyContent={"space-between"}>
                <Grid item>
                  <Typography variant="h4" className="h4">
                    Add Task
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      navigate("../todo/");
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
                setInputDate(dayjs(value).format("YYYY-MM-DD"));
              }}
              slotProps={{
                textField: {
                  required: true,
                  value: dayjs(inputDate),
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
            >
              Add Task
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddToDo;
