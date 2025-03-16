import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {DengueDataService} from './dengue-data.services.ts.service';
import {getISOWeek, getYear, subWeeks} from 'date-fns';

export interface DengueData {
  semanaEpidemiologica: string;
  casosEstimados: number;
  casosNotificados: number;
  nivelRisco: number;
}

@Injectable({
  providedIn: 'root'
})
export class DengueDataStateService {
  private dengueDataSubject = new BehaviorSubject<DengueData[]>([]);
  public dengueData$ = this.dengueDataSubject.asObservable();

  constructor(private dengueDataService: DengueDataService) {}

  loadData(): void {
    const weeks = this.getLast3Weeks();
    const requests = weeks.map(({ week, year }) =>
      this.dengueDataService.getDengueData(week, year)
    );

    forkJoin(requests).subscribe({
      next: (responses) => {
        const rawData = responses.flat();
        const processedData = rawData.map(item => ({
          semanaEpidemiologica: this.formatSemanaEpidemiologica(item.SE),
          casosEstimados: item.casos_est,
          casosNotificados: item.casos,
          nivelRisco: item.nivel
        }));

        this.dengueDataSubject.next(processedData);
      },
      error: (err) => console.error('Erro ao carregar dados:', err)
    });
  }

  private getLast3Weeks(): Array<{ week: number, year: number }> {
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

  private formatSemanaEpidemiologica(se: number): string {
    const ano = Math.floor(se / 100);
    const semana = se % 100;
    return `${ano}-${semana.toString().padStart(2, '0')}`;
  }
}
