import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabsStackScreenProps } from '../Navigation/TabsNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({ navigation }: TabsStackScreenProps<'Profile'>) => {
  const [userData, setUserData] = useState<any>(null); // Store user data
  const [addressData, setAddressData] = useState<any>(null); // Store address data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const storedToken = await AsyncStorage.getItem('token');
        if (storedUserData && storedToken) {
          setUserData(JSON.parse(storedUserData));
          // Optionally fetch address data from backend if you store it there
          // For now, we'll assume address is stored locally after submission
          const storedAddress = await AsyncStorage.getItem('addressData');
          if (storedAddress) {
            setAddressData(JSON.parse(storedAddress));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('addressData');
      Alert.alert('Success', 'You have been logged out.');
      navigation.replace('UserLogin' as any);
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Profile</Text>

        {userData ? (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{userData.firstName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{userData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{userData.mobileNo}</Text>
            </View>

            {addressData && (
              <>
                <Text style={styles.sectionTitle}>Address</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Street:</Text>
                  <Text style={styles.value}>{addressData.street}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>City:</Text>
                  <Text style={styles.value}>{addressData.city}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>State:</Text>
                  <Text style={styles.value}>{addressData.state}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Zip Code:</Text>
                  <Text style={styles.value}>{addressData.zipCode}</Text>
                </View>
              </>
            )}
          </View>
        ) : (
          <Text style={styles.noDataText}>Loading user data...</Text>
        )}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2980b9',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  noDataText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ProfileScreen;