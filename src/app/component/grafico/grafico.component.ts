import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DengueData, DengueDataStateService } from '../../services/dengue-data-state.service';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent implements OnInit, AfterViewInit, OnDestroy {
  dengueData: DengueData[] = [];
  chart: any;
  private subscription: Subscription = new Subscription();

  @ViewChild('barChart') barChart!: ElementRef;

  constructor(
    private dengueDataStateService: DengueDataStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.dengueDataStateService.dengueData$.subscribe(data => {
        if (data.length === 0) {
          this.dengueDataStateService.loadData();
        }
        this.dengueData = data;

        if (this.chart && this.dengueData.length > 0) {
          this.updateChart();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.dengueData.length > 0) {
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(): void {
    const ctx = this.barChart.nativeElement.getContext('2d');

    const sortedData = [...this.dengueData].sort((a, b) =>
      a.semanaEpidemiologica.localeCompare(b.semanaEpidemiologica)
    );

    const labels = sortedData.map(item => item.semanaEpidemiologica);
    const casosEstimados = sortedData.map(item => item.casosEstimados);
    const casosNotificados = sortedData.map(item => item.casosNotificados);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Casos Estimados',
            data: casosEstimados,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Casos Notificados',
            data: casosNotificados,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparativo de Casos de Dengue por Semana Epidemiológica'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Casos'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Semana Epidemiológica'
            }
          }
        }
      }
    });
  }

  updateChart(): void {
    if (!this.chart) {
      this.createChart();
      return;
    }

    const sortedData = [...this.dengueData].sort((a, b) =>
      a.semanaEpidemiologica.localeCompare(b.semanaEpidemiologica)
    );

    this.chart.data.labels = sortedData.map(item => item.semanaEpidemiologica);
    this.chart.data.datasets[0].data = sortedData.map(item => item.casosEstimados);
    this.chart.data.datasets[1].data = sortedData.map(item => item.casosNotificados);

    this.chart.update();
  }

  backToHome(): void {
    void this.router.navigate(['/']);
  }
}
