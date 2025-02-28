import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@scanned_products';

export interface Product {
  id: string;
  name: string;
  price: string;
  code: string;
  image: string;
}

// Salvar um novo produto
export const saveProduct = async (product: Product) => {
  try {
    const products = await getProducts();
    const updatedProducts = [...products, product];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    console.log('Produto salvo:', product.name);
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
  }
};

// Obter todos os produtos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

// Limpar todos os produtos
export const clearProducts = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('Todos os produtos foram removidos');
  } catch (error) {
    console.error('Erro ao limpar produtos:', error);
  }
};