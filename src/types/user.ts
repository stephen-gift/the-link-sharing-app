import { Models } from "appwrite";

export interface UserPrefs {
  picture?: string;
}

export interface AppwriteUser extends Models.User<{}> {
  prefs: UserPrefs;
}

export interface Permission {
  // This could be more specific if the permission format is always consistent
  [key: string]: string;
}

export interface Link {
  url: string;
  platform: string;
  $id: string;
  $tenant: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface LinkResponse {
  total: number;
  documents: Link[];
}
