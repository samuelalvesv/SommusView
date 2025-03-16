import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DengueData, DengueDataStateService } from '../../services/dengue-data-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit, OnDestroy {
  dengueData: DengueData[] = [];
  private subscription: Subscription = new Subscription();

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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  backToHome(): void {
    void this.router.navigate(['/']);
  }
}
