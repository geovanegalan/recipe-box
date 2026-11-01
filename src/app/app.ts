import { Component, signal } from '@angular/core';
import { RecipeList } from './recipe-list/recipe-list';

@Component({
  imports: [RecipeList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Recipe Box');
}
