import { AppwriteUser } from "@/types/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface Link {
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

interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: string[];
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Record<string, any>; // Customize based on the actual structure
  targets: {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    userId: string;
    providerId: string | null;
    providerType: string;
    identifier: string;
  }[];
  accessedAt: string;
}

interface AppState {
  links: Link[];
  setLinks: (links: Link[]) => void;
  user: AppwriteUser | null;
  setUser: (user: AppwriteUser | null) => void;
}

export const useLinkStore = create<AppState>()(
  //   devtools(
  persist(
    (set, get) => ({
      links: [],
      setLinks: (links) => set({ links }),
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "devLink-storage",
    }
  )
  //   ),
);
