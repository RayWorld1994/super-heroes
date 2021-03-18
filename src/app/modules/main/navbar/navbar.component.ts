import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';
import { Option } from '../Interfaces/option.interface';
import { menuOption } from '../constants/menuOption';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from '../services/loading.service';

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
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.navOption = [...menuOption];
  }

  ngAfterViewInit(): void {
    this.isLoading = this.loadingService.isLoading.pipe(delay(0));
  }

  setTitle(option: string) {
    this.title = option;
    this.SideNav.mode === 'over' ?? this.SideNav.close();
  }
}
