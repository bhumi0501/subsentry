import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriptionSchema, updateSubscriptionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET all subscriptions
  app.get("/api/subscriptions", async (_req, res) => {
    try {
      const subscriptions = await storage.getAllSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  // POST create new subscription
  app.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ message: "Invalid subscription data", error });
      } else {
        res.status(500).json({ message: "Failed to create subscription" });
      }
    }
  });

  // PATCH update subscription
  app.patch("/api/subscriptions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateSubscriptionSchema.parse(req.body);
      const subscription = await storage.updateSubscription(id, validatedData);
      
      if (!subscription) {
        res.status(404).json({ message: "Subscription not found" });
        return;
      }
      
      res.json(subscription);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ message: "Invalid subscription data", error });
      } else {
        res.status(500).json({ message: "Failed to update subscription" });
      }
    }
  });

  // DELETE subscription
  app.delete("/api/subscriptions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteSubscription(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Subscription not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete subscription" });
    }
  });

  // PATCH mark subscription as paid (calculates and updates next billing date)
  app.patch("/api/subscriptions/:id/mark-paid", async (req, res) => {
    try {
      const { id } = req.params;
      const subscription = await storage.getSubscription(id);
      
      if (!subscription) {
        res.status(404).json({ message: "Subscription not found" });
        return;
      }
      
      // Calculate next billing date on the backend
      const currentDate = new Date(subscription.nextBilling);
      if (isNaN(currentDate.getTime())) {
        res.status(400).json({ message: "Invalid current billing date" });
        return;
      }
      
      if (subscription.period === "monthly") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
      
      const nextBilling = currentDate.toISOString().slice(0, 10);
      const updated = await storage.markSubscriptionPaid(id, nextBilling);
      
      if (!updated) {
        res.status(500).json({ message: "Failed to update subscription" });
        return;
      }
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark subscription as paid" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
