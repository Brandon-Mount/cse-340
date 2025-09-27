const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

// controllers/inventoryController.js
const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function buildById(req, res, next) {
  const inv_id = req.params.inv_id;
  try {
    const data = await invModel.getVehicleById(inv_id);
    if (!data) {
      return res.status(404).send("Vehicle not found");
    }

    const grid = await utilities.buildVehicleDetail(data);

    res.render("./inventory/detail", {
      title: `${data.inv_year} ${data.inv_make} ${data.inv_model}`,
      grid,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
}


 module.exports = {invCont, buildById}