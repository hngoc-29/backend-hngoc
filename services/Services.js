const bcrypt = require('bcryptjs');
const Services = {
  Create: async(model, data) => {
    const newData = new model(data);
    return await newData.save();
  },
  update: async(model, id, data) => {
    return await model.findByIdAndUpdate(id, data, {
      new: true
    });
  },
  findOne: async(model, data, ignore) => {
    return await model.findOne(data).select(ignore);
  },
  findById: async(model, id, ignore) => {
    return await model.findById(id).select(ignore);
  },
  findAll: async(model, ignore = '') => {
    return await model.find({}).select(ignore);
  },
  findMany: async(model, data, ignore) => {
    return await model.find(data).select(ignore);
  },
  deleteOne: async(model, id) => {
    return await model.findByIdAndDelete(id);
  },
  checkPass: async(passInput, currentPass) => {
    return await bcrypt.compare(passInput, currentPass);
  },
}
module.exports = Services;