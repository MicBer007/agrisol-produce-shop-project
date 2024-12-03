import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    {name: "Potatoes", stock: 300, price: 10},
    {name: "Maize heads", stock: 200, price: 15},
    {name: "Carrots", stock: 100, price: 7},
    {name: "Cabbages", stock: 70, price: 30}
  ];
}
