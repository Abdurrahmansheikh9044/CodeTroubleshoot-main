function requiredText(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    const error = new Error(`${label} is required`);
    error.status = 400;
    throw error;
  }
  return value.trim();
}

function requiredYear(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    const error = new Error("Published year is required");
    error.status = 400;
    throw error;
  }
  const year = Math.trunc(parsed);
  const max = new Date().getFullYear() + 1;
  if (year < 1000 || year > max) {
    const error = new Error("Published year is out of range");
    error.status = 400;
    throw error;
  }
  return year;
}

function requiredPrice(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    const error = new Error("Price must be zero or greater");
    error.status = 400;
    throw error;
  }
  return Math.round(value * 100) / 100;
}

function requiredQuantity(value) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    const error = new Error("Quantity must be zero or greater");
    error.status = 400;
    throw error;
  }
  return value;
}

function requiredAdjustment(value) {
  if (typeof value !== "number" || !Number.isInteger(value) || value === 0) {
    const error = new Error("Adjustment must be a non-zero integer");
    error.status = 400;
    throw error;
  }
  return value;
}

function parseId(id) {
  if (!/^\d+$/.test(String(id))) {
    return null;
  }
  return Number(id);
}

module.exports = {
  requiredText,
  requiredYear,
  requiredPrice,
  requiredQuantity,
  requiredAdjustment,
  parseId,
};
