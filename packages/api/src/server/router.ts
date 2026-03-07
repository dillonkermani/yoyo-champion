import { z } from 'zod';
import { router, publicProcedure } from './trpc';

// Empty sub-routers scaffolded for the feature phase
const trickRouter = router({});
const videoRouter = router({});
const userRouter = router({});

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? 'from YoYo Champion'}!`,
      };
    }),

  trick: trickRouter,
  video: videoRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
