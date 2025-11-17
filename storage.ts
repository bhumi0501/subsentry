import { type Subscription, type InsertSubscription, type UpdateSubscription } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Subscription CRUD operations
  getAllSubscriptions(): Promise<Subscription[]>;
  getSubscription(id: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: UpdateSubscription): Promise<Subscription | undefined>;
  deleteSubscription(id: string): Promise<boolean>;
  markSubscriptionPaid(id: string, nextBilling: string): Promise<Subscription | undefined>;
}

export class MemStorage implements IStorage {
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.subscriptions = new Map();
    
    // Add sample data for development
    this.seedData();
  }

  private seedData() {
    const sampleSubs: InsertSubscription[] = [
      {
        name: "Netflix",
        price: 649.00,
        period: "monthly",
        nextBilling: this.addDays(12),
        vibe: "Clear",
        category: "Entertainment",
      },
      {
        name: "Gym Membership",
        price: 1200.00,
        period: "monthly",
        nextBilling: this.addDays(4),
        vibe: "Secure",
        category: "Health",
      },
      {
        name: "Figma Pro",
        price: 12000.00,
        period: "annual",
        nextBilling: this.addDays(90),
        vibe: "Empowering",
        category: "Productivity",
      },
    ];

    sampleSubs.forEach((sub) => {
      const id = randomUUID();
      this.subscriptions.set(id, { ...sub, id, price: String(sub.price) });
    });
  }

  private addDays(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }

  async getSubscription(id: string): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async createSubscription(insertSub: InsertSubscription): Promise<Subscription> {
    const id = randomUUID();
    const subscription: Subscription = { 
      ...insertSub, 
      id,
      price: String(insertSub.price)
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async updateSubscription(
    id: string,
    updateSub: UpdateSubscription
  ): Promise<Subscription | undefined> {
    const existing = this.subscriptions.get(id);
    if (!existing) return undefined;

    const updated: Subscription = { 
      ...existing, 
      ...updateSub,
      price: updateSub.price !== undefined ? String(updateSub.price) : existing.price
    };
    this.subscriptions.set(id, updated);
    return updated;
  }

  async deleteSubscription(id: string): Promise<boolean> {
    return this.subscriptions.delete(id);
  }

  async markSubscriptionPaid(id: string, nextBilling: string): Promise<Subscription | undefined> {
    return this.updateSubscription(id, { nextBilling });
  }
}

export const storage = new MemStorage();
