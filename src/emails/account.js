const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rodrigomarcondes2000@gmail.com',
        subject: 'Thanks for joining',
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rodrigomarcondes2000@gmail.com',
        subject: 'Account cancelling',
        text: `Dead ${name}, we saw you just cancelled your account. That's sad`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}