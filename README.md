📅 ReserveIt | Premium Booking App
ReserveIt is a high-fidelity appointment booking application built with React Native. It features a modern, dark-themed UI with glassmorphism effects, smooth micro-interactions, and a seamless local authentication flow.

✨ Features
🌈 Premium Gradient UI: A deep indigo and purple aesthetic using expo-linear-gradient.

🪟 Glassmorphism: Semi-transparent cards and headers with subtle borders for a modern "Apple-style" depth.

🧭 Floating Navigation: A detached, rounded bottom tab bar for easy thumb navigation.

🔐 Local Auth System: Fully functional Login and Register flow powered by AsyncStorage.

📊 Smart Dashboard: Categorized specialist search with real-time filtering logic.

⚡ Fluid Animations: Staggered list entries and layout transitions using react-native-reanimated.

🛠️ Tech Stack
Framework: React Native (Expo)

Styling: React Native Paper & Custom Styles

Navigation: React Navigation (Stack & Tabs)

Animations: React Native Reanimated

Icons: Material Community Icons

Storage: @react-native-async-storage/async-storage


Gemini said
This README is designed to give your project a professional, "App Store" ready feel. It highlights the premium tech stack you've used (Gradients, Glassmorphism, and Reanimated) and explains how the local authentication works.

📅 ReserveIt | Premium Booking App
ReserveIt is a high-fidelity appointment booking application built with React Native. It features a modern, dark-themed UI with glassmorphism effects, smooth micro-interactions, and a seamless local authentication flow.

✨ Features
🌈 Premium Gradient UI: A deep indigo and purple aesthetic using expo-linear-gradient.

🪟 Glassmorphism: Semi-transparent cards and headers with subtle borders for a modern "Apple-style" depth.

🧭 Floating Navigation: A detached, rounded bottom tab bar for easy thumb navigation.

🔐 Local Auth System: Fully functional Login and Register flow powered by AsyncStorage.

📊 Smart Dashboard: Categorized specialist search with real-time filtering logic.

⚡ Fluid Animations: Staggered list entries and layout transitions using react-native-reanimated.

🛠️ Tech Stack
Framework: React Native (Expo)

Styling: React Native Paper & Custom Styles

Navigation: React Navigation (Stack & Tabs)

Animations: React Native Reanimated

Icons: Material Community Icons

Storage: @react-native-async-storage/async-storage

🚀 Getting Started
Prerequisites
Make sure you have Node.js installed and the Expo Go app on your physical device or an emulator ready.

Installation
Clone the repository

Bash
git clone https://github.com/Parthapratim09/QuickBook-App.git
cd QuickBook-App
Install dependencies

Bash
npx expo install expo-linear-gradient expo-blur react-native-reanimated react-native-paper @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-native-async-storage/async-storage react-native-safe-area-context react-native-screens
Start the project

Bash
npx expo start
📂 Project Structure
Plaintext
├── App.js                 # App Entry & Navigation Logic
├── screens/
│   ├── LandingScreen.js    # Welcome Screen
│   ├── LoginScreen.js      # Local Auth Login
│   ├── RegisterScreen.js   # Local Auth Registration
│   ├── HomeScreen.js       # Specialist Discovery (Dashboard)
│   ├── ProviderDetails.js  # Specialist Profile
│   ├── BookingScreen.js    # Slot Selection & Confirmation
│   └── AppointmentsScreen.js # User's Booked Slots
├── components/
│   └── ProviderCard.js     # Reusable Glassmorphism Card
└── data/
    └── providers.js        # Mock Data for Specialists


🔐 How Authentication Works
This app uses a Local Persistence Model.

When you Register, your credentials (Name, Email, Password) are stringified and stored in the device's private storage using AsyncStorage under the key user_session.

When you Login, the app retrieves that string, parses it back into an object, and compares the inputs.

Because it is local, you must register on the specific device/emulator you are testing on before logging in.