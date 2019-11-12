const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

const appRoot = path.dirname(require.main.filename);
const emailsDataBaseFile = path.join(appRoot, 'emailsDataBase.json');

const emailDataBaseService = {
  async contains(email) {
    const isEmailDataBaseExists = await (exists(emailsDataBaseFile));

    if (!isEmailDataBaseExists) return false;

    const emailDataBase = await readFile(emailsDataBaseFile);
    const { emails } = JSON.parse(emailDataBase);

    return emails.includes(email);
  },
  async add(email) {
    const isEmailDataBaseExists = await exists(emailsDataBaseFile);

    const createNewEmailDataBase = () => {
      const newEmailDataBase = { emails: [email] };

      return writeFile(emailsDataBaseFile, JSON.stringify(newEmailDataBase));
    };
    const insertIntoDataBase = async () => {
      const emailDataBase = await readFile(emailsDataBaseFile, 'utf-8');
      const parsedEmailDataBase = JSON.parse(emailDataBase);
      const newEmailDataBase = { emails: [...parsedEmailDataBase.emails, email] };

      return writeFile(emailsDataBaseFile, JSON.stringify(newEmailDataBase));
    };

    return isEmailDataBaseExists
      ? insertIntoDataBase()
      : createNewEmailDataBase();
  },
};

module.exports = emailDataBaseService;
