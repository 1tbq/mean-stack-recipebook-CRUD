import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name:'swearingfilter'})
export class SwearingPipe implements PipeTransform{
    _bad_words =[
        'poop',
        'crap',
        'damn',
        'butt'
    ];
    transform(value:string):string{
        for (const bad_word of this._bad_words){
            value = value.replace(bad_word,'(oh dear)');
        }
        return value
    }
}