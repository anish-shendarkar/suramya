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
          <div className="bg-muted rounded-lg overflow-hidden relative">
            <div className="flex justify-center items-center">
              <iframe
                className="w-full md:w-[900px] h-[450px] border-0 rounded-lg shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.419368255501!2d73.90143245000002!3d18.61435355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c71c5e8ababb%3A0xba3003e0355f3004!2sZUDIO%20-%20Lohegaon%2C%20Pune!5e0!3m2!1sen!2sin!4v1743481893046!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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

