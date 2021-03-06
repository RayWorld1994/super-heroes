import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';
import { Option } from '../Interfaces/option.interface';
import { menuOption } from '../constants/menuOption';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from '../services/loading.service';
import { TitlePageService } from '../services/title-page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('content') elementRef!: ElementRef;
  @ViewChild(MatSidenav) SideNav!: MatSidenav;
  isLoading!: Observable<boolean>;

  title: string = 'marvel';
  navOption!: Option[];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loadingService: LoadingService,
    private titleService: TitlePageService
  ) {}

  ngOnInit(): void {
    this.navOption = [...menuOption];
    this.setTitle();
  }

  ngAfterViewInit(): void {
    this.isLoading = this.loadingService.isLoading.pipe(delay(0));
  }

  setTitle() {
    this.titleService.titleSubject
      .pipe(delay(0))
      .subscribe((title) => (this.title = title));
  }
}
