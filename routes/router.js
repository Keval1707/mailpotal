const express = require('express');
const router = express.Router();
const sendEmail = require('../controllers/MailController');

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/form", (req, res) => {
  res.render("form");
});

router.post("/submit-form", async (req, res) => {
  let emailsInput = req.body.emails.trim(); 

  const emails = emailsInput.split(/[,\n\r]+/).map(email => email.trim()).filter(email => email !== '');

  const message = req.body.message;

  try {
    const results = await Promise.all(emails.map(email => {
      const data = {
        Email: email,
        Subject: "Form Submission",
        Message: message,
      };
      return sendEmail(data);
    }));

    console.log(results);
    res.render('response', { emails: emails.join(', '), message: message });
  } catch (error) {
    console.error('Error submitting form:', error.message);
    res.status(500).send('An error occurred while submitting the form.');
  }
});

module.exports = router;
