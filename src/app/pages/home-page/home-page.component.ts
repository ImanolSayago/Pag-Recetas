import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from '../../service/recetas.service';
import { RecipeInfo } from '../../interfaces/recetas';
import { RecetasRandom, Recipe } from '../../interfaces/recetasRandom';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
    this.obtenerRecetasRandom();
  }
  rutas = inject(Router);
  servicio= inject(RecetasService);

  listaRecetas: Array<Recipe>= []
  
  obtenerRecetasRandom()
  {
    this.servicio.getRandomRecipe(5).subscribe(
      {
        next:(data)=>{
        console.log(data);
        this.listaRecetas=data.recipes;
        },
        error:(err:Error)=>{
          console.log(err.message);
        }
      }
    )
  }
}
