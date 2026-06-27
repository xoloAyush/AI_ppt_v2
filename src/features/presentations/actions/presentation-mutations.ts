import { generateSlug } from "random-word-slugs";
import { createServerFn } from '@tanstack/react-start'

import { prisma } from '#/lib/prisma.ts'
// import { inngest } from '#/integrations/inngest/client'

import { deriveTitle, requirePresentationUserId } from '../lib/server-helpers'

import {
  createPresentationInputSchema,
  presentationIdInputSchema,
  updatePresentationInputSchema,
} from '../types/schema'
import { authFnMiddleware } from "#/middleware/auth";
import { PresentationStatus } from "../../../../generated/prisma/enums";

export const createPresentation = createServerFn({method: 'POST'})
.validator((data: unknown) => createPresentationInputSchema.parse(data))
.middleware([authFnMiddleware])
.handler(async ({ data, context })=>{

    const userId = context.session.user.id
    const presentation = await prisma.presentation.create({

        data:{
            userId,
            title : generateSlug(),
            prompt: data.prompt,
            slideCount: data.slideCount,
            style: data.style,
            tone: data.tone,
            layout: data.layout,
            status: PresentationStatus.GENERATING
        }
    })
    return presentation
})

export const updatePresentation = createServerFn({method: 'POST'})
.validator((data: unknown) => updatePresentationInputSchema.parse(data))
.middleware([authFnMiddleware])
.handler(async ({ data, context })=>{

    const userId = context.session.user.id

    const {id, ...patch} = data
    const existing = await prisma.presentation.findFirst({
        where: {id, userId}
    })
    if(!existing) throw new Error('Not Found')
    const updateData = patch

    return prisma.presentation.update({
        where: {id},
        data: updateData
    })
})


export const deletePresentation = createServerFn({method: 'POST'})
.validator((data: unknown) => updatePresentationInputSchema.parse(data))
.middleware([authFnMiddleware])
.handler(async ({ data, context })=>{

    const userId = context.session.user.id

    const { id } = data
    const existing = await prisma.presentation.findFirst({
        where: {id, userId}
    })
    if(!existing) throw new Error('Not Found')

    await prisma.presentation.delete({
        where: {id: data.id }
    })

    return {ok: true as const}
})

export const regeneratePresentation = createServerFn({method: 'POST'})
.validator((data: unknown) => 
    presentationIdInputSchema.parse(data))
.middleware([authFnMiddleware])
.handler(async ({ data, context })=>{

    const userId = context.session.user.id

    const {id} = data
    const existing = await prisma.presentation.findFirst({
        where: {id, userId}
    })
    if(!existing) throw new Error('Not Found')
    
    return prisma.presentation.update({
        where: {id},
        data: { status: 'GENERATING'}
    })
})


