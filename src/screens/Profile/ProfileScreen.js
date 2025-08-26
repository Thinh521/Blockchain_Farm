import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';

const ProfileScreen = () => {
  const [gender, setGender] = useState('male');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 40}}>
      <StatusBar barStyle="light-content" backgroundColor="#28a745" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.avatarText}>Tap to change photo</Text>
      </View>

      {/* Input Fields */}
      <Input label="Full Name" placeholder="Enter full name" required />

      <Input label="User Name" placeholder="Enter username" required />

      <Input
        label="Email"
        placeholder="example@email.com"
        keyboardType="email-address"
        required
      />

      <Input
        label="Password"
        placeholder="Enter password"
        isPassword
        required
      />

      <Input
        label="Phone Number"
        placeholder="+1 234 567 890"
        keyboardType="phone-pad"
        required
      />

      <Input label="Address" placeholder="Enter address" />

      {/* Gender */}
      <Text style={[styles.label, {marginTop: 10}]}>Gender</Text>
      <View style={styles.genderContainer}>
        {['male', 'female', 'other'].map(g => (
          <TouchableOpacity
            key={g}
            style={[styles.genderBtn, gender === g && styles.genderActive]}
            onPress={() => setGender(g)}>
            <Text
              style={[
                styles.genderText,
                gender === g && styles.genderTextActive,
              ]}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date of Birth */}
      <Input
        label="Date of Birth"
        placeholder="YYYY"
        keyboardType="numeric"
        maxLength={4}
      />

      <Button.Main title="Lưu thông tin" />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  saveBtn: {
    color: '#28a745',
    fontWeight: '600',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarText: {
    marginTop: 8,
    color: '#666',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  genderBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  genderActive: {
    borderColor: '#28a745',
    backgroundColor: '#e8f9f0',
  },
  genderText: {
    color: '#333',
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#28a745',
    fontWeight: '700',
  },
});
