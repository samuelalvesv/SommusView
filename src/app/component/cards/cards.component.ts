import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DengueData, DengueDataStateService } from '../../services/dengue-data-state.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  dengueData$: Observable<DengueData[]>;

  constructor(
    private dengueDataStateService: DengueDataStateService,
    private router: Router
  ) {
    this.dengueData$ = this.dengueDataStateService.dengueData$.pipe(
      tap(data => {
        if (data.length === 0) {
          this.dengueDataStateService.loadData();
        }
      })
    );
  }

  backToHome(): void {
    void this.router.navigate(['/']);
  }
}
