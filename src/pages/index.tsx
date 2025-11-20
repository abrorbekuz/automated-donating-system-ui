import React, { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'src/components/ui/navigation-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { Search, Repeat, ShieldCheck, YoutubeIcon, SendIcon, RefreshCcwIcon, ClockIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'src/components/ui/accordion'
import { Link } from '@tanstack/react-router'

function MainPage() {
  const categories = ['Games', 'Mobile Games', 'Apps']
  const popularServices = [
    { name: 'Mobile Legends', type: 'Mobile Games' },
    { name: 'League of Legends', type: 'Games' },
    { name: 'PUBG', type: 'Games' },
    { name: 'Clash of Clans', type: 'Mobile Games' },
    { name: 'Fortnite', type: 'Games' },
    { name: 'Roblox', type: 'Games' },
  ]

  const [search, setSearch] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">UP</span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#features" className="px-3 py-2">
                    Features
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#faq" className="px-3 py-2">
                    FAQ
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category}>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href={`#${category.toLowerCase().replace(' ', '-')}`}
                            >
                              <div className="text-sm font-medium leading-none">{category}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Explore {category.toLowerCase()} and related services
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="from-primary-50 bg-gradient-to-b to-background">
          <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your Ultimate Game Services Marketplace
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-muted-foreground">
              Buy, sell, and trade game accounts. Purchase in-game currency, gems, and points for your favorite games
              and apps.
            </p>

            <div className="mx-auto mt-10 max-w-xl">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search games, apps, or services"
                  className="rounded-r-none"
                  onChange={handleChange}
                />
                <Link to="/home">
                  <Button type="button" className="rounded-l-none">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-10 flex justify-center space-x-4">
              {categories.map((category) => (
                <Button key={category} variant="outline">
                  {category}
                </Button>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {popularServices.map((service) => (
                <div key={service.name} className="flex flex-col items-center">
                  <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <span className="text-center text-sm font-medium">{service.name}</span>
                  <span className="text-xs text-muted-foreground">{service.type}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link to="/home">
                <Button size="lg" className="text-lg">
                  Start Searching Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="bg-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose GameServe?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Repeat className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Easy Trading</h3>
                <p className="text-muted-foreground">Seamlessly buy, sell, and trade game accounts and items.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Secure Transactions</h3>
                <p className="text-muted-foreground">Your accounts and personal information are always protected.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ClockIcon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
                <p className="text-muted-foreground">Our team is always available to assist you with any issues.</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className="bg-primary-100 text-primary-800 inline-flex items-center rounded-full px-4 py-2">
                <RefreshCcwIcon className="mr-2 h-5 w-5" />
                <span className="font-semibold">100% Money-Back Guarantee</span>
              </div>
              <p className="mt-2 text-muted-foreground">If something goes wrong, we&apos;ve got you covered.</p>
            </div>
          </div>
        </section>

        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">Join Our Community</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <YoutubeIcon className="mr-2 h-6 w-6 text-red-600" />
                    YouTube Channel
                  </CardTitle>
                  <CardDescription>Watch tutorials, reviews, and gaming content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
                    <span className="text-2xl font-bold text-muted-foreground">Channel Banner</span>
                  </div>
                  <Button className="mt-4 w-full">Subscribe Now</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SendIcon className="mr-2 h-6 w-6 text-blue-500" />
                    Telegram Channel
                  </CardTitle>
                  <CardDescription>Get instant updates and chat with other gamers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
                    <span className="text-2xl font-bold text-muted-foreground">Channel Banner</span>
                  </div>
                  <Button className="mt-4 w-full">Join Channel</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="mx-auto w-full max-w-2xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does GameServe ensure secure transactions?</AccordionTrigger>
                <AccordionContent>
                  GameServe uses advanced encryption and secure payment gateways to protect all transactions. We also
                  have a team of security experts constantly monitoring our systems to prevent any unauthorized access
                  or fraud.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What happens if something goes wrong with my purchase?</AccordionTrigger>
                <AccordionContent>
                  We offer a 100% money-back guarantee if something goes wrong with your purchase. Our support team is
                  available 24/7 to assist you with any issues and will process refunds promptly if needed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                <AccordionContent>
                  Our customer support team is available 24/7 through live chat on our website, email support, and our
                  dedicated support hotline. You can also reach out to us through our Telegram channel for quick
                  responses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is it safe to sell my game account on GameServe?</AccordionTrigger>
                <AccordionContent>
                  Yes, it&apos;s safe to sell your game account on GameServe. We have strict verification processes in
                  place to ensure the legitimacy of all transactions. We also provide secure payment methods and protect
                  your personal information throughout the selling process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="bg-primary-900 text-primary-50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-primary-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Safety Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Community Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-200">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22  16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="hover:text-primary-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-primary-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-primary-800 mt-8 border-t pt-8 text-center">
            <p>&copy; 2023 GameServe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainPage
