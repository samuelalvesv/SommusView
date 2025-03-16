import { Routes } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {TabelaComponent} from './component/tabela/tabela.component';
import {GraficoComponent} from './component/grafico/grafico.component';
import {CardsComponent} from './component/cards/cards.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tabela', component: TabelaComponent },
  { path: 'grafico', component: GraficoComponent },
  { path: 'cards', component: CardsComponent },
  { path: '**', redirectTo: '' }
];
