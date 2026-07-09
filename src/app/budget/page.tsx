"use client";

import { usePackStore } from "@/store/usePackStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { IndianRupee } from "lucide-react";

export default function BudgetPage() {
  const { budgetCategories } = usePackStore();

  const totalAllocated = budgetCategories.reduce((acc, c) => acc + c.allocated, 0);
  const totalSpent = budgetCategories.reduce((acc, c) => acc + c.spent, 0);
  
  const chartData = budgetCategories.map(c => ({
    name: c.name,
    Allocated: c.allocated,
    Spent: c.spent,
  }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
        <p className="text-muted-foreground">Manage your relocation finances and track expenses.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-card premium-shadow lg:col-span-1">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Total budget utilization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Total Allocated</div>
              <div className="text-3xl font-bold">₹{totalAllocated.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Total Spent</div>
              <div className="text-3xl font-bold text-destructive">₹{totalSpent.toLocaleString()}</div>
            </div>
            <div className="space-y-2 pt-4 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span>Utilization</span>
                <span className="font-medium">{((totalSpent / totalAllocated) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(totalSpent / totalAllocated) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card premium-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'var(--popover)', color: 'var(--popover-foreground)', boxShadow: 'var(--radius)' }} 
                  cursor={{ fill: 'var(--muted)' }}
                />
                <Bar dataKey="Allocated" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Spent" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="glass-card rounded-xl border border-border/50 overflow-hidden premium-shadow">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/20 font-medium text-sm text-muted-foreground">
          <div className="col-span-6 md:col-span-4">Category</div>
          <div className="col-span-6 md:col-span-8 flex justify-between">
            <span>Progress</span>
            <span className="hidden md:inline text-right min-w-[100px]">Spent / Total</span>
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {budgetCategories.map(category => {
            const percentage = (category.spent / category.allocated) * 100;
            return (
              <div key={category.name} className="grid grid-cols-12 gap-4 p-4 items-center">
                <div className="col-span-6 md:col-span-4 font-medium flex items-center gap-2">
                  <IndianRupee className="size-4 text-muted-foreground hidden sm:block" />
                  {category.name}
                </div>
                <div className="col-span-6 md:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                  <Progress 
                    value={percentage} 
                    className={`h-2 flex-1 ${percentage > 100 ? '[&>div]:bg-destructive' : percentage > 80 ? '[&>div]:bg-amber-500' : ''}`} 
                  />
                  <div className="text-right text-sm">
                    <span className={percentage > 100 ? 'text-destructive font-semibold' : 'font-medium'}>
                      ₹{category.spent.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground hidden md:inline"> / ₹{category.allocated.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
