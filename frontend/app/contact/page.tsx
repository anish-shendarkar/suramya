"use client"

import { MapPin, Mail, Phone, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2"><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-400">Contact Us</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Visit our shop or reach out through any of the methods below.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {/* Map View */}
            <div className="w-full h-full bg-[#f0f0f0] relative">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/placeholder.svg?height=600&width=800')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Map Pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                    <MapPin size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Visit Us</h3>
              <address className="not-italic text-muted-foreground">
                123 Main Street
                <br />
                Anytown, ST 12345
                <br />
                United States
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Opening Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9am - 6pm
                <br />
                Saturday: 10am - 4pm
                <br />
                Sunday: Closed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Email Us</h3>
              <a href="mailto:info@example.com" className="text-primary hover:underline">
                info@example.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Call Us</h3>
              <a href="tel:+15551234567" className="text-primary hover:underline">
                (555) 123-4567
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

