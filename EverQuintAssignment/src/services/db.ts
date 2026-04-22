import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "JiraBoardDB";
const STORE_NAME = "tasks";
const SCHEMA_VERSION = 2;

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: "Backlog" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  assignee: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
export const initDB = async (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, SCHEMA_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      // VERSION 1: Initial setup
      if (oldVersion < 1) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("status", "status");
      }

      if (oldVersion < 2) {
        console.info(
          `Migrating database from version ${oldVersion} to ${newVersion}`
        );

        window.dispatchEvent(
          new CustomEvent("db-migration-performed", {
            detail: { message: "Data migrated to new schema version." },
          })
        );
      }
    },
  });
};

/**
 * CRUD Operations
 */

// CREATE
export const addTask = async (task: Omit<Task, "id">) => {
  const db = await initDB();
  return db.add(STORE_NAME, {
    ...task,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

export const getAllTasks = async (): Promise<Task[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const updateTask = async (task: Task) => {
  const db = await initDB();
  const updatedTask = {
    ...task,
    updatedAt: new Date().toISOString(),
  };
  return db.put(STORE_NAME, updatedTask);
};

export const deleteTask = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
