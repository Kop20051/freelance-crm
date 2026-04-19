import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

interface InvoiceItem {
  name: string;
  price: number;
}

@Component({
  selector: 'app-invoices',
  imports: [FormsModule],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices {
  clientName = '';

  items: InvoiceItem[] = [
    { name: '', price: 0 }
  ];

  addItem() {
    this.items.push({ name: '', price: 0 });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  subtotal() {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  vat() {
    return Math.round(this.subtotal() * 0.2);
  }

  total() {
    return this.subtotal() + this.vat();
  }

  generatePDF() {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('en-GB');

    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text('Freelance CRM', 20, 25);

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Invoice', 20, 35);
    doc.text(`Date: ${date}`, 150, 35);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 42, 190, 42);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Bill To:', 20, 55);
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 30);
    doc.text(this.clientName || 'Client Name', 20, 65);

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('SERVICE', 20, 85);
    doc.text('PRICE', 160, 85);
    doc.line(20, 89, 190, 89);

    let y = 100;
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    this.items.forEach(item => {
      if (item.name) {
        doc.text(item.name, 20, y);
        doc.text(`€${item.price}`, 160, y);
        y += 12;
      }
    });

    y += 10;
    doc.line(20, y, 190, y);
    y += 12;

    doc.setTextColor(100, 100, 100);
    doc.text('Subtotal', 130, y);
    doc.text(`€${this.subtotal()}`, 160, y);
    y += 10;

    doc.text('VAT (20%)', 130, y);
    doc.text(`€${this.vat()}`, 160, y);
    y += 10;

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Total', 130, y);
    doc.text(`€${this.total()}`, 160, y);

    doc.save(`invoice-${this.clientName || 'client'}-${date}.pdf`);
  }
}