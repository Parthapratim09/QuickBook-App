import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProviderDetails({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={StyleSheet.absoluteFill} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Animated.View entering={FadeInUp.duration(800)} style={styles.hero}>
          <SafeAreaView>
            <View style={styles.navBar}>
              <IconButton icon="arrow-left" iconColor="#fff" onPress={() => navigation.goBack()} />
              <IconButton icon="heart-outline" iconColor="#fff" />
            </View>
          </SafeAreaView>
          
          <Avatar.Text 
            size={100} 
            label={item.name[0]} 
            style={styles.mainAvatar} 
            labelStyle={{ fontSize: 40, fontWeight: 'bold' }}
          />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialty}>{item.category}</Text>
          
          {/* Quick Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12+</Text>
              <Text style={styles.statLabel}>Exp. Yrs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2k+</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
          </View>
        </Animated.View>

      
        <Animated.View entering={FadeInDown.delay(200)} style={styles.content}>
          <Text style={styles.sectionTitle}>About Specialist</Text>
          <Text style={styles.description}>
            {item.name} is a top-rated specialist in {item.category} with over a decade of experience 
            providing world-class care. Known for a patient-first approach and advanced diagnostic techniques.
          </Text>

          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Working Hours</Text>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#6366f1" />
            <Text style={styles.infoText}>Mon - Fri, 09:00 AM - 06:00 PM</Text>
          </View>
        </Animated.View>
      </ScrollView>

 
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Consultation</Text>
          <Text style={styles.priceValue}>$50.00</Text>
        </View>
        <TouchableOpacity 
          style={styles.bookBtn} 
          onPress={() => navigation.navigate("Booking", { item })}
        >
          <LinearGradient
            colors={["#6366f1", "#a855f7"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingBottom: 30 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 },
  mainAvatar: { backgroundColor: '#475569', marginTop: 20, elevation: 15 },
  name: { color: '#fff', fontSize: 28, fontWeight: '900', marginTop: 15 },
  specialty: { color: '#94a3b8', fontSize: 16, fontWeight: '600' },
  
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    marginTop: 25,
    padding: 20,
    width: '85%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)' },
  
  content: { padding: 25 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 12 },
  description: { color: '#94a3b8', fontSize: 15, lineHeight: 24 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  infoText: { color: '#fff', marginLeft: 10, fontSize: 15 },

  footer: {
    padding: 25,
    paddingBottom: 40,
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceContainer: { flex: 1 },
  priceLabel: { color: '#94a3b8', fontSize: 12 },
  priceValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  bookBtn: { width: 180, borderRadius: 18, overflow: 'hidden' },
  btnGradient: { paddingVertical: 15, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});