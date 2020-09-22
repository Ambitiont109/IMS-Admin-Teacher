import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject, Observable, Subscription } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { AuthService } from "../../../auth.service";
import { UsersService } from "../../../@core/services/users.service";
import { User, USERROLE } from "../../../@core/models/user";
import { TranslateService } from '@ngx-translate/core';
import { ChildService } from '../../../@core/services/child.service';
import { NameOfClass } from '../../../@core/models/child';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  title:string = "Admin Center";
  userPictureOnly: boolean = false;
  user: User;
  currentClassName:NameOfClass;
  private classNameSubscription:Subscription;
  private currentUserSubscription:Subscription;
  selectedCountryCode = 'gb';
  countryCodes = ['gb', 'fr'];
  
  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    let lang;
    if(value =='gb')
    {
      this.translateSerivce.use('en');      
      localStorage.setItem('lang','en')
    } else {
      this.translateSerivce.use(value);
      localStorage.setItem('lang',value)
    }
  }
  userMenu = [ 
               {title:'Profile', url:'/profile', icon:{icon:'address-card', pack:'fa'}},
               { title: 'Log out', icon:'log-out-outline' }
             ];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService:AuthService,
    private layoutService: LayoutService,
    private userService: UsersService,
    private childService:ChildService,
    private translateSerivce: TranslateService,
    private router:Router,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
  ) {
  }

  ngOnInit() {
    let lang = localStorage.getItem('lang')
    if(lang){
      this.translateSerivce.use(lang);      
      this.selectedCountryCode = lang;
      if(lang =='en')
        this.selectedCountryCode = 'gb';
    }
      
    this.classNameSubscription = this.childService.currentClassNameSubject.subscribe(name=>{
      this.currentClassName = name;
    });
    this.currentUserSubscription = this.userService.currentUserSubject.subscribe(user=>{
      this.user = user;
    })
    this.currentClassName = this.childService.getCurrentClassName();
    this.userService.getCurrentUser().subscribe((user:User)=>{
      if(user.role == USERROLE.Admin)
        this.title = "Admin Center";
      if(user.role == USERROLE.Teacher)
        this.title = "Teacher Center";
    })
    this.menuService.onItemClick
    this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'my-profile-tag'),
      map(({ item: { title } }) => title),
    ).subscribe(title=>{
      console.log(title);
      if(title == 'Log out'){
        this.authService.logout();
      }
    })
    this.userService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user:User)=>{
        this.user = user;
      })
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);
 
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.classNameSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }

  navigateToChooseName(){
    
    this.router.navigate(['/choose/classname']);
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
  onNotification(){
    alert("Notificaiton")
  }
  logout(){
    this.authService.logout();
  }
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
