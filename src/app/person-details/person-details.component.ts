import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { PeopleService } from "../people.service";
import { Person } from "../person";

@Component({
  selector: 'app-person-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})

export class PersonDetailsComponent implements OnInit, OnDestroy {
  person: Person;
  sub:any;
  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

   constructor(private peopleService: PeopleService,
              private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.person = this.peopleService.get(id);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gotoPeoplesList(){
    let link = ['/persons'];
    this.router.navigate(link);
  }

  savePersonDetails(){
    this.peopleService.save(this.person);
  }
}
