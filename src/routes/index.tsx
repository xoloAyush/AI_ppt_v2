import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
// import { getSession } from '#/lib/auth-function';
import { authMiddleware } from '#/middleware/auth';
import { Textarea } from '#/components/ui/textarea';
import type {
  SlideStyle,
  SlideTone,
  SlideLayout,
} from '#/features/presentations/constants/presentation-options'

import { PRESENTATION_TEMPLATES } from '#/features/presentations/constants/presentation-templates'

import {
  SLIDE_STYLES,
  TONE_OPTIONS,
  LAYOUT_OPTIONS,
} from '#/features/presentations/constants/presentation-options'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from '#/components/ui/slider';
import { Label } from '#/components/ui/label';
import { Button } from '#/components/ui/button';
import { Wand2 } from 'lucide-react';

type HomeFormState = {
  content: string
  slideCount: number
   style: SlideStyle
  tone: SlideTone
  layout: SlideLayout
}

export const Route = createFileRoute('/')({
  server:{
       middleware: [authMiddleware],
    }, 
  // beforeLoad: async () => {
    
  //   const session = await getSession();

  //   if (!session) {
  //     throw redirect({
  //       to: "/login",
  //     });
  //   }

  //   return { session };
  // },
  component: App 

})

function App() {

  // const data = authClient.getSession()
  // console.log(data)

   const [form, setForm] = useState<HomeFormState>({
    content: '',
    slideCount: 8,
    style: 'minimal',
    tone: 'formal',
    layout: 'balanced',
  })

  
  return (
    <div className=' h-min-screen text-center mt-30 mb-10 overflow-x-hidden'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-10'>

          <h1 className='text-4xl md:text-5xl font-bold mb-3'>What do you want to{' '}
        <span className='text-primary'>create?</span>
      </h1>
      <p className='text-muted-foreground text-lg'>Enter your content and we'll generate a beautiful presentation</p>

        </div>

        <div className='glass rounded-3xl p-6 md:p-8 space-y-6 text-2xl'>
          <div className='space-y-4'>
             <Textarea
              placeholder="Describe your presentation topic, paste your notes, or outline your key points..."
              value={form.content}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  content: e.target.value,
                }))
              }
              className="h-[200px] min-h-[200px] max-h-[200px] overflow-y-auto text-base bg-background/50 border-border/50 rounded-2xl resize-none focus-visible:ring-primary/30 p-6"
            />
             <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>{form.content.length.toLocaleString()} characters</span>
              <span>Markdown supported</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-9">
            {/* Slide count */}
            <div className="space-y-2.5 mr-5">
              <Label className="text-sm font-medium">
                Slides: {form.slideCount}
              </Label>
              <Slider
                value={[form.slideCount]}
                onValueChange={([v]) =>
                  setForm((s) => ({
                    ...s,
                    slideCount: v,
                  }))
                }
                min={3}
                max={12}
                step={1}
                className="py-2"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-sm font-medium">Style</Label>
              <Select
                value={form.style}
                onValueChange={(value) =>
                  setForm((s) => ({
                    ...s,
                    style: value as HomeFormState['style'],
                  }))
                }
              >
       <SelectTrigger className="bg-background/50 border-border/50 rounded-xl ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass rounded-[5px] text-sm">
                  {SLIDE_STYLES.map((s) => (
                    <SelectItem key={s.value} value={s.value} className='text-sm'>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            <div className="space-y-2.5">
              <Label className="text-sm font-medium">Tone</Label>
              <Select
                value={form.tone}
                onValueChange={(value) =>
                  setForm((s) => ({
                    ...s,
                    tone: value as HomeFormState['tone'],
                  }))
                }
              >
       <SelectTrigger className="bg-background/50 border-border/50 rounded-xl text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass rounded-[5px] text-sm">
                  {TONE_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value} className='text-sm'>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            <div className="space-y-2.5">
              <Label className="text-sm font-medium">Layout</Label>
              <Select
                value={form.layout}
                onValueChange={(value) =>
                  setForm((s) => ({
                    ...s,
                    layout: value as HomeFormState['layout'],
                  }))
                }
              >
       <SelectTrigger className="bg-background/50 border-border/50 rounded-xl ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass rounded-[5px] text-xl">
                  {LAYOUT_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value} className='text-sm'>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>            
            </div>

            <div className='flex justify-end pt-2'>
              <Button 
              size={'lg'}
              onClick={()=>{}}
              className='rounded-xl px-8 gap-2 font-semibold text-base'>
                <Wand2 className='size-5'/>
                Generate PPT
              </Button>
            </div>
        </div>

        <div className='mt-5 '>
          <p className="text-center text-sm text-muted-foreground mb-3">
            Try a template
          </p>

           <div className="flex flex-wrap justify-center gap-2">
            { PRESENTATION_TEMPLATES.map((template)=>(
              <button
              key={template.id}
              type='button'
              onClick={()=>{
                setForm({
                  content: template.content,
                    slideCount: template.slides,
                    style: template.style,
                    tone: template.tone,
                    layout: template.layout,
                })
              }}
              className="px-4 py-2 text-sm rounded-full border border-border/50 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all">
                {template.label}
              </button>
            ))}
          </div>

        </div>
        
      </div>

    </div>
  )
}
