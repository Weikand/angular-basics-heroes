import { Component, OnInit } from '@angular/core';
import {Hero, Publisher} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel'
    }
  ]

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: ''
  }
  image:string= '';

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('add')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroesService.getHeroById(id))
        )
        .subscribe( hero => {
          this.hero = hero;
        })
    }
  }

  imageChange( event:any) {
    this.image = event.target.value;
    return (this.image.length > 0) ? this.hero.alt_img = this.image : this.image = '';
  }

  save() {
    if(this.hero.superhero.trim().length !== 0) {
      if(this.hero.id){
        // Update
        this.heroesService.updateHero(this.hero)
          .subscribe(() => {
            this.showSnackBar('Register updated');
          })
      } else {
        // Create
        this.heroesService.saveHero(this.hero)
          .subscribe(hero => {
            this.router.navigate(['/heroes/edit', hero.id]);
            this.showSnackBar('Register created');
          })
      }
    }
  }

  delete() {

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {...this.hero}
    });
    // switchMap(({id}) => this.heroesService.getHeroById(id))
    confirmDialog.afterClosed().pipe(
      switchMap((result) => result ?
          this.heroesService.deleteHero(this.hero.id!) : new BehaviorSubject(false)
      )).subscribe(resp => {
        console.log(resp);
        if(resp !== false)this.router.navigate(['/heroes/list']);
      })
  }

  showSnackBar( message:string ) {
    this.snackBar.open(message, 'Close', {duration:2500})
  }
}
