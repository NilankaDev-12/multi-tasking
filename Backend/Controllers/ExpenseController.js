import ExpenseModel from "../Models/Expense.js"; 

export const createExpense = async (req, res) => {
  try {
    const { description, amount } = req.body;

    if (!description || amount === undefined) {
      return res.status(400).json({
        message: "Title, description, and amount are required",
        success: false,
      });
    }

    const expense = new ExpenseModel({description, amount });
    await expense.save();

    res.status(201).json({
      message: "Expense created successfully",
      success: true,
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find();
    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getSingleExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const {description, amount } = req.body;

    const expense = await ExpenseModel.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
        success: false,
      });
    }

    if (description !== undefined) expense.description = description;
    if (amount !== undefined) expense.amount = amount;

    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      success: true,
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteSingleExpense = async (req, res) => {
  try {
    const deletedExpense = await ExpenseModel.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
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

export const deleteAllExpenses = async (req, res) => {
  try {
    const deletedExpenses = await ExpenseModel.deleteMany({});

    res.status(200).json({
      message: "All expenses deleted successfully",
      success: true,
      deletedCount: deletedExpenses.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
