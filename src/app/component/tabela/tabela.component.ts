import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {Router} from '@angular/router';
import {DengueData, DengueDataStateService} from '../../services/dengue-data-state.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<DengueData>([]);
  displayedColumns: string[] = ['semanaEpidemiologica', 'casosEstimados', 'casosNotificados', 'nivelRisco'];
  private subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
