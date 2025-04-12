import { create } from 'venom-bot';

const testNumber = '918010464802'; // Replace with your number

// Dummy crop data
const crop = {
  state: 'Maharashtra',
  district: 'Pune',
  market: 'Pimpri Mandi',
  commodity: 'Wheat',
  variety: 'Sharbati',
  grade: 'A',
  min_price: 1800,
  max_price: 2200,
  modal_price: 2000,
  date: new Date().toISOString(),
};

const message = `
🌾 *New Crop Price Update!*
📍 ${crop.state} / ${crop.district} / ${crop.market}
🌱 ${crop.commodity} - ${crop.variety} - Grade: ${crop.grade}
💰 ₹${crop.min_price} → ₹${crop.max_price} (Modal: ₹${crop.modal_price})
🗓️ Date: ${new Date(crop.date).toLocaleDateString('en-IN')}
➡️ Visit KrishiSetu for more info!
`;

create({
  session: 'krishisetu-test',
  multidevice: true,
  headless: true,
  browserArgs: ['--headless=new'], // ✅ Fix for Chrome v135+
}).then(async (client) => {
  console.log('✅ Venom client initialized');

  try {
    const result = await client.sendText(`${testNumber}@c.us`, message);
    console.log(`✅ Message sent:`, result);
  } catch (err) {
    console.error(`❌ Failed to send message`, err);
  }

  setTimeout(() => process.exit(), 5000);
}).catch((err) => {
  console.error('❌ Venom failed to start', err);
});
