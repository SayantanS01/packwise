"use client";

import { usePackStore } from "@/store/usePackStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PRELOADED_ITEMS } from "@/data/items";
import { useEffect } from "react";
import { PackageCheck, Scale, Wallet, Plane } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Dashboard() {
  const { items, setItems, budgetCategories, baggageProfiles, activeProfileIndex, travelDetails } = usePackStore();

  // Initialization logic to load preloaded items on first visit
  useEffect(() => {
    if (items.length === 0) {
      setItems(PRELOADED_ITEMS);
    }
  }, [items, setItems]);

  const totalItems = items.length;
  const packedItems = items.filter((i) => i.isChecked).length;
  const packingProgress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  const currentProfile = baggageProfiles[activeProfileIndex];
  
  // Calculate weights (convert grams to kg)
  const cabinWeight = items.filter(i => i.suggestedBag === 'Cabin Bag' && i.isChecked).reduce((acc, i) => acc + (i.estimatedWeight * i.quantity) / 1000, 0);
  const checkInWeight = items.filter(i => i.suggestedBag === 'Check-in Bag' && i.isChecked).reduce((acc, i) => acc + (i.estimatedWeight * i.quantity) / 1000, 0);

  const cabinProgress = currentProfile ? (cabinWeight / currentProfile.cabinAllowance) * 100 : 0;
  const checkInProgress = currentProfile ? (checkInWeight / currentProfile.checkInAllowance) * 100 : 0;

  const totalBudget = budgetCategories.reduce((acc, c) => acc + c.allocated, 0);
  const totalSpent = budgetCategories.reduce((acc, c) => acc + c.spent, 0);
  const budgetProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const budgetChartData = [
    { name: "Spent", value: totalSpent, color: "hsl(var(--chart-1))" },
    { name: "Remaining", value: totalBudget - totalSpent, color: "hsl(var(--muted))" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to PackWise AI. Here is your relocation overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Packing Progress */}
        <Card className="glass-card hover:premium-shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packing Progress</CardTitle>
            <PackageCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(packingProgress)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {packedItems} of {totalItems} items packed
            </p>
            <Progress value={packingProgress} className="h-2 mt-3" />
          </CardContent>
        </Card>

        {/* Weight Estimate */}
        <Card className="glass-card hover:premium-shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Luggage Weight</CardTitle>
            <Scale className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cabinWeight.toFixed(1)}kg <span className="text-sm font-normal text-muted-foreground">Cabin</span></div>
            <p className="text-xs text-muted-foreground mt-1">
              Check-in: {checkInWeight.toFixed(1)}kg / {currentProfile?.checkInAllowance}kg
            </p>
            <Progress value={checkInProgress} className="h-2 mt-3 [&>div]:bg-chart-2" />
          </CardContent>
        </Card>

        {/* Budget */}
        <Card className="glass-card hover:premium-shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <Wallet className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ₹{(totalBudget - totalSpent).toLocaleString()} remaining
            </p>
            <Progress value={budgetProgress} className="h-2 mt-3 [&>div]:bg-chart-3" />
          </CardContent>
        </Card>

        {/* Travel */}
        <Card className="glass-card hover:premium-shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departure</CardTitle>
            <Plane className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{travelDetails?.flightNumber || "Not Set"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {travelDetails?.departureTime ? new Date(travelDetails.departureTime).toLocaleDateString() : "Set your travel dates"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="glass-card lg:col-span-4 hover:premium-shadow transition-shadow">
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>Your current spending vs budget allocation.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {budgetChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'var(--popover)', color: 'var(--popover-foreground)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="glass-card lg:col-span-3 hover:premium-shadow transition-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest packing updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.filter(i => i.isChecked).slice(-5).map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <PackageCheck className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Packed in {item.suggestedBag}</p>
                  </div>
                </div>
              ))}
              {packedItems === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No items packed yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
