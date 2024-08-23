const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
    const orderDetails = {
        orderNumber: req.body.orderNumber,
        palletNumber: req.body.palletNumber,
        bandingUsed: req.body.bandingUsed === 'on',
        cornerProtectorsUsed: req.body.cornerProtectorsUsed === 'on',
        shrinkWrapped: req.body.shrinkWrapped === 'on',
        longestWidestPoints: req.body.longestWidestPoints === 'on',
        nearestTenthInch: req.body.nearestTenthInch === 'on',
        boxesNotDamaged: req.body.boxesNotDamaged === 'on',
        pallets: []
    };

    for (let i = 1; i <= orderDetails.palletNumber; i++) {
        orderDetails.pallets.push({
            length: req.body[`length${i}`],
            width: req.body[`width${i}`],
            height: req.body[`height${i}`],
            weight: req.body[`weight${i}`]
        });
    }

    sendEmail(orderDetails).then(() => {
        res.send('Email sent successfully!');
    }).catch(err => {
        res.send('Failed to send email: ' + err.message);
    });
});

async function sendEmail(orderDetails) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nick@pinnacleteam.com',  // Google Workspace email
            pass: 'Pinteam500k!!'            // Email account password or app-specific password
        }
    });

    let mailOptions = {
        from: 'bedtech@pinnacleteam.com',
        to: 'nick.jarvis@priority1inc.net',
        subject: 'New Pallet Measurement Submission',
        html: generateEmailContent(orderDetails)
    };

    return transporter.sendMail(mailOptions);
}

function generateEmailContent(orderDetails) {
    let emailBody = `
        <h2>Order Details</h2>
        <p><strong>Sales Order #:</strong> ${orderDetails.orderNumber}</p>
        <p><strong>Number of Pallets:</strong> ${orderDetails.palletNumber}</p>
        <h3>Checklist</h3>
        <p><strong>Banding Used:</strong> ${orderDetails.bandingUsed ? 'Yes' : 'No'}</p>
        <p><strong>Corner Protectors Used:</strong> ${orderDetails.cornerProtectorsUsed ? 'Yes' : 'No'}</p>
        <p><strong>Shrink Wrapped:</strong> ${orderDetails.shrinkWrapped ? 'Yes' : 'No'}</p>
        <p><strong>Used Longest/Widest points for measurements:</strong> ${orderDetails.longestWidestPoints ? 'Yes' : 'No'}</p>
        <p><strong>Measured to the nearest 1/10th inch:</strong> ${orderDetails.nearestTenthInch ? 'Yes' : 'No'}</p>
        <p><strong>Boxes are NOT damaged:</strong> ${orderDetails.boxesNotDamaged ? 'Yes' : 'No'}</p>
        <h3>Pallet Details</h3>
    `;

    orderDetails.pallets.forEach((pallet, index) => {
        emailBody += `
            <h4>Pallet ${index + 1}</h4>
            <p><strong>Length:</strong> ${pallet.length} inches</p>
            <p><strong>Width:</strong> ${pallet.width} inches</p>
            <p><strong>Height:</strong> ${pallet.height} inches</p>
            <p><strong>Weight:</strong> ${pallet.weight} lbs</p>
        `;
    });

    return emailBody;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
