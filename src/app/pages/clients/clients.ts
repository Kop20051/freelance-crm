import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase';

interface Client {
  name: string;
  project: string;
  status: 'Active' | 'Pending' | 'Finished';
  value: number;
}

@Component({
  selector: 'app-clients',
  imports: [FormsModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients implements OnInit {
  filter = 'All';
  clients: Client[] = [];
  showForm = false;

  newClient: Client = {
    name: '',
    project: '',
    status: 'Active',
    value: 0
  };

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    const { data } = await this.supabase.getClients();
    if (data) this.clients = data;
  }

  async addClient() {
    if (!this.newClient.name || !this.newClient.project) return;
    
    const { data } = await this.supabase.addClient(this.newClient);
    if (data) {
      this.clients.push(data[0]);
      this.newClient = { name: '', project: '', status: 'Active', value: 0 };
      this.showForm = false;
    }
  }

  filteredClients() {
    if (this.filter === 'All') return this.clients;
    return this.clients.filter(c => c.status === this.filter);
  }

  setFilter(f: string) {
    this.filter = f;
  }

  getBadgeClass(status: string) {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold ';
    if (status === 'Active') return base + 'bg-green-900 text-green-400';
    if (status === 'Pending') return base + 'bg-yellow-900 text-yellow-400';
    return base + 'bg-gray-700 text-gray-400';
  }
}