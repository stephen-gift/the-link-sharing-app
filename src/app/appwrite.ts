import { AppwriteUser } from "@/types/user";
import {
  Account,
  Client,
  Storage,
  Databases,
  ID,
  Query,
  Models,
  Permission,
  Role,
} from "appwrite";

const client = new Client();

type AppwriteDocument = Models.Document;

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66a00893000e0836c84e");

const account = new Account(client);
const storage = new Storage(client);
export const databases = new Databases(client);

const getUser = async (): Promise<AppwriteUser> => {
  return (await account.get()) as AppwriteUser;
};

const updateUser = async (firstName: string, lastName: string) => {
  // await account.updateEmail(email, "");
  await account.updateName(`${firstName} ${lastName}`);
};

const updatePrefs = async (prefs: { picture?: string }) => {
  console.log("Updating preferences with:", prefs);
  await account.updatePrefs(prefs);
};

// Upload file to Appwrite storage
const uploadFile = async (file: File) => {
  const response = await storage.createFile(
    "66a043e40017ae75743f",
    "unique()",
    file
  );
  return response;
};

// Create a new document in Appwrite
const createDocument = async <T extends AppwriteDocument>(
  data: Omit<T, keyof AppwriteDocument>
): Promise<T> => {
  try {
    // Get the current user's ID
    const user = await getUser();
    const userId: string = user.$id;

    // Add the current user's ID to the document data
    const documentData = {
      ...data,
      createdBy: userId,
    };

    const response = await databases.createDocument<T>(
      "66a0e0c2000abd0e58d8",
      "66a0e34300374cf2e998",
      ID.unique(),
      documentData,
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ]
    );
    return response;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

// Update an existing document in Appwrite
const updateDocument = async <T extends AppwriteDocument>(
  documentId: string,
  data: Partial<Omit<T, keyof AppwriteDocument>>
): Promise<T> => {
  try {
    return await databases.updateDocument<T>(
      "66a0e0c2000abd0e58d8",
      "66a0e34300374cf2e998",
      documentId,
      data
    );
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document");
  }
};

const deleteDocument = async (documentId: string): Promise<{}> => {
  try {
    return await databases.deleteDocument(
      "66a0e0c2000abd0e58d8",
      "66a0e34300374cf2e998",
      documentId
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
};

const listDocuments = async <T extends AppwriteDocument>(): Promise<T[]> => {
  try {
    // Get the current user's ID
    const user = await getUser();
    const userId: string = user.$id;

    const response = await databases.listDocuments<T>(
      "66a0e0c2000abd0e58d8",
      "66a0e34300374cf2e998",
      [Query.equal("createdBy", userId)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error listing documents:", error);
    throw new Error("Failed to list documents");
  }
};

export {
  client,
  account,
  getUser,
  updateUser,
  updatePrefs,
  uploadFile,
  createDocument,
  updateDocument,
  deleteDocument,
  listDocuments,
};
