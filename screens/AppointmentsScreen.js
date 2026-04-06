import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Animated, { FadeInRight } from "react-native-reanimated";

export default function AppointmentsScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    
    const mock = [
      { id: '1', provider: "Dr. Sarah Smith", date: "Oct 24", time: "10:30 AM", status: "Confirmed" },
      { id: '2', provider: "City Dental", date: "Oct 28", time: "02:15 PM", status: "Pending" },
    ];
    let res = await AsyncStorage.getItem("appointments");
    setData(res ? JSON.parse(res) : mock);
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.greeting}>Hello, Alex 👋</Text>
      <Text style={styles.subGreeting}>You have {data.length} bookings this week.</Text>
      
      
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{data.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statBox, styles.statBoxActive]}>
          <Text style={[styles.statNumber, {color: '#fff'}]}>1</Text>
          <Text style={[styles.statLabel, {color: '#fff'}]}>Today</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={data}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
              <TouchableOpacity style={styles.glassCard}>
                <View style={styles.cardAccent} />
                <View style={styles.cardMain}>
                  <View style={styles.cardHeader}>
                    <Avatar.Text size={40} label={item.provider.substring(0, 2)} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                      <Text style={styles.providerName}>{item.provider}</Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.status}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.dateTime}>
                      <MaterialCommunityIcons name="calendar" size={16} color="#94a3b8" />
                      <Text style={styles.footerText}>{item.date}</Text>
                    </View>
                    <View style={styles.dateTime}>
                      <MaterialCommunityIcons name="clock-outline" size={16} color="#94a3b8" />
                      <Text style={styles.footerText}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 20 },
  headerSection: { marginBottom: 30, marginTop: 10 },
  greeting: { fontSize: 28, fontWeight: "800", color: "#fff" },
  subGreeting: { fontSize: 16, color: "#94a3b8", marginTop: 4 },
  
  statsRow: { flexDirection: 'row', marginTop: 25, alignItems: 'center' },
  statBox: { 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    padding: 15, 
    borderRadius: 20, 
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  statBoxActive: { backgroundColor: '#6366f1', borderColor: '#818cf8' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  
  addButton: { 
    backgroundColor: '#a855f7', 
    width: 55, 
    height: 55, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 'auto',
    elevation: 5,
    shadowColor: '#a855f7',
    shadowOpacity: 0.4,
    shadowRadius: 10
  },

  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardAccent: { width: 6, backgroundColor: '#6366f1' },
  cardMain: { flex: 1, padding: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { backgroundColor: '#334155' },
  infoContainer: { marginLeft: 12, flex: 1 },
  providerName: { fontSize: 18, fontWeight: '700', color: '#fff' },
  statusBadge: { 
    backgroundColor: 'rgba(34, 197, 94, 0.15)', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 8, 
    alignSelf: 'flex-start',
    marginTop: 4
  },
  statusText: { color: '#4ade80', fontSize: 10, fontWeight: 'bold' },
  
  cardFooter: { 
    flexDirection: 'row', 
    marginTop: 15, 
    paddingTop: 15, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.05)' 
  },
  dateTime: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  footerText: { color: '#94a3b8', marginLeft: 6, fontSize: 14 }
});