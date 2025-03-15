import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {DengueDataService} from '../../services/dengue-data.services.ts.service';
import {forkJoin} from 'rxjs';
import {getISOWeek, getYear, subWeeks} from 'date-fns';

interface DengueData {
  semanaEpidemiologica: string;
  casosEstimados: number;
  casosNotificados: number;
  nivelRisco: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  currentView: 'home' | 'tabela' | 'grafico' | 'cards' = 'home';
  dengueData: DengueData[] = [];

  displayedColumns: string[] = ['semanaEpidemiologica', 'casosEstimados', 'casosNotificados', 'nivelRisco'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dengueDataService: DengueDataService) {}

  ngOnInit(): void {}

  getLast3Weeks(): Array<{ week: number, year: number }> {
    const result = [];
    const now = new Date();

    for (let i = 1; i <= 3; i++) {
      const pastDate = subWeeks(now, i);
      result.push({
        week: getISOWeek(pastDate),
        year: getYear(pastDate)
      });
    }

    return result;
  }

  navigateToView(view: string): void {
    switch(view) {
      case 'tabela':
        this.loadDengueData();
        this.currentView = 'tabela';
        break;
      case 'grafico':
        this.loadDengueData();
        this.currentView = 'grafico';
        break;
      case 'cards':
        this.loadDengueData();
        this.currentView = 'cards';
        break;
      default:
        this.currentView = 'home';
    }
  }

  formatSemanaEpidemiologica(se: number): string {
    // SE vem no formato YYYYWW (ano + semana)
    // Extrair o ano (primeiros 4 dígitos) e a semana (últimos 2 dígitos)
    const ano = Math.floor(se / 100);
    const semana = se % 100;
    return `${ano}-${semana.toString().padStart(2, '0')}`;
  }

  loadDengueData(): void {
    const weeks = this.getLast3Weeks();
    const requests = weeks.map(({ week, year }) =>
      this.dengueDataService.getDengueData(week, year)
    );

    forkJoin(requests).subscribe({
      next: (responses) => {
        const rawData = responses.flat();

        // Mapear os dados recebidos para o formato da interface DengueData
        this.dengueData = rawData.map(item => ({
          semanaEpidemiologica: this.formatSemanaEpidemiologica(item.SE),
          casosEstimados: item.casos_est,
          casosNotificados: item.casos,
          nivelRisco: item.nivel
        }));

        console.log('Dados processados:', this.dengueData);
      },
      error: (err) => console.error('Erro ao carregar dados:', err)
    });
  }

  backToHome(): void {
    this.currentView = 'home';
  }
}
