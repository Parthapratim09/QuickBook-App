
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProviderCard({ provider, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Avatar.Text size={50} label={provider.name[0]} style={{ backgroundColor: '#6366f1' }} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{provider.name}</Text>
        <Text style={{ color: '#94a3b8' }}>{provider.category}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#6366f1" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', padding: 15,
    backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20,
    marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  }
});