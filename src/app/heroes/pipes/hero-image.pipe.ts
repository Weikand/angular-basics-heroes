import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(id:string = '', alt_img:string = ''): string {
    if( !id && !alt_img ){
      return 'assets/no-image.png'
    } else if(alt_img.includes('http')){
      return alt_img;
    } else {
      return `assets/heroes/${id}.jpg`
    }
  }

}
