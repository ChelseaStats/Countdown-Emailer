module.exports = Emailer;

function Emailer(sender, password) {
	var mailer = require('nodemailer');
	
	this._sender = sender;
	this._transport = mailer.createTransport({
		service: 'Gmail',
		auth: {
			user: sender,
			pass: password,
		}
	});
}

Emailer.prototype.sendMessage = function (subject, text, receiver) {	
	var mailOptions = {
		from: 'Countdown Mailer <' + this._sender + '>',
		to: receiver,
		subject: subject,
		text: text
	};
		
	this._transport.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
				console.log('Message sent: ' + info.response);
		}
	});
}
