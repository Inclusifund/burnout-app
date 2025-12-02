const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// NOTE: This script assumes you have a valid firebase config.
// In a real scenario, you might load this from env vars or a config file.
// For this demo, we'll try to require the config file if it's JS, or just mock it if it's TS (since we can't require TS directly without compilation).
// Since our config is TS, we'll just ask the user to provide credentials via ENV or hardcode them here for the seed script.
// OR, we can try to read the config file text and parse it (fragile).
// BETTER: Let's assume standard env vars for now or just use a placeholder config that the user must fill.

// To run this: node scripts/seed.js

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
    projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedDataPath = path.join(__dirname, '../firebase/seed.json');

async function seed() {
    try {
        const data = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

        console.log('Seeding Discounts...');
        for (const discount of data.discounts) {
            await setDoc(doc(db, 'discounts', discount.id), discount);
            console.log(`Added discount: ${discount.title}`);
        }

        console.log('Seeding Scripts...');
        for (const script of data.scripts) {
            await setDoc(doc(db, 'scripts', script.id), script);
            console.log(`Added script: ${script.title}`);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
