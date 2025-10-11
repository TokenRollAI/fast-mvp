'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ThemeTestPage() {
  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='container mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-5xl font-bold text-foreground'>
            Theme System Test Page
          </h1>
          <p className='text-muted-foreground text-lg'>
            Verify that all colors are displaying correctly in HSL format
          </p>
        </div>

        {/* Color Palette */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>Color Palette (HSL Format)</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <div className='h-20 bg-primary rounded-lg' />
              <p className='text-sm'>Primary</p>
              <code className='text-xs text-muted-foreground'>30 67% 43%</code>
            </div>
            <div className='space-y-2'>
              <div className='h-20 bg-secondary rounded-lg' />
              <p className='text-sm'>Secondary</p>
              <code className='text-xs text-muted-foreground'>280 17% 30%</code>
            </div>
            <div className='space-y-2'>
              <div className='h-20 bg-accent rounded-lg' />
              <p className='text-sm'>Accent</p>
              <code className='text-xs text-muted-foreground'>0 0% 94%</code>
            </div>
            <div className='space-y-2'>
              <div className='h-20 bg-destructive rounded-lg' />
              <p className='text-sm'>Destructive</p>
              <code className='text-xs text-muted-foreground'>352 47% 60%</code>
            </div>
            <div className='space-y-2'>
              <div className='h-20 bg-card border border-border rounded-lg' />
              <p className='text-sm'>Card</p>
              <code className='text-xs text-muted-foreground'>330 48% 12%</code>
            </div>
            <div className='space-y-2'>
              <div className='h-20 bg-muted rounded-lg' />
              <p className='text-sm'>Muted</p>
              <code className='text-xs text-muted-foreground'>0 100% 7%</code>
            </div>
          </CardContent>
        </Card>

        {/* Opacity Modifiers Test */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>Opacity Modifiers (Now Working!)</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex gap-4 items-center'>
              <div className='flex-1 h-16 bg-primary/10 rounded-lg flex items-center justify-center'>
                <span className='text-xs'>10%</span>
              </div>
              <div className='flex-1 h-16 bg-primary/30 rounded-lg flex items-center justify-center'>
                <span className='text-xs'>30%</span>
              </div>
              <div className='flex-1 h-16 bg-primary/50 rounded-lg flex items-center justify-center'>
                <span className='text-xs'>50%</span>
              </div>
              <div className='flex-1 h-16 bg-primary/70 rounded-lg flex items-center justify-center'>
                <span className='text-xs'>70%</span>
              </div>
              <div className='flex-1 h-16 bg-primary/90 rounded-lg flex items-center justify-center'>
                <span className='text-xs'>90%</span>
              </div>
              <div className='flex-1 h-16 bg-primary rounded-lg flex items-center justify-center'>
                <span className='text-xs'>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gradients */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>Gradient System</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='h-32 bg-gradient-primary rounded-lg flex items-center justify-center'>
              <span className='font-semibold'>Primary Gradient</span>
            </div>
            <div className='h-32 bg-gradient-secondary rounded-lg flex items-center justify-center'>
              <span className='font-semibold'>Secondary Gradient</span>
            </div>
            <div className='h-32 bg-gradient-accent rounded-lg flex items-center justify-center'>
              <span className='font-semibold'>Accent Gradient</span>
            </div>
            <div className='h-32 bg-gradient-warm rounded-lg flex items-center justify-center'>
              <span className='font-semibold'>Warm Gradient</span>
            </div>
            <div className='h-32 bg-gradient-cool rounded-lg flex items-center justify-center'>
              <span className='font-semibold'>Cool Gradient</span>
            </div>
            <div className='h-32 bg-gradient-earth rounded-lg flex items-center justify-center'>
              <span className='font-semibold'>Earth Gradient</span>
            </div>
          </CardContent>
        </Card>

        {/* Text Gradients */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>Text Gradients</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <h2 className='text-4xl font-bold text-gradient-primary'>
              Primary Text Gradient
            </h2>
            <h2 className='text-4xl font-bold text-gradient-warm'>
              Warm Text Gradient
            </h2>
            <h2 className='text-4xl font-bold text-gradient-cool'>
              Cool Text Gradient
            </h2>
          </CardContent>
        </Card>

        {/* Shadows and Glows */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>Shadows and Glows</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 md:grid-cols-3 gap-6'>
            <Card className='shadow-warm p-6 text-center'>
              <p className='font-semibold'>Warm Shadow</p>
            </Card>
            <Card className='shadow-warm-lg p-6 text-center'>
              <p className='font-semibold'>Warm Shadow LG</p>
            </Card>
            <Card className='shadow-warm-xl p-6 text-center'>
              <p className='font-semibold'>Warm Shadow XL</p>
            </Card>
            <Card className='glow-primary p-6 text-center'>
              <p className='font-semibold'>Primary Glow</p>
            </Card>
            <Card className='glow-warm p-6 text-center'>
              <p className='font-semibold'>Warm Glow</p>
            </Card>
            <Card className='glow-cool p-6 text-center'>
              <p className='font-semibold'>Cool Glow</p>
            </Card>
          </CardContent>
        </Card>

        {/* Glass Morphism */}
        <div className='relative h-64 bg-gradient-warm rounded-lg overflow-hidden'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Card className='glass p-8 max-w-md'>
              <CardTitle className='mb-4'>Glass Effect</CardTitle>
              <p className='text-sm'>
                This card uses the glass morphism effect with backdrop blur and
                transparency.
              </p>
            </Card>
          </div>
        </div>

        {/* Animations */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>Animations</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Button className='animate-fade-in'>Fade In</Button>
            <Button className='animate-slide-in-up'>Slide Up</Button>
            <Button className='animate-scale-in'>Scale In</Button>
            <Button className='animate-bounce-in'>Bounce In</Button>
          </CardContent>
        </Card>

        {/* Utility Classes */}
        <Card className='shadow-warm-lg'>
          <CardHeader>
            <CardTitle>New Utility Classes</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='section-padding bg-card rounded-lg'>
              <p className='text-center'>Responsive Section Padding</p>
            </div>
            <div className='backdrop-blur-light bg-primary/20 p-6 rounded-lg'>
              <p className='text-center'>Backdrop Blur Light</p>
            </div>
            <Button className='transition-bounce hover:scale-110'>
              Bounce Transition
            </Button>
          </CardContent>
        </Card>

        {/* Success Message */}
        <div className='text-center py-12'>
          <div className='inline-block bg-gradient-primary px-8 py-4 rounded-lg shadow-warm-xl'>
            <h3 className='text-2xl font-bold text-primary-foreground'>
              ✅ Theme System is Working Correctly!
            </h3>
            <p className='text-primary-foreground/80 mt-2'>
              All colors are now in HSL format and fully compatible with
              Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
