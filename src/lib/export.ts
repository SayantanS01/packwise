import { usePackStore } from "@/store/usePackStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportToPDF = () => {
  const store = usePackStore.getState();
  const doc = new jsPDF();
  
  // Cover Page
  doc.setFontSize(24);
  doc.setTextColor(20, 20, 20);
  doc.text("PackWise AI - Relocation Planner", 105, 40, { align: "center" });
  
  doc.setFontSize(14);
  doc.text(`Departure: ${store.travelDetails?.departureTime ? new Date(store.travelDetails.departureTime).toLocaleDateString() : 'TBD'}`, 105, 60, { align: "center" });
  doc.text(`Destination: ${store.travelDetails?.airport || 'TBD'}`, 105, 70, { align: "center" });

  // Progress Summary
  const packed = store.items.filter(i => i.isChecked).length;
  const total = store.items.length;
  doc.text(`Packing Progress: ${packed} / ${total} Items Packed`, 105, 90, { align: "center" });

  // Items Table
  doc.addPage();
  doc.setFontSize(18);
  doc.text("Packing Checklist", 14, 20);

  const tableData = store.items.map(item => [
    item.isChecked ? "✓" : " ",
    item.name,
    item.category,
    item.quantity.toString(),
    item.suggestedBag
  ]);

  autoTable(doc, {
    startY: 30,
    head: [['Status', 'Item', 'Category', 'Qty', 'Bag']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [40, 40, 40] },
  });

  doc.save(`packwise-checklist-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = () => {
  const store = usePackStore.getState();
  const wb = XLSX.utils.book_new();

  // Packing Sheet
  const packingData = store.items.map(item => ({
    Status: item.isChecked ? 'Packed' : 'Pending',
    Item: item.name,
    Category: item.category,
    Quantity: item.quantity,
    Bag: item.suggestedBag,
    Weight: `${item.estimatedWeight}g`,
    Priority: item.priority
  }));
  const wsPacking = XLSX.utils.json_to_sheet(packingData);
  XLSX.utils.book_append_sheet(wb, wsPacking, "Packing");

  // Budget Sheet
  const budgetData = store.budgetCategories.map(cat => ({
    Category: cat.name,
    Allocated: cat.allocated,
    Spent: cat.spent,
    Remaining: cat.allocated - cat.spent
  }));
  const wsBudget = XLSX.utils.json_to_sheet(budgetData);
  XLSX.utils.book_append_sheet(wb, wsBudget, "Budget");

  XLSX.writeFile(wb, `packwise-export-${new Date().toISOString().split('T')[0]}.xlsx`);
};
