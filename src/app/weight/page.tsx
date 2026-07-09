"use client";

import { usePackStore } from "@/store/usePackStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Info, Briefcase, Backpack } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WeightCalculatorPage() {
  const { items, baggageProfiles, activeProfileIndex, setActiveProfileIndex } = usePackStore();

  const currentProfile = baggageProfiles[activeProfileIndex];

  // Calculate weights in kg (only for items checked/packed OR we can calculate for all)
  // Let's calculate expected weight vs packed weight
  const getWeight = (bag: string, onlyPacked: boolean = false) => {
    return items
      .filter(i => i.suggestedBag === bag && (!onlyPacked || i.isChecked))
      .reduce((acc, i) => acc + (i.estimatedWeight * i.quantity) / 1000, 0);
  };

  const cabinExpected = getWeight('Cabin Bag');
  const cabinPacked = getWeight('Cabin Bag', true);
  const checkInExpected = getWeight('Check-in Bag');
  const checkInPacked = getWeight('Check-in Bag', true);

  const getStatusColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 100) return 'bg-destructive';
    if (percentage > 85) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weight Calculator</h1>
        <p className="text-muted-foreground">Manage baggage limits and avoid excess weight fees.</p>
      </div>

      <Card className="glass-card premium-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Airline Profile</CardTitle>
            <CardDescription>Select your airline to apply default baggage limits.</CardDescription>
          </div>
          <Select 
            value={activeProfileIndex.toString()} 
            onValueChange={(val) => setActiveProfileIndex(parseInt(val || "0"))}
          >
            <SelectTrigger className="w-[180px] bg-background/50">
              <SelectValue placeholder="Select Airline" />
            </SelectTrigger>
            <SelectContent>
              {baggageProfiles.map((p, i) => (
                <SelectItem key={i} value={i.toString()}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cabin Bag */}
        <Card className="glass-card premium-shadow relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(cabinExpected, currentProfile.cabinAllowance)}`} />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Backpack className="size-5 text-muted-foreground" />
              Cabin Baggage
            </CardTitle>
            <CardDescription>Limit: {currentProfile.cabinAllowance} kg</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Expected Total Weight</span>
                <span className={cabinExpected > currentProfile.cabinAllowance ? 'text-destructive font-bold' : ''}>
                  {cabinExpected.toFixed(1)} / {currentProfile.cabinAllowance} kg
                </span>
              </div>
              <Progress 
                value={(cabinExpected / currentProfile.cabinAllowance) * 100} 
                className={`h-3 ${cabinExpected > currentProfile.cabinAllowance ? '[&>div]:bg-destructive' : cabinExpected > currentProfile.cabinAllowance * 0.85 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'}`} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Currently Packed</span>
                <span>{cabinPacked.toFixed(1)} kg</span>
              </div>
              <Progress value={(cabinPacked / currentProfile.cabinAllowance) * 100} className="h-2 opacity-50" />
            </div>

            {cabinExpected > currentProfile.cabinAllowance && (
              <Badge variant="destructive" className="w-full justify-center py-1 mt-2">
                <Info className="size-3 mr-1" /> Exceeds limit by {(cabinExpected - currentProfile.cabinAllowance).toFixed(1)} kg
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Check-in Bag */}
        <Card className="glass-card premium-shadow relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(checkInExpected, currentProfile.checkInAllowance)}`} />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="size-5 text-muted-foreground" />
              Check-in Baggage
            </CardTitle>
            <CardDescription>Limit: {currentProfile.checkInAllowance} kg ({currentProfile.numberOfBags} Bag)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Expected Total Weight</span>
                <span className={checkInExpected > currentProfile.checkInAllowance ? 'text-destructive font-bold' : ''}>
                  {checkInExpected.toFixed(1)} / {currentProfile.checkInAllowance} kg
                </span>
              </div>
              <Progress 
                value={(checkInExpected / currentProfile.checkInAllowance) * 100} 
                className={`h-3 ${checkInExpected > currentProfile.checkInAllowance ? '[&>div]:bg-destructive' : checkInExpected > currentProfile.checkInAllowance * 0.85 ? '[&>div]:bg-amber-500' : '[&>div]:bg-emerald-500'}`} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Currently Packed</span>
                <span>{checkInPacked.toFixed(1)} kg</span>
              </div>
              <Progress value={(checkInPacked / currentProfile.checkInAllowance) * 100} className="h-2 opacity-50" />
            </div>

            {checkInExpected > currentProfile.checkInAllowance && (
              <Badge variant="destructive" className="w-full justify-center py-1 mt-2">
                <Info className="size-3 mr-1" /> Exceeds limit by {(checkInExpected - currentProfile.checkInAllowance).toFixed(1)} kg
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
