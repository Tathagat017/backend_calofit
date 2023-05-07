const searchFilterSortMiddleware = async (req, res, next) => {
  const query = {};

  // If search query is provided, filter products by name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }

  // If filter queries are provided, filter products by the corresponding fields
  if (req.query.kcal) {
    query.kcal = { $gte: Number(req.query.kcal) };
  }
  if (req.query.carb) {
    query.carb = { $gte: Number(req.query.carb) };
  }
  if (req.query.protein) {
    query.protein = { $gte: Number(req.query.protein) };
  }
  if (req.query.vitA) {
    query.vitA = { $gte: Number(req.query.vitA) };
  }
  if (req.query.vitD) {
    query.vitD = { $gte: Number(req.query.vitD) };
  }
  if (req.query.vitC) {
    query.vitC = { $gte: Number(req.query.vitC) };
  }
  if (req.query.vitE) {
    query.vitE = { $gte: Number(req.query.vitE) };
  }
  if (req.query.mineral) {
    query.mineral = { $gte: Number(req.query.mineral) };
  }
  if (req.query.fat) {
    query.fat = { $gte: Number(req.query.fat) };
  }
  if (req.query.potassium) {
    query.potassium = { $gte: Number(req.query.potassium) };
  }

  // If sort query is provided, sort products by the corresponding field
  let sort = {};
  if (req.query.sortBy) {
    sort[req.query.sortBy] = req.query.sortOrder === "desc" ? -1 : 1;
  }
  // Set default pagination parameters
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;
  // Add the query and sort parameters to the request object so that downstream middleware can access them
  req.queryParams = { query, sort, page, limit, skip };

  // Pass control to the next middleware in the chain
  next();
};
module.exports = { searchFilterSortMiddleware };
