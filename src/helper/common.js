const response = (res, result, code, message, pagination) => {
  const resultPrint = {};
  resultPrint.status = "success";
  resultPrint.statusCode = code;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  res.status(code).json(resultPrint);
};

module.exports = { response };
