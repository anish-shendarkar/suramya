'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Package, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [popularItems, setPopularItems] = useState<any[]>([]);
  const [loadingNew, setLoadingNew] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorNew, setErrorNew] = useState(null);
  const [errorPopular, setErrorPopular] = useState(null);
  const router = useRouter();

  // Fetch new arrivals on component mount
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoadingNew(true);
        const response = await fetch('http://localhost:3333/user/newarrivals');

        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }

        const data = await response.json();
        setNewArrivals(data);
        setErrorNew(null);
      } catch (err: any) {
        console.error('Error fetching new arrivals:', err);
        setErrorNew(err.message);
      } finally {
        setLoadingNew(false);
      }
    };

    fetchNewArrivals();
  }, []);

  // Fetch popular items on component mount
  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        setLoadingPopular(true);
        const response = await fetch('http://localhost:3333/user/popularoutfits');

        if (!response.ok) {
          throw new Error('Failed to fetch popular items');
        }

        const data = await response.json();
        setPopularItems(data);
        setErrorPopular(null);
      } catch (err: any) {
        console.error('Error fetching popular items:', err);
        setErrorPopular(err.message);
      } finally {
        setLoadingPopular(false);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-[Joan]">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48">

          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <img
              src="/hero.jpeg"
              alt="Designer wear background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-end text-right space-y-6 ml-auto">

              <div className="max-w-[600px]">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Rent Designer Wear for Your Special Moments
                </h1>

                <p className="text-gray-200 text-sm sm:text-base md:text-lg mt-3">
                  Premium collection of traditional and contemporary wear. Rent authentic designer
                  pieces at a fraction of the cost.
                </p>
              </div>

              <div className="flex gap-4">
                <a href="#new-arrivals">
                  <Button className="bg-white text-black hover:bg-black hover:text-white border">
                    Browse Collection
                  </Button>
                </a>

                <a href="#how-it-works">
                  <Button className="bg-black/60 text-white hover:bg-black border border-white/30">
                    How It Works
                  </Button>
                </a>
              </div>

            </div>
          </div>

        </section>


        {/* Categories Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-center mb-8 sm:mb-12">Photo Gallery</h2>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-center mb-8 sm:mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {steps.map((step) => (
                <Card key={step.title} className="relative overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    <step.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-primary" />
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-500">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Items Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">Popular This Week</h2>
            </div>

            {loadingPopular ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-gray-500">Loading popular items...</p>
              </div>
            ) : errorPopular ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-red-500">Failed to load popular items.</p>
              </div>
            ) : null}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {popularItems.map((item, index) => (
                <Card key={item._id || index} className="group">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                      <Image
                        src={item.coverImage}
                        alt={item.name || item.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        width={300}
                        height={400}
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base line-clamp-1">{item.name || item.title}</h3>
                      <div className="flex justify-between items-center gap-2">
                        <p className="font-bold text-sm sm:text-base">₹{item.rentalPrice || item.price}/day</p>
                        <Button size="sm" className="text-xs sm:text-sm" onClick={() => router.push(`/user/outfit/${item._id}`)}>
                          Rent
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section id="new-arrivals" className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">New Arrivals</h2>
            </div>

            {loadingNew ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-gray-500">Loading new arrivals...</p>
              </div>
            ) : errorNew ? (
              <div className="flex justify-center items-center py-12">
                <p className="text-red-500">Failed to load new arrivals.</p>
              </div>
            ) : null}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((item, index) => (
                <Card key={item._id || index} className="group">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                      <Image
                        src={item.coverImage}
                        alt={item.name || item.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        width={300}
                        height={400}
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base line-clamp-1">{item.name || item.title}</h3>
                      <div className="flex justify-between items-center gap-2">
                        <p className="font-bold text-sm sm:text-base">₹{item.rentalPrice || item.price}/day</p>
                        <Button size="sm" className="text-xs sm:text-sm" onClick={() => router.push(`/user/outfit/${item._id}`)}>
                          Rent
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl px-4">
                  Ready to Rent Your Dream Outfit?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 text-sm sm:text-base md:text-xl px-4">
                  Join thousands of satisfied customers who trust us for their special occasions.
                </p>
              </div>
              <Button className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto mx-4" size="lg">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">Categories</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Sarees
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Kurtas
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">Help</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">About</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Suramya Bespoke. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const steps = [
  {
    title: "Choose Your Outfit",
    description: "Browse our collection and select your perfect outfit for the occasion.",
    icon: Clock,
  },
  {
    title: "Receive & Enjoy",
    description: "Try it on and feel amazing!",
    icon: Package,
  },
  {
    title: "Return With Ease",
    description: "Return the outfit in the provided packaging.",
    icon: RefreshCw,
  },
]