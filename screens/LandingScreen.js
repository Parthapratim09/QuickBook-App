import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Ensure this is installed
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.circleDecorator} />

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(1000).springify()}>
          <Text style={styles.emoji}>📅</Text>
          <Text style={styles.title}>QuickBo<Text style={styles.accent}>ok</Text></Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(800)}>
          <Text style={styles.subtitle}>
            Experience the next generation of seamless appointment booking.
          </Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(600)}>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <LinearGradient
                colors={["#6366f1", "#a855f7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButton}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800)}>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  circleDecorator: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    letterSpacing: -1,
  },
  accent: {
    color: "#a855f7",
  },
  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 18,
    lineHeight: 26,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 50,
  },
  primaryButton: {
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)", // Glass effect
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});