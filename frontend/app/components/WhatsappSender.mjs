import { create } from 'venom-bot';
import mongoose from 'mongoose';
import User from '../models/User';

const MONGO_URI = 'mongodb+srv://yashvivekbhale:Yash12345@cluster0.hbyhn.mongodb.net/?authMechanism=DEFAULT';
await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rawInput = process.argv[2];
const crop = rawInput ? JSON.parse(decodeURIComponent(rawInput)) : {};

const users = await User.find({}, 'contact');

const message = `
🌾 *New Crop Price Update!*
📍 ${crop.state} / ${crop.district} / ${crop.market}
🌱 ${crop.commodity} - ${crop.variety} - Grade: ${crop.grade}
💰 ₹${crop.min_price} → ₹${crop.max_price} (Modal: ₹${crop.modal_price})
🗓️ Date: ${crop.date}
➡️ Visit KrishiSetu for more info!
`;

create().then(async (client) => {
  for (const user of users) {
    const number = user.contact.replace(/\D/g, '');
    if (number.length === 12) {
      await client.sendText(`${number}@c.us`, message);
      console.log(`✅ Sent to: ${number}`);
    } else {
      console.warn(`❌ Skipped invalid number: ${user.contact}`);
    }
  }
  process.exit();
});
