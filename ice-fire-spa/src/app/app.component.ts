import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/component/loader.component';
import { CommonService } from './services/common.service';
import { LoaderService } from './components/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private commonService: CommonService,
    public loaderService: LoaderService
  ) { }

  ngOnInit() { };

  ngAfterViewInit(): void {
    //NOTE: Configure the styles and animations for the snack bar.
    this.commonService.adjustSnackBarStyle();
  }

}
