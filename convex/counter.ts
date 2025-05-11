import { mutation, query } from "./_generated/server";
import { authedMutation } from "./helpers";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("counter").first();
  },
});

export const increment = authedMutation({
  args: {},
  handler: async (ctx) => {
    const counter = await ctx.db.query("counter").first();

    let counterId = counter?._id;
    if (!counterId) {
      counterId = await ctx.db.insert("counter", { value: 0n });
    }
    await ctx.db.patch(counterId, { value: counter ? counter.value + 1n : 1n });
  },
});
