import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const db = SQLite.openDatabase(
  { name: "scanner.db", location: "default" },
  () => console.log("Banco aberto com sucesso"),
  (error) => console.error("Erro ao abrir o banco:", error)
);

export const setupDatabase = async () => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS scanned_products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId TEXT NOT NULL,
          name TEXT,
          price TEXT,
          code TEXT UNIQUE,
          image TEXT
        );`
      );
    });
    console.log("Tabela criada!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
};

// Inserir um produto escaneado
export const saveProduct = async (userId: string, name: string, price: string, code: string, image: string) => {
  try {
    await db.transaction(async (tx: { executeSql: (arg0: string, arg1: string[]) => any; }) => {
      await tx.executeSql(
        `INSERT INTO scanned_products (userId, name, price, code, image) VALUES (?, ?, ?, ?, ?);`,
        [userId, name, price, code, image]
      );
    });
    console.log("Produto salvo:", name);
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
  }
};

// Buscar todos os produtos do usuário logado
export const getProductsByUser = async (userId: string) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM scanned_products WHERE userId = ?;`,
          [userId],
          (_, results) => {
            resolve(results.rows.raw());
          },
          (_, error) => {
            console.error("Erro ao buscar produtos:", error);
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

// Limpar produtos de um usuário (se precisar)
export const clearUserProducts = async (userId: string) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(`DELETE FROM scanned_products WHERE userId = ?;`, [userId]);
    });
    console.log("Produtos apagados para o usuário:", userId);
  } catch (error) {
    console.error("Erro ao apagar produtos:", error);
  }
};
