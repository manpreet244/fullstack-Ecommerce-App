const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "Category already exists." });
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.json("Category created.");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  remove: async(req , res) => {
    try{
      await Category.findByIdAndDelete(req.params.id)
      res.json({msg : "Deleted a Category"})
    }catch(err){

    }
  },
  update: async(req , res) => {
    try{
    const {name} = req.body;
    await Category.findByIdAndUpdate({_id :req.params.id} , {name})
    res.json({msg:"Updated"})
    }catch(err){
   return res.status(500).json({msg :err.message})
    }
  }
};

module.exports = categoryCtrl;
