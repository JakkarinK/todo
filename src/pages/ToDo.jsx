import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Typography,
  Zoom,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icon
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ToDo = () => {
  // Navigate to pages [react-router-dom]
  const navigate = useNavigate();

  //Todo List
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const _todoList = localStorage.getItem("todoList");
    setTodoList(JSON.parse(_todoList));
  }, []);

  // Open/Close Delete->Modal
  const [openModal, setOpenModal] = useState(false);
  const _deleteID = localStorage.getItem("deleteID");
  // Open Modal
  const openDeleteModal = (deleteID) => {
    localStorage.setItem("deleteID", deleteID);
    setOpenModal(true);
  };
  // Close Modal
  const closeDeleteModal = () => {
    localStorage.removeItem("deleteID");
    setOpenModal(false);
  };

  // Delete Task Todo
  const deleteHandler = (deleteID) => {
    const _todoList = todoList.filter((todo) => {
      if (todo._id !== deleteID) {
        return todo;
      }
    });
    setTodoList(_todoList);
    localStorage.setItem("todoList", JSON.stringify(_todoList));
    closeDeleteModal();
  };

  // Goto Todo->Edit
  const editHandler = (editID) => {
    localStorage.setItem("editID", editID);
    navigate("../todo/edit");
  };

  // Change complete Todo
  const onChangeCheckBox = (id) => {
    const changeComplete = todoList.map((todo) => {
      if (todo._id === id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      } else {
        return todo;
      }
    });

    setTodoList(changeComplete);
    localStorage.setItem("todoList", JSON.stringify(changeComplete));
  };

  // Style CSS Custom
  const ShowTodoList = styled(Box)({
    height: "500px",
    overflow: "auto",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  });

  const TODO = styled(Box)({
    border: "1px solid gray",
    borderRadius: "1rem",
    bgcolor: "white",
    padding: "1rem",
    marginBottom: "1rem",
    minHeight: 170,
  });

  const TodoLabel = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "135px",
    justifyContent: "space-between",
  });

  const ModalCard = styled(Box)({
    width: "400px",
    backgroundColor: "white",
    border: "2px solid #0f1214",
    boxShadow: "6rem",
    padding: "3rem 2rem",
    textAlign: "center",
    borderRadius: "20px",
  });

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3" mb={3}>
            To-Do List
          </Typography>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <Typography variant="h6">My Tasks</Typography>
              <Typography variant="body1">
                You have{" "}
                {todoList &&
                  todoList.filter((todo) => todo.complete === false)
                    .length}{" "}
                task left!
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("../todo/add");
                }}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ShowTodoList>
          {todoList && todoList.length > 0 ? (
            <Box width={"100%"}>
              {todoList.map((todo, idx) => (
                <TODO key={idx}>
                  <Grid container justifyContent={"space-between"}>
                    <Grid item xs={12} sm={8.5} display={"flex"} gap={1}>
                      <Grid container>
                        <Grid item xs={12} mobile={2}>
                          <Box
                            sx={{ textAlign: { xs: "left", mobile: "center" } }}
                          >
                            <Checkbox
                              size="large"
                              checked={todo.complete}
                              onClick={() => {
                                onChangeCheckBox(todo._id);
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} mobile={10}>
                          <TodoLabel>
                            <Box>
                              <Typography
                                className="todo-title"
                                variant="h4"
                                sx={{
                                  textDecoration:
                                    todo.complete === true
                                      ? "line-through"
                                      : undefined,
                                }}
                              >
                                {todo.title}
                              </Typography>
                              <Typography
                                className="todo-description"
                                variant="body1"
                                color={"gray"}
                              >
                                {todo.description}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" color={"red"}>
                                Due: {dayjs(todo.date).format("DD/MM/YYYY")}
                              </Typography>
                            </Box>
                          </TodoLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={"auto"}>
                      <IconButton
                        color="success"
                        size="large"
                        sx={{
                          width: "50%",
                        }}
                        onClick={() => {
                          editHandler(todo._id);
                        }}
                      >
                        <EditIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="large"
                        sx={{ width: "50%" }}
                        onClick={() => {
                          openDeleteModal(todo._id);
                        }}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Modal
                    keepMounted
                    open={openModal}
                    onClose={() => {
                      setOpenModal(false);
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Zoom in={openModal}>
                        <ModalCard>
                          <Typography variant="h5">Are you sure?</Typography>
                          <Typography variant="body1">
                            Do you want delete item.
                          </Typography>
                          <Box mt={3}>
                            <Grid
                              container
                              gap={2}
                              justifyContent={"space-between"}
                            >
                              <Grid item xs={5}>
                                <Button
                                  variant="contained"
                                  color="error"
                                  sx={{ width: "100%" }}
                                  onClick={() => {
                                    closeDeleteModal();
                                  }}
                                >
                                  No
                                </Button>
                              </Grid>
                              <Grid item xs={5}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  sx={{ width: "100%" }}
                                  onClick={() => {
                                    deleteHandler(_deleteID);
                                  }}
                                >
                                  Yes
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </ModalCard>
                      </Zoom>
                    </Box>
                  </Modal>
                </TODO>
              ))}
            </Box>
          ) : (
            <Box alignSelf={"center"}>
              <Typography textAlign={"center"}>
                - No local Database -
              </Typography>
            </Box>
          )}
        </ShowTodoList>
      </Box>
    </>
  );
};

export default ToDo;
