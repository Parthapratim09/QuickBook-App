import React, { useState, useMemo } from "react";
import { View, FlatList, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProviderCard from "../components/ProviderCard";
import { providers } from "../data/providers";

const CATEGORIES = [
  { id: 1, name: 'All', icon: 'apps' },
  { id: 2, name: 'Dental', icon: 'tooth-outline' },
  { id: 3, name: 'General', icon: 'stethoscope' },
  { id: 4, name: 'Eye', icon: 'eye-outline' },
  { id: 5, name: 'Heart', icon: 'heart-pulse' },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');


  const filteredProviders = useMemo(() => {
    return providers.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCat === 'All' || item.category === activeCat;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCat]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
  
      <View style={styles.titleSection}>
        <Text style={styles.welcomeText}>Find Your</Text>
        <Text style={styles.brandText}>Specialist</Text>
      </View>
      
      <Searchbar
        placeholder="Search doctors..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        placeholderTextColor="#64748b"
        iconColor="#6366f1"
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATEGORIES.map((cat, index) => {
          const isActive = activeCat === cat.name;
          return (
            <Animated.View key={cat.id} entering={FadeInRight.delay(index * 100)}>
              <TouchableOpacity 
                onPress={() => setActiveCat(cat.name)}
                style={[styles.categoryCard, isActive && styles.activeCategoryCard]}
              >
                <View style={[styles.categoryIcon, isActive && styles.activeCategoryIcon]}>
                  <MaterialCommunityIcons 
                    name={cat.icon} 
                    size={24} 
                    color={isActive ? "#fff" : "#6366f1"} 
                  />
                </View>
                <Text style={[styles.categoryName, isActive && styles.activeCategoryName]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
        {activeCat === 'All' ? 'Top Providers' : `${activeCat} Specialists`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
   
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={filteredProviders}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
               <MaterialCommunityIcons name="magnify-close" size={50} color="#334155" />
               <Text style={styles.emptyText}>No specialists found</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 50)}>
              <ProviderCard 
                provider={item} 
                onPress={() => navigation.navigate("ProviderDetails", { item })} 
              />
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 20, paddingBottom: 120 },
  headerContainer: { marginBottom: 10 },
  

  titleSection: {
    marginTop: Platform.OS === 'android' ? 20 : 0,
    marginBottom: 15
  },
  welcomeText: { fontSize: 24, color: "#94a3b8", fontWeight: "500" },
  brandText: { fontSize: 36, color: "#fff", fontWeight: "900", lineHeight: 40 },
  
  searchBar: { 
    marginTop: 10, 
    borderRadius: 15, 
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchInput: { color: '#fff' },
  
  sectionHeader: { marginTop: 25 },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  
  catScroll: { marginTop: 15 },
  categoryCard: { 
    alignItems: 'center', 
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 12,
    borderRadius: 20,
    minWidth: 75,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  activeCategoryCard: { backgroundColor: '#6366f1', borderColor: '#818cf8' },
  categoryIcon: { backgroundColor: 'rgba(99, 102, 241, 0.1)', padding: 10, borderRadius: 12 },
  activeCategoryIcon: { backgroundColor: 'rgba(255,255,255,0.2)' },
  categoryName: { color: '#94a3b8', marginTop: 8, fontSize: 12, fontWeight: '600' },
  activeCategoryName: { color: '#fff' },

  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#475569', marginTop: 10, fontSize: 16 }
});