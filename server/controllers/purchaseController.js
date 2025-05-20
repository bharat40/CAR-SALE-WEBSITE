const sendMail = require('../utils/mailer');

exports.makePayment = async (req, res) => {
    const { email, items, total } = req.body;

    if (!email || !items || !total) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Build items list string for email
    const itemsList = items
        .map(
            (item) =>
                `${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price * item.quantity}`
        )
        .join("\n");

    // Email content
    const mailOptions = {
        from: "singlabhargav2004@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Congratulations on your car purchase!",
        text: `Dear customer,

Thank you for your purchase! Here are your purchase details:

Items:
${itemsList}

Total Paid: ₹${total.toFixed(2)}

We hope you enjoy your new car.

Best regards,
Car Sale Team`,
    };

    try {
        await sendMail(mailOptions);
        res.json({ message: "Purchase email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send purchase email" });
    }
};