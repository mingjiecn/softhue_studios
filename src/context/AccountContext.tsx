"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type OrderItem = {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  /** Price before sale discount, for display */
  originalPrice?: number;
  /** For custom design requests, optional description of what was requested */
  customDescription?: string;
};

export type OrderStatus = "pending" | "confirmed";

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

const STORAGE_KEY = "softhue-account";

const defaultProfile: Profile = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

const AccountContext = createContext<{
  profile: Profile;
  orders: Order[];
  updateProfile: (profile: Partial<Profile>) => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  cancelOrder: (id: string) => void;
  confirmOrder: (id: string) => void;
} | null>(null);

function loadFromStorage() {
  if (typeof window === "undefined") return { profile: defaultProfile, orders: [] };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const orders = (data.orders || []).map((o: Order) => ({
        ...o,
        status: o.status || "pending",
      }));
      return {
        profile: { ...defaultProfile, ...data.profile },
        orders,
      };
    }
  } catch {
    // ignore
  }
  return { profile: defaultProfile, orders: [] };
}

function saveToStorage(profile: Profile, orders: Order[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, orders }));
  } catch {
    // ignore
  }
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { profile: p, orders: o } = loadFromStorage();
    setProfile(p);
    setOrders(o);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(profile, orders);
  }, [loaded, profile, orders]);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const addOrder = useCallback((order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setOrders((prev) => [newOrder, ...prev]);
  }, []);

  const cancelOrder = useCallback((id: string) => {
    setOrders((prev) => {
      const order = prev.find((o) => o.id === id);
      if (order?.status !== "pending") return prev;
      return prev.filter((o) => o.id !== id);
    });
  }, []);

  const confirmOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: "confirmed" as const } : o
      )
    );
  }, []);

  return (
    <AccountContext.Provider value={{ profile, orders, updateProfile, addOrder, cancelOrder, confirmOrder }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
