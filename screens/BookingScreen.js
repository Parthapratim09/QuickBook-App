import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function BookingScreen({ route, navigation }) {
  const { item } = route.params || { item: { name: "Medical Center" } };
  const [selected, setSelected] = useState(null);

  const slots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

  const handleBooking = async () => {
    if (!selected) return;
    const existing = await AsyncStorage.getItem("appointments");
    const data = existing ? JSON.parse(existing) : [];
    
    data.push({
      id: Math.random().toString(36).substr(2, 9),
      provider: item.name,
      time: selected,
      date: "Oct 25", 
      status: "Confirmed"
    });

    await AsyncStorage.setItem("appointments", JSON.stringify(data));

    Alert.alert(
    "Booking Confirmed! ",
    `Your appointment with ${item.name} is set for ${selected}.`,
    [
      { 
        text: "View My Appointments", 
        onPress: () => navigation.navigate("Main", { screen: "AppointmentsTab" }) 
      }
    ]
  );

  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
       
          <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
            <Text style={styles.providerLabel}>Booking with</Text>
            <Text style={styles.providerName}>{item.name}</Text>
          </Animated.View>

          
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.grid}>
            {slots.map((slot, index) => {
              const isSelected = selected === slot;
              return (
                <Animated.View 
                  key={slot} 
                  entering={FadeInDown.delay(index * 50)}
                  layout={Layout.springify()}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSelected(slot)}
                    style={[
                      styles.slotCard,
                      isSelected && styles.selectedSlotCard
                    ]}
                  >
                    <MaterialCommunityIcons 
                      name="clock-outline" 
                      size={18} 
                      color={isSelected ? "#fff" : "#94a3b8"} 
                    />
                    <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </ScrollView>

        
        <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Consultation Fee</Text>
            <Text style={styles.priceValue}>$45.00</Text>
          </View>
          
          <TouchableOpacity 
            disabled={!selected}
            onPress={handleBooking}
            style={[styles.confirmBtn, !selected && styles.disabledBtn]}
          >
            <LinearGradient
              colors={selected ? ["#6366f1", "#a855f7"] : ["#334155", "#334155"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Confirm</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 25 },
  header: { marginBottom: 40, marginTop: 20 },
  providerLabel: { color: "#94a3b8", fontSize: 16 },
  providerName: { color: "#fff", fontSize: 32, fontWeight: "900", marginTop: 5 },
  
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  
  slotCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectedSlotCard: {
    backgroundColor: '#6366f1',
    borderColor: '#818cf8',
    elevation: 10,
    shadowColor: '#6366f1',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  slotText: { color: '#94a3b8', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  selectedSlotText: { color: '#fff' },

  footer: {
    padding: 25,
    paddingBottom: 40,
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priceContainer: { flex: 1 },
  priceLabel: { color: '#94a3b8', fontSize: 12 },
  priceValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  
  confirmBtn: { width: 160, borderRadius: 18, overflow: 'hidden' },
  btnGradient: { 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  disabledBtn: { opacity: 0.5 }
});