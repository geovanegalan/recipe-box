import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Recipe Box');

  protected verCarbonara(): void {
    console.log('Receita escolhida: Carbonara');
  }

  protected verSaladaCaprese(): void {
    console.log('Receita escolhida: Salada Caprese');
  }
}
