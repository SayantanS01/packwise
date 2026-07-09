"use client";

import { usePackStore } from "@/store/usePackStore";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const { items, toggleItemCheck } = usePackStore();

  const documents = items.filter(i => i.category === 'Documents');
  const packedDocs = documents.filter(i => i.isChecked);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Manage your physical and digital documents.</p>
        </div>
        <Button variant="outline" className="shrink-0 bg-background/50 premium-shadow">
          <UploadCloud className="mr-2 size-4" /> Upload Soft Copy
        </Button>
      </div>

      <div className="glass-card rounded-xl border border-border/50 flex-1 overflow-hidden flex flex-col premium-shadow">
        <div className="bg-muted/20 p-4 border-b border-border/50 font-medium flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <FileText className="size-4" />
            <span>Essential Documents ({packedDocs.length}/{documents.length} Packed)</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="divide-y divide-border/50">
            {documents.map(doc => (
              <div key={doc.id} className={`p-4 flex items-start gap-4 transition-colors hover:bg-muted/30 ${doc.isChecked ? 'opacity-50' : ''}`}>
                <Checkbox 
                  checked={doc.isChecked} 
                  onCheckedChange={() => toggleItemCheck(doc.id)}
                  className="mt-1 size-5 rounded-md border-border/50"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className={`font-medium ${doc.isChecked ? 'line-through text-muted-foreground' : ''}`}>{doc.name}</span>
                    {doc.priority === 'High' && !doc.isChecked && (
                      <Badge variant="destructive" className="w-fit text-[10px] h-4 px-1.5 rounded-sm">Crucial</Badge>
                    )}
                  </div>
                  {doc.notes && (
                    <p className="text-xs text-muted-foreground">{doc.notes}</p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
                    <span>{doc.subcategory}</span>
                    <span>• Qty: {doc.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
