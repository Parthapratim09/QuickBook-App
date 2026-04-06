import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  


  const handleRegister = async () => {
  if (!name || !email || !password) return alert("Please fill all fields");
  
  setLoading(true);
  try {

    const newUser = {
      name: name,
      email: email,
      password: password, 
    };

    await AsyncStorage.setItem("user_session", JSON.stringify(newUser));

    
    navigation.replace("Main"); 
    
  } catch (error) {
    alert("Registration failed. Please try again.");
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
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
         
            <Animated.View entering={FadeInUp.duration(1000)} style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>Join Us</Text>
              <Text style={styles.subtitle}>Create an account to start booking</Text>
            </Animated.View>

            
            <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.form}>
              <TextInput
                label="Full Name"
                mode="outlined"
                value={name}
                onChangeText={setName}
                style={styles.input}
                textColor="#fff"
                outlineColor="rgba(255,255,255,0.1)"
                activeOutlineColor="#a855f7"
                theme={{ colors: { surfaceVariant: 'transparent', onSurfaceVariant: '#94a3b8'} }}
                left={<TextInput.Icon icon="account-outline" color="#94a3b8" />}
              />

              <TextInput
                label="Email Address"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                textColor="#fff"
                outlineColor="rgba(255,255,255,0.1)"
                activeOutlineColor="#a855f7"
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
                activeOutlineColor="#a855f7"
                theme={{ colors: { surfaceVariant: 'transparent', onSurfaceVariant: '#94a3b8'} }}
                left={<TextInput.Icon icon="lock-outline" color="#94a3b8" />}
              />

              <TouchableOpacity 
                onPress={handleRegister} 
                disabled={loading}
                activeOpacity={0.8}
                style={styles.registerBtnContainer}
              >
                <LinearGradient
                  colors={["#a855f7", "#6366f1"]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.registerBtn}
                >
                  <Text style={styles.registerBtnText}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            
            <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}> Sign In</Text>
              </TouchableOpacity>
            </Animated.View>

          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 30, flexGrow: 1, justifyContent: 'center' },
  header: { marginBottom: 40 },
  backBtn: { marginBottom: 20, marginLeft: -10 },
  title: { fontSize: 36, fontWeight: '900', color: '#fff' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 8 },
  
  form: { width: '100%' },
  input: { marginBottom: 15, backgroundColor: 'rgba(255,255,255,0.02)' },
  
  registerBtnContainer: { marginTop: 20 },
  registerBtn: {
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 40, marginBottom: 20 },
  footerText: { color: '#94a3b8', fontSize: 16 },
  loginLink: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});