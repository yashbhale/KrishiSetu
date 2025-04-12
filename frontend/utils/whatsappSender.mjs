import { create } from 'venom-bot';

const rawInput = process.argv[2];
if (!rawInput) {
  console.error('❌ No input provided to script');
  process.exit(1);
}

let crop;
try {
  crop = JSON.parse(decodeURIComponent(rawInput));
} catch (err) {
  console.error('❌ Failed to parse crop input:', err);
  process.exit(1);
}

console.log('✅ Parsed crop data:', crop);

const testNumber = '918010464802';

const message = `
🌾 *New Crop Price Update!*
📍 ${crop.state} / ${crop.district} / ${crop.market}
🌱 ${crop.commodity} - ${crop.variety} - Grade: ${crop.grade}
💰 ₹${crop.min_price} → ₹${crop.max_price} (Modal: ₹${crop.modal_price})
🗓️ Date: ${new Date(crop.date).toLocaleDateString('en-IN')}
➡️ Visit KrishiSetu for more info!
`;

create({
  session: 'krishisetu-prod',
  multidevice: true,
  headless: true,
  browserArgs: ['--headless=new'],
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
