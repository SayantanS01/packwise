"use client";

import { usePackStore } from "@/store/usePackStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, Printer, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef } from "react";
import { exportToPDF, exportToExcel } from "@/lib/export";
import { bangaloreItems } from "@/data/bangaloreList";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const store = usePackStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    const data = JSON.stringify(usePackStore.getState(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `packwise-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.items && data.baggageProfiles) {
          usePackStore.setState(data);
          alert("Backup restored successfully!");
        } else {
          alert("Invalid backup file structure.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone unless you have a backup.")) {
      localStorage.removeItem('packwise-storage');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & Export</h1>
        <p className="text-muted-foreground">Manage your preferences and data backups.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Appearance */}
        <Card className="glass-card premium-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><SettingsIcon className="size-5" /> Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full bg-background/50">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="glass-card premium-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Download className="size-5" /> Data & Backups</CardTitle>
            <CardDescription>Export and import your relocation data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleExportJSON} variant="outline" className="w-full justify-start bg-background/50">
              <Download className="mr-2 size-4" /> Export Backup (JSON)
            </Button>
            
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImportJSON} 
            />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full justify-start bg-background/50">
              <Upload className="mr-2 size-4" /> Import Backup (JSON)
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={exportToPDF} variant="outline" className="w-full justify-start bg-background/50">
                <Printer className="mr-2 size-4" /> Print PDF
              </Button>
              <Button onClick={exportToExcel} variant="outline" className="w-full justify-start bg-background/50">
                <Download className="mr-2 size-4" /> Export Excel
              </Button>
            </div>

            <div className="pt-4 mt-4 border-t border-border/50">
              <Button onClick={() => {
                const store = usePackStore.getState();
                const currentNames = new Set(store.items.map((i) => i.name));
                const newItems = bangaloreItems.filter((i: any) => !currentNames.has(i.name));
                store.setItems([...store.items, ...newItems]);
                alert('Template loaded successfully!');
              }} variant="outline" className="w-full justify-start text-emerald-500 border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20">
                <Upload className="mr-2 size-4" /> Load Recommended Template
              </Button>
            </div>

            <div className="pt-4 mt-4 border-t border-border/50">
              <Button onClick={handleReset} variant="destructive" className="w-full justify-start">
                <Trash2 className="mr-2 size-4" /> Reset All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
