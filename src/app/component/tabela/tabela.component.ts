import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DengueData, DengueDataStateService } from '../../services/dengue-data-state.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements AfterViewInit {
  private dengueDataStateService = inject(DengueDataStateService);
  private router = inject(Router);

  dataSource = new MatTableDataSource<DengueData>([]);
  displayedColumns: string[] = ['semanaEpidemiologica', 'casosEstimados', 'casosNotificados', 'nivelRisco'];
  dengueData$: Observable<DengueData[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dengueData$ = this.dengueDataStateService.dengueData$.pipe(
      tap(data => {
        if (data.length === 0) {
          this.dengueDataStateService.loadData();
        }
        this.dataSource.data = data;
      })
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  backToHome(): void {
    void this.router.navigate(['/']);
  }
}
