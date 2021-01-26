import { Attribute, Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  @ViewChild(MatSidenav) SideNav!: MatSidenav;

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
    private router: Router
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

  setTitle(option: string) {
    this.title = option;
    if (this.SideNav.mode === 'over') {
      this.SideNav.close();
    }
  }
}
