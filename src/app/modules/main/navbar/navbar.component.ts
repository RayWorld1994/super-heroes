import { LoadingService } from './../services/loading.service';
import { ToggleSearchService } from './../../shared/services/toggle-search.service';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { Attribute, Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';
import { Option } from '../Interfaces/option.interface';
import { menuOption } from '../constants/menuOption';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Event, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
    private scrollDispatcher: ScrollDispatcher,
    private toggleSearchService: ToggleSearchService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.navOption = [...menuOption];

    // this.route.url.subscribe((url) => {
    //   console.log(url);
    // });

    // this.router.events.subscribe((event: Event) => {
    //   this.title = event.url
    // });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.isLoading = this.loadingService.isLoading.pipe(delay(0));
  }

  setTitle(option: string) {
    this.title = option;
    if (this.SideNav.mode === 'over') {
      this.SideNav.close();
    }
  }

  upToTop() {
    this.scrollDispatcher
      .getAncestorScrollContainers(this.elementRef)[0]
      .scrollTo({ top: 0, behavior: 'auto' });
  }

  search() {
    this.toggleSearchService.click();
  }
}
