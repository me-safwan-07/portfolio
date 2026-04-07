import { env, flags } from '@/packages/env'
import { Resend } from 'resend'

export const resend = flags.comment ? new Resend(env.RESEND_API_KEY) : null
