import SavingModel from "../Models/Saving.js"; 


export const createSaving = async (req, res) => {
  try {
    const { description, amount } = req.body;

    if (!description || amount === undefined) {
      return res.status(400).json({
        message: "Description and amount are required",
        success: false,
      });
    }

    const saving = new SavingModel({ description, amount });
    await saving.save();

    res.status(201).json({
      message: "Saving created successfully",
      success: true,
      saving,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


export const getAllSavings = async (req, res) => {
  try {
    const savings = await SavingModel.find();
    res.status(200).json({
      success: true,
      savings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


export const getSingleSaving = async (req, res) => {
  try {
    const saving = await SavingModel.findById(req.params.id);

    if (!saving) {
      return res.status(404).json({
        message: "Saving not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      saving,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};


export const updateSaving = async (req, res) => {
  try {
    const { description, amount } = req.body;

    const saving = await SavingModel.findById(req.params.id);
    if (!saving) {
      return res.status(404).json({
        message: "Saving not found",
        success: false,
      });
    }

    if (description !== undefined) saving.description = description;
    if (amount !== undefined) saving.amount = amount;

    await saving.save();

    res.status(200).json({
      message: "Saving updated successfully",
      success: true,
      saving,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteSingleSaving = async (req, res) => {
  try {
    const deletedSaving = await SavingModel.findByIdAndDelete(req.params.id);

    if (!deletedSaving) {
      return res.status(404).json({
        message: "Saving not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Saving deleted successfully",
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


export const deleteAllSavings = async (req, res) => {
  try {
    const deletedSavings = await SavingModel.deleteMany({});

    res.status(200).json({
      message: "All savings deleted successfully",
      success: true,
      deletedCount: deletedSavings.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
