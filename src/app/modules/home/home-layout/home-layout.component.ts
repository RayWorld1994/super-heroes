import { Component, OnInit } from '@angular/core';
import { TitlePageService } from '../../main/services/title-page.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  constructor(private titleService: TitlePageService) {}

  ngOnInit(): void {
    this.titleService.titleSubject.next('Home');
  }
}
