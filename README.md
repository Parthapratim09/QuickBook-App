# 📅 QuickBook | Premium Booking App

**ReserveIt** is a high-fidelity appointment booking application built with **React Native (Expo)**.
It delivers a modern, dark-themed experience featuring **glassmorphism UI**, **smooth micro-interactions**, and a **seamless local authentication system**.

Designed with a focus on **premium aesthetics** and **fluid UX**, ReserveIt mimics real-world production apps while running entirely on local storage.

---

## ✨ Features

### 🌈 Premium Gradient UI

* Elegant **indigo–purple gradients** using `expo-linear-gradient`
* Visually rich, modern design inspired by high-end apps

### 🪟 Glassmorphism Design

* Frosted-glass cards & headers
* Subtle borders and transparency for depth (Apple-style UI)

### 🧭 Floating Navigation

* Rounded **bottom tab bar**
* Optimized for thumb-friendly interaction

### 🔐 Local Authentication System

* Register & Login flow using **AsyncStorage**
* Secure local persistence (`user_session`)
* No backend required

### 📊 Smart Dashboard

* Browse specialists with **category-based filtering**
* Real-time search experience

### ⚡ Fluid Animations

* Smooth transitions powered by **React Native Reanimated**
* Staggered list animations for premium feel

---

## 🛠️ Tech Stack

| Category   | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | React Native (Expo)                |
| Styling    | React Native Paper + Custom Styles |
| Navigation | React Navigation (Stack & Tabs)    |
| Animations | React Native Reanimated            |
| Icons      | Material Community Icons           |
| Storage    | AsyncStorage                       |

---

## 🚀 Getting Started

### 📌 Prerequisites

* Node.js installed
* Expo Go app (or emulator)

---

### ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Parthapratim09/QuickBook-App.git

# Navigate into project
cd QuickBook-App

# Install dependencies
npx expo install \
expo-linear-gradient \
expo-blur \
react-native-reanimated \
react-native-paper \
@react-navigation/native \
@react-navigation/native-stack \
@react-navigation/bottom-tabs \
@react-native-async-storage/async-storage \
react-native-safe-area-context \
react-native-screens

# Start the app
npx expo start
```

---

## 📂 Project Structure

```
├── App.js                     # Entry point & navigation logic
├── screens/
│   ├── LandingScreen.js      # Welcome screen
│   ├── LoginScreen.js        # Login (Local Auth)
│   ├── RegisterScreen.js     # Registration
│   ├── HomeScreen.js         # Dashboard / Specialist discovery
│   ├── ProviderDetails.js    # Specialist profile
│   ├── BookingScreen.js      # Slot booking
│   └── AppointmentsScreen.js # User bookings
├── components/
│   └── ProviderCard.js       # Glassmorphism UI card
└── data/
    └── providers.js          # Mock data
```

---

## 🔐 Authentication Flow

ReserveIt uses a **Local Persistence Model**:

1. **Register**

   * User data (Name, Email, Password) is stored in `AsyncStorage`
   * Saved under key: `user_session`

2. **Login**

   * Data is retrieved and parsed
   * Credentials are validated locally

⚠️ Note:

* Works only on the same device/emulator
* No backend integration (intentionally lightweight)

---

## 🎯 Key Highlights

* 💡 No backend required (perfect for demos & assignments)
* 🎨 Premium UI comparable to real-world apps
* ⚡ Smooth performance with optimized animations
* 📱 Fully functional end-to-end booking flow

---

## 🚧 Future Improvements

* Backend integration (Node.js / Firebase)
* Real-time slot availability
* Push notifications
* Payment gateway integration

---

## 🤝 Contributing

Feel free to fork the project and enhance it!

