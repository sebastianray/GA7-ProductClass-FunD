const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NODEMAILER,
		pass: process.env.NODEMAILER_PASS
	}
});

module.exports = {
   smtpTransport
}