import { Component, OnInit } from '@angular/core';
import {Hero} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  input:string = '';
  heroes: Hero[] = [];

  constructor( private heroesService: HeroesService,
               private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.heroesService.getHeroSuggestions(this.input).subscribe(heroes => this.heroes = heroes);
  }

  selectedOption( event: MatAutocompleteSelectedEvent) {
    if(event.option.value) {
      const hero: Hero = event.option.value;
      this.input = hero.superhero;
      this.router.navigate(['/heroes/', hero.id])
    }
  }

}
