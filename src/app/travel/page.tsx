"use client";

import { usePackStore } from "@/store/usePackStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Building, Phone, Save } from "lucide-react";

export default function TravelPage() {
  const { travelDetails, setTravelDetails } = usePackStore();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setTravelDetails({
      flightNumber: formData.get("flightNumber") as string,
      pnr: formData.get("pnr") as string,
      departureTime: formData.get("departureTime") as string,
      arrivalTime: formData.get("arrivalTime") as string,
      terminal: formData.get("terminal") as string,
      airport: formData.get("airport") as string,
      cabDetails: formData.get("cabDetails") as string,
      hotel: formData.get("hotel") as string,
      pgAddress: formData.get("pgAddress") as string,
      emergencyContacts: formData.get("emergencyContacts") as string,
      googleMapsLink: formData.get("googleMapsLink") as string,
      numberOfTravelers: parseInt(formData.get("numberOfTravelers") as string) || 1,
      ticketCost: parseFloat(formData.get("ticketCost") as string) || 0,
      ticketFileUrl: formData.get("ticketFileUrl") as string,
      accommodationCost: parseFloat(formData.get("accommodationCost") as string) || 0,
      accommodationFileUrl: formData.get("accommodationFileUrl") as string,
    });
    // Need a toast here ideally (shadcn sonner)
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Travel Planner</h1>
        <p className="text-muted-foreground">Keep all your itinerary, costs, and transit details in one place.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex justify-end">
          <Button type="submit" className="premium-shadow">
            <Save className="size-4 mr-2" /> Save Details
          </Button>
        </div>

        {/* Flight Details */}
        <Card className="glass-card premium-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plane className="size-5" /> Travel Details & Tickets</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
              <Input id="numberOfTravelers" name="numberOfTravelers" type="number" min="1" defaultValue={travelDetails?.numberOfTravelers || 1} className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticketCost">Total Ticket Cost (₹)</Label>
              <Input id="ticketCost" name="ticketCost" type="number" min="0" defaultValue={travelDetails?.ticketCost} placeholder="e.g., 5000" className="bg-background/50" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="ticketFileUrl">Ticket Link (Google Drive / DropBox URL)</Label>
              <Input id="ticketFileUrl" name="ticketFileUrl" type="url" defaultValue={travelDetails?.ticketFileUrl} placeholder="https://..." className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flightNumber">Flight / Train Number</Label>
              <Input id="flightNumber" name="flightNumber" defaultValue={travelDetails?.flightNumber} placeholder="e.g., 6E 123" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pnr">PNR Number</Label>
              <Input id="pnr" name="pnr" defaultValue={travelDetails?.pnr} placeholder="e.g., WXY123" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time (Date & Time)</Label>
              <Input id="departureTime" name="departureTime" type="datetime-local" defaultValue={travelDetails?.departureTime} className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival Time</Label>
              <Input id="arrivalTime" name="arrivalTime" type="datetime-local" defaultValue={travelDetails?.arrivalTime} className="bg-background/50" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="airport">Origin & Destination Airport / Station</Label>
              <Input id="airport" name="airport" defaultValue={travelDetails?.airport} placeholder="e.g., DEL -> BLR" className="bg-background/50" />
            </div>
          </CardContent>
        </Card>

        {/* Accommodation Details */}
        <Card className="glass-card premium-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building className="size-5" /> Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hotel">Initial Hotel / Stay</Label>
              <Input id="hotel" name="hotel" defaultValue={travelDetails?.hotel} placeholder="Hotel Name & Booking ID" className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accommodationCost">Total Stay Cost (₹)</Label>
              <Input id="accommodationCost" name="accommodationCost" type="number" min="0" defaultValue={travelDetails?.accommodationCost} placeholder="e.g., 12000" className="bg-background/50" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="accommodationFileUrl">Booking Confirmation Link</Label>
              <Input id="accommodationFileUrl" name="accommodationFileUrl" type="url" defaultValue={travelDetails?.accommodationFileUrl} placeholder="https://..." className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pgAddress">Permanent / PG Address</Label>
              <Input id="pgAddress" name="pgAddress" defaultValue={travelDetails?.pgAddress} placeholder="Full address..." className="bg-background/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="googleMapsLink">Google Maps Link</Label>
              <Input id="googleMapsLink" name="googleMapsLink" defaultValue={travelDetails?.googleMapsLink} placeholder="https://maps.google.com/..." className="bg-background/50" />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
