const validator = require('validator');

const emailDataBaseService = require('../services/emailDataBaseService');
const { ErrorHandler } = require('../utils/helpers/error');

exports.postEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new ErrorHandler(400, 'Email is required.');
    else if (!validator.isEmail(email)) throw new ErrorHandler(400, 'Wrong email format.');

    const isEmailExists = await emailDataBaseService.contains(email);

    if (!isEmailExists) await emailDataBaseService.add(email);

    res.json({ status: 'success', text: 'Email successfully saved.' });
  } catch (error) {
    if (error instanceof ErrorHandler) next(error);
    else next(new ErrorHandler());
  }
};
