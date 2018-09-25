import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../projects.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss']
})
export class AdminToolbarComponent implements OnInit {
  selected = 'option2';
  cities = [];

  selectedCity: any;
  selectedCityIds: string[];
  selectedCityName = 'Vilnius';
  selectedCityId: number;
  selectedUserIds: number[];

  subscription: Subscription;

  dataModel = [];

  expositions = [];
  expositionNames = [];
  config = {
    displayKey: 'description',
    search: true,
    height: 'auto',
    placeholder: 'Select',
    customComparator: () => {},
    limitTo: this.cities.length
  };

  constructor(private projectSvc: ProjectsService) {
    this.subscription = this.projectSvc.currentExpositions.subscribe(expos => {
      this.expositions = expos;
      this.expositionNames = [];
      for ( const e of this.expositions) {
        console.log(e['name']);
        this.expositionNames.push(e['name']);
    }
    });
  }

  ngOnInit() {
    const p = this.projectSvc.getExpositions();
    console.log(this.expositions);
    for ( const e of this.expositions) {
        // console.log(e);
        this.expositionNames.push(e['name']);
    }
    this.dataModel.push(this.projectSvc.getCurrentExpositionTag());
  }

}