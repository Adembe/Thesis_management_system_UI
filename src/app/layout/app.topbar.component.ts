import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    menuItems!: MenuItem[];
    Profile:any
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public router: Router) {
        this.Profile = localStorage.getItem("user_name")
        this.menuItems = [
            {
                label: 'Профайл',
                icon: 'pi pi-fw pi-check',
            },
            {
                label: 'Заавар',
                icon: 'pi pi-fw pi-refresh',
            },
            {
                label: 'Тохиргоо',
                icon: 'pi pi-fw pi-trash',
            },
            {
                separator: true,
            },
            {
                label: 'Гарах',
                icon: 'pi pi-fw pi-home',
                command: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('type');
                    this.router.navigate(['/auth/login']);
                },
            },
        ];
    }
}
