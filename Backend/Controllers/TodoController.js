import TodoModel from "../Models/Todo.js"; 

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
        success: false,
      });
    }

    const todo = new TodoModel({ title, description });
    await todo.save();

    res.status(201).json({
      message: "Todo created successfully",
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getSingleTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const todo = await TodoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;

    await todo.save(); 

    res.status(200).json({
      message: "Todo updated successfully",
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteSingleTodo = async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteAllTodo = async (req, res) => {
  try {
    const deletedTodos = await TodoModel.deleteMany({});

    res.status(200).json({
      message: "All todos deleted successfully",
      success: true,
      deletedCount: deletedTodos.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
