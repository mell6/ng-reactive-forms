import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { states, Address, Hero, heroes } from '../data-model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent{

  states = states;
  @Input() hero: Hero;
  heroes = heroes;

  // without Formbuilder
  /*
  heroForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    address: new FormGroup(
                            {
                            street: new FormControl(),
                            city: new FormControl(),
                            state: new FormControl(),
                            zip: new FormControl()
                            }
                          ),
    power: new FormControl(),
    sidekick: new FormControl()
  });
  */


  // with FormBuilder
  heroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.heroForm.setValue({
      name: 'MELL', //this.heroes[0].name,
      address: {street: 'Karlstr. 68-72', zip: '74076', state: 'CA', city: 'Heilbronx'}, //this.heroes[0].addresses[0] || new Address()
      power: 'blabla',
      sidekick: true
    });
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group(
                            /*
                            {
                              street: '',
                              city: '',
                              state: '',
                              zip: ''
                            }
                            */
                            new Address()
                            ),
      power: '',
      sidekick: ''
    })
  }


}
