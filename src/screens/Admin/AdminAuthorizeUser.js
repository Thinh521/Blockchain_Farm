import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@env";
import contractABI from "../Smart Conctract/contractABI.json";


const AdminAuthorizeUser = () => {
  const [activeTab, setActiveTab] = useState("user"); // "user" hoặc "admin"
  const [userAddress, setUserAddress] = useState("");
  const [checkStatus, setCheckStatus] = useState(null);
  const [currentWallet, setCurrentWallet] = useState(null);

// ✅ Admin authorize user
const handleAuthorize = async () => {
  if (!ethers.isAddress(userAddress)) {
    Alert.alert("Lỗi", "Địa chỉ ví không hợp lệ");
    return;
  }
  try {
    const provider = new ethers.BrowserProvider(window.ethereum); // với RN thì thay bằng WalletConnectProvider
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

    const tx = await contract.authorizeUser(userAddress);
    await tx.wait();

    Alert.alert("✅ Thành công", `Đã authorize cho user: ${userAddress}`);
    setUserAddress("");
  } catch (error) {
    console.error("❌ Lỗi authorize:", error);
    console.log("👉 error.message:", error.message);
    console.log("👉 error.reason:", error.reason);
    console.log("👉 error.data:", error.data);
    console.log("👉 error.stack:", error.stack);

    Alert.alert("Lỗi", error.reason || error.message || "Authorize thất bại");
  }
};

// ✅ User check status
const handleCheckAuthorization = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setCurrentWallet(address);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
    const isAuthorized = await contract.authorizedUsers(address);

    setCheckStatus(isAuthorized);
    Alert.alert("Kết quả", isAuthorized ? "✅ User đã được authorize" : "❌ User chưa được authorize");
  } catch (error) {
    console.error("❌ Lỗi check authorize:", error);
    console.log("👉 error.message:", error.message);
    console.log("👉 error.reason:", error.reason);
    console.log("👉 error.data:", error.data);
    console.log("👉 error.stack:", error.stack);

    Alert.alert("Lỗi", error.reason || error.message || "Không kiểm tra được trạng thái authorize");
  }
};


  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "user" && styles.activeTab]}
          onPress={() => setActiveTab("user")}
        >
          <Text style={styles.tabText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "admin" && styles.activeTab]}
          onPress={() => setActiveTab("admin")}
        >
          <Text style={styles.tabText}>Admin</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "admin" ? (
        <View style={styles.box}>
          <Text style={styles.title}>Admin - Authorize User</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ ví user"
            value={userAddress}
            onChangeText={setUserAddress}
          />
          <TouchableOpacity style={styles.button} onPress={handleAuthorize}>
            <Text style={styles.buttonText}>Authorize</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.box}>
          <Text style={styles.title}>User - Check Authorization</Text>
          {currentWallet && <Text style={styles.address}>Ví hiện tại: {currentWallet}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleCheckAuthorization}>
            <Text style={styles.buttonText}>Kiểm tra</Text>
          </TouchableOpacity>
          {checkStatus !== null && (
            <Text
              style={{
                marginTop: 20,
                fontSize: 16,
                fontWeight: "bold",
                color: checkStatus ? "green" : "red",
              }}
            >
              {checkStatus ? "✅ Bạn đã được duyệt" : "❌ Bạn chưa được duyệt"}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  tabContainer: { flexDirection: "row", marginBottom: 20 },
  tab: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eee",
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: { backgroundColor: "#4CAF50" },
  tabText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  box: { marginTop: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  address: { fontSize: 14, marginBottom: 10 },
});

export default AdminAuthorizeUser;
