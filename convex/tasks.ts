import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const addTask = mutation({
  args: {
    title: v.string(),
    description: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('tasks', {
      title: args.title,
      description: args.description,
      completed: false
    });
  }
})