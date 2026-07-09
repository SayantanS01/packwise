"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePackStore } from "@/store/usePackStore";
import { useState } from "react";

const TIMELINE_PHASES = [
  { id: "30-days", title: "30 Days Before", tasks: ["Notice Period Started", "Book Flights / Train", "Sort what to take and what to discard"] },
  { id: "15-days", title: "15 Days Before", tasks: ["Finalize PG / Flat", "Start Packing Non-Essentials", "Collect pending documents"] },
  { id: "7-days", title: "7 Days Before", tasks: ["Pack 80% of luggage", "Meet friends and relatives", "Clear local dues"] },
  { id: "1-day", title: "1 Day Before", tasks: ["Pack essentials & daily use items", "Print boarding passes", "Charge all electronics"] },
  { id: "arrival", title: "Arrival Day", tasks: ["Reach PG / Flat", "Unpack Essentials", "Buy immediate groceries (water, snacks)"] },
];

export default function TimelinePage() {
  const { items, toggleItemCheck } = usePackStore();
  
  // Local state for timeline tasks
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const officeItems = items.filter(i => i.category === 'Office Joining');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Timeline & Joining</h1>
        <p className="text-muted-foreground">Manage your pre-departure timeline and office joining checklist.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 flex-1 min-h-0">
        
        {/* Relocation Timeline */}
        <Card className="glass-card premium-shadow flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="size-5 text-primary" /> Relocation Timeline
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1 p-0">
            <div className="p-6 relative">
              {/* Vertical line */}
              <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-border/50" />
              
              <div className="space-y-8">
                {TIMELINE_PHASES.map((phase, pIndex) => {
                  const allPhaseTasksCompleted = phase.tasks.every((_, i) => completedTasks[`${phase.id}-${i}`]);
                  return (
                    <div key={phase.id} className="relative z-10 flex gap-4">
                      <div className={`mt-0.5 size-6 rounded-full border-2 flex items-center justify-center shrink-0 bg-background ${allPhaseTasksCompleted ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'}`}>
                        {allPhaseTasksCompleted && <CheckCircle2 className="size-4" />}
                      </div>
                      <div className="space-y-3 flex-1 pb-2">
                        <h3 className={`font-semibold ${allPhaseTasksCompleted ? 'text-primary' : ''}`}>{phase.title}</h3>
                        <div className="space-y-2">
                          {phase.tasks.map((task, tIndex) => {
                            const taskId = `${phase.id}-${tIndex}`;
                            const isChecked = completedTasks[taskId] || false;
                            return (
                              <div key={taskId} className={`flex items-start gap-3 p-2 rounded-md hover:bg-muted/30 transition-colors ${isChecked ? 'opacity-50' : ''}`}>
                                <Checkbox 
                                  checked={isChecked} 
                                  onCheckedChange={() => toggleTask(taskId)}
                                  className="mt-0.5 size-4 rounded-sm"
                                />
                                <span className={`text-sm ${isChecked ? 'line-through text-muted-foreground' : ''}`}>{task}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Office Joining Checklist */}
        <Card className="glass-card premium-shadow flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="size-5 text-primary" /> Office Joining
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border/50">
              {officeItems.map(item => (
                <div key={item.id} className={`p-4 flex items-start gap-4 transition-colors hover:bg-muted/30 ${item.isChecked ? 'opacity-50' : ''}`}>
                  <Checkbox 
                    checked={item.isChecked} 
                    onCheckedChange={() => toggleItemCheck(item.id)}
                    className="mt-1 size-5 rounded-md border-border/50"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <span className={`font-medium ${item.isChecked ? 'line-through text-muted-foreground' : ''}`}>{item.name}</span>
                      {item.priority === 'High' && !item.isChecked && (
                        <Badge variant="destructive" className="w-fit text-[10px] h-4 px-1.5 rounded-sm">Important</Badge>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground">{item.notes}</p>
                    )}
                  </div>
                </div>
              ))}
              {officeItems.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No office joining items found in your packing list.
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

      </div>
    </div>
  );
}
