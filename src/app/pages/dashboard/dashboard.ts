import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  @ViewChild('revenueChart', { static: true }) chartRef!: ElementRef;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async logout() {
    await this.supabase.signOut();
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue (€)',
          data: [1200, 1900, 1500, 2400, 1800, 3200],
          backgroundColor: '#3b82f6',
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: 'white' } } },
        scales: {
          x: { ticks: { color: 'white' }, grid: { color: '#374151' } },
          y: { ticks: { color: 'white' }, grid: { color: '#374151' } },
        }
      }
    });
  }
}