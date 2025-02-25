import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function ScannerScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanningBlocked, setIsScanningBlocked] = useState<boolean>(false); // 🔒 Bloqueia a leitura repetida

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // 📌 Função para lidar com a leitura do código
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (isScanningBlocked) return; // 🔒 Bloqueia leituras repetidas antes da confirmação

    setIsScanningBlocked(true); // 🔒 Impede leituras adicionais até a confirmação
    setScannedCodes((prevCodes) => [...prevCodes, data]);

    Alert.alert("Código escaneado!", `Tipo: ${type}\nValor: ${data}`, [
      {
        text: "OK",
        onPress: () => {
          setIsScanningBlocked(false); // 🔓 Desbloqueia a leitura após o OK
          setIsScanning(false); // ❌ Fecha a câmera automaticamente
        },
      },
    ]);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  if (!hasPermission) {
    return <Text>Solicitando permissão de câmera...</Text>;
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar a câmera negada.</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isScanning && (
        <TouchableOpacity style={styles.startButton} onPress={() => setIsScanning(true)}>
          <Text style={styles.startButtonText}>Iniciar Escaneamento</Text>
        </TouchableOpacity>
      )}

      {isScanning && (
        <CameraView style={styles.camera} onBarcodeScanned={handleBarcodeScanned}>
          <View style={styles.overlay}>
            <TouchableOpacity onPress={stopScanning} style={styles.stopButton}>
              <Ionicons name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      {!isScanning && scannedCodes.length > 0 && (
        <View style={styles.stopScanContainer}>
          <Text style={styles.title}>Códigos Escaneados:</Text>
          <FlatList
            data={scannedCodes}
            renderItem={({ item }) => <Text style={styles.codeText}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 40,
    paddingRight: 20,
  },
  stopButton: {
    padding: 10,
    backgroundColor: "transparent",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  stopScanContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  codeText: {
    fontSize: 18,
    marginVertical: 10,
  },
});
