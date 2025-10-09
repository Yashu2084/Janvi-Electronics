const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your details
const TOKEN = "YOUR_PERMANENT_ACCESS_TOKEN";
const PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID"; 
const TO_WHATSAPP = "91xxxxxxxxxx"; // Your WhatsApp number with country code

app.post("/send-whatsapp", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: TO_WHATSAPP,
        type: "text",
        text: {
          body: `📩 *New Contact Form Submission*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n📝 Message: ${message}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
