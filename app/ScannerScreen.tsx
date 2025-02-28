import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { findProductByCode, IProduct } from "./services/api";

interface ScannedProduct extends IProduct {
  id: number;
}

export default function ScannerScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scannedProducts, setScannedProducts] = useState<ScannedProduct[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isScanningBlocked, setIsScanningBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (isScanningBlocked) return;
  
    setIsScanningBlocked(true); // Bloqueia novas leituras enquanto processa
  
    const product = findProductByCode(data);
  
    if (product) {
      Alert.alert("Produto encontrado!", `${product.name}\nPreço: ${product.price}`, [
        {
          text: "OK",
          onPress: () => {
            setScannedProducts((prev) => [...prev, { ...product, id: Date.now() }]);
            setIsScanningBlocked(false);
            setIsScanning(false); // Fecha a câmera após sucesso
          },
        },
      ]);
    } else {
      Alert.alert("Produto não encontrado", `O produto com o código de barras ${data} não está cadastrado.`, [
        {
          text: "Tentar novamente",
          onPress: () => {
            setIsScanningBlocked(false); // Reativa a câmera
          },
        },
      ]);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setIsScanningBlocked(false);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  if (!hasPermission) {
    return <Text>Solicitando permissão da câmera...</Text>;
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
        <TouchableOpacity style={styles.startButton} onPress={startScanning}>
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

      {/* Lista de produtos escaneados */}
      {scannedProducts.length > 0 && (
        <View style={styles.tableContainer}>
          <Text style={styles.title}>Produtos Escaneados:</Text>
          <FlatList
            data={scannedProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </View>
            )}
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
  tableContainer: {
    flex: 1,
    width: "90%",
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
});
