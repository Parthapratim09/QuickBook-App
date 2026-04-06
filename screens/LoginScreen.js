
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter both email and password");

    setLoading(true);
    try {
    
      const storedUser = await AsyncStorage.getItem("user_session");
      const parsed = storedUser ? JSON.parse(storedUser) : null;

      
      if (
        parsed && 
        parsed.email.toLowerCase().trim() === email.toLowerCase().trim() && 
        parsed.password === password
      ) {
        navigation.replace("Main");
      } else {
        alert("Invalid Email or Password. Did you register first?");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={StyleSheet.absoluteFill} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.inner}>
          
          <Animated.View entering={FadeInUp.duration(1000)} style={styles.header}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="shield-check" size={40} color="#fff" />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to access your appointments</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.form}>
            <TextInput
              label="Email Address"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              textColor="#fff"
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor="#6366f1"
              theme={{ colors: { surfaceVariant: 'transparent', onSurfaceVariant: '#94a3b8'} }}
              left={<TextInput.Icon icon="email-outline" color="#94a3b8" />}
            />

            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              textColor="#fff"
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor="#6366f1"
              theme={{ colors: { surfaceVariant: 'transparent', onSurfaceVariant: '#94a3b8'} }}
              left={<TextInput.Icon icon="lock-outline" color="#94a3b8" />}
            />

            <TouchableOpacity 
              onPress={handleLogin} 
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#6366f1", "#a855f7"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>{loading ? "Verifying..." : "Sign In"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
            <Text style={styles.footerText}>New here?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}> Create Account</Text>
            </TouchableOpacity>
          </Animated.View>

        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, padding: 30, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 50 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 25, backgroundColor: '#6366f1',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    shadowColor: '#6366f1', shadowOpacity: 0.5, shadowRadius: 15, elevation: 10
  },
  title: { fontSize: 32, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 8, textAlign: 'center' },
  form: { width: '100%' },
  input: { marginBottom: 15, backgroundColor: 'rgba(255,255,255,0.03)' },
  loginBtn: { height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
  footerText: { color: '#94a3b8', fontSize: 16 },
  registerLink: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }
});