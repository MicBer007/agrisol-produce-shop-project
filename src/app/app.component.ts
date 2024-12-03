import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  products = [
    {name: "Potatoes", stock: 300, price: 10},
    {name: "Maize heads", stock: 200, price: 15},
    {name: "Carrots", stock: 100, price: 7}
  ];
}
