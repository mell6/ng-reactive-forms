import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { states, Address, Hero, powers } from '../data-model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail-prod',
  templateUrl: './hero-detail-prod.component.html',
  styleUrls: ['./hero-detail-prod.component.css']
})
export class HeroDetailProdComponent implements OnChanges {

  states = states;
  @Input() hero: Hero;
  powers = powers;

  // with FormBuilder
  heroForm: FormGroup;

  nameChangeLog: string[] = [];

  constructor(private fb: FormBuilder, private heroService:HeroService) {
    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      //address: this.fb.group(new Address()),
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    })
  }

  setAddresses(addresses: Address[]){
    const addressFormGroups = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFormGroups);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  addLair() {
    // ?? MELL ??
    // 'this' refers to HeroDetailProdComponent, but there is no field 'secretLairs', its a part of heroForm
    // => see 'get secretLairs'
    this.secretLairs.push(this.fb.group(new Address()));
  }

  removeLair(index: number) {
    this.secretLairs.removeAt(index);
  }

  ngOnChanges() {
    // reset is using setValue
    /*
    this.heroForm.reset({
      name:    this.hero.name,
      -/-/ address: this.hero.addresses[0] || new Address(),
      power: this.hero.power,
      sidekick: this.hero.sidekick
    });
    */
    this.rebuildForm();
  }

  rebuildForm() {
    this.heroForm.reset({
      name:    this.hero.name,
      power: this.hero.power,
      sidekick: this.hero.sidekick
    });
    this.setAddresses(this.hero.addresses);
  }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }

  onSubmit(){
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe(/* error handling*/);
    this.ngOnChanges();
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    //deep copy of form model layers
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new ´Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      addresses: secretLairsDeepCopy,
      power: formModel.power as string,
      sidekick: formModel.sidekick
    };

    return saveHero;
  }

  revert() {
    this.ngOnChanges();
  }

}
