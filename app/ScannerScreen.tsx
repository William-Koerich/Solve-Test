import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function ScannerScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions(); // Usando o hook de permissões
  const [scannedCodes, setScannedCodes] = useState<string[]>([]); // Armazena os códigos escaneados
  const [isScanning, setIsScanning] = useState<boolean>(false); // Controle de escaneamento (inicia como falso)

  // Solicita permissão ao carregar o componente
  useEffect(() => {
    if (!hasPermission) {
      requestPermission(); // Solicita permissão caso não tenha sido concedida
    }
  }, [hasPermission, requestPermission]);

  // Função que lida com o código escaneado
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScannedCodes((prevCodes) => [...prevCodes, data]);
    Alert.alert("Código escaneado!", `Tipo: ${type}\nValor: ${data}`);
  };

  // Função para interromper o escaneamento
  const stopScanning = () => {
    setIsScanning(false);
  };

  // Caso a permissão não tenha sido dada ou negada
  if (!hasPermission) {
    return <Text>Solicitando permissão de câmera...</Text>;
  }

  // Caso a permissão tenha sido negada
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
      {/* Botão para iniciar o escaneamento */}
      {!isScanning && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setIsScanning(true)}
        >
          <Text style={styles.startButtonText}>Iniciar Escaneamento</Text>
        </TouchableOpacity>
      )}

      {/* Camera ativa apenas quando isScanning for true */}
      {isScanning && (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleBarcodeScanned} // Função de callback quando o código é escaneado
        >
          <View style={styles.overlay}>
            {/* Botão para fechar a câmera */}
            <TouchableOpacity onPress={stopScanning} style={styles.stopButton}>
              <Ionicons name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      {/* Exibe os códigos escaneados quando o escaneamento é interrompido */}
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
    justifyContent: "flex-start", // Ajustado para posicionar o botão "x" no topo
    alignItems: "flex-end", // Botão "x" no lado direito
    marginTop: 40, // Espaço superior
    paddingRight: 20, // Espaço à direita
  },
  stopButton: {
    padding: 10,
    backgroundColor: "transparent", // Removido o fundo
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
