import { TRPCError } from '@trpc/server'
import { and, eq, rates } from '@/packages/db'
import { ratelimit } from '@/packages/kv'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../init'

const getKey = (id: string) => `rates:${id}`

export const ratesRouter = createTRPCRouter({
  set: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        like: z.boolean().nullable()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user

      const { success } = await ratelimit.limit(getKey(`set:${user.id}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      if (input.like === null) {
        await ctx.db
          .delete(rates)
          .where(and(eq(rates.commentId, input.id), eq(rates.userId, user.id)))

        return
      }

      await ctx.db
        .insert(rates)
        .values({
          commentId: input.id,
          userId: user.id,
          like: input.like
        })
        .onConflictDoUpdate({
          target: [rates.userId, rates.commentId],
          set: {
            like: input.like
          }
        })
    })
})
