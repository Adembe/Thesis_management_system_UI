import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        CommonModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
    ],
    providers: [MessageService, UserService],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {
    user: User = {};
    users: User[] = [];
    roles: any[] = [];
    programm: any[] = [];
    usersDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedThesis: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private messageService: MessageService,
        private userService: UserService
    ) {
        this.roles = [
            { name: 'Оюутан', type: 0 },
            { name: 'Сургалтын алба', type: 1 },
            { name: 'Багш', type: 2 },
        ];

        this.programm = [
            { name: 'Программ хангамж', code: 0 },
            { name: 'Мэдээллийн технологи', code: 1 },
            { name: 'Мэдээллийн систем', code: 2 },
            { name: 'Компьютерийн ухаан', code: 3 },
        ];
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe((data: any) => {
            console.log('data: ', data);
            this.users = data.body;
        });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.usersDialog = true;
    }

    deleteselectedThesis() {
        this.deleteProductsDialog = true;
    }

    editThesis(user: User) {
        console.log('users:', user);
        this.user = { ...user };
        this.usersDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(
            (val) => !this.selectedThesis.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedThesis = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(
            (val) => val.id !== this.product.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
        this.product = {};
    }

    hideDialog() {
        this.usersDialog = false;
        this.submitted = false;
    }

    saveUser(isUpdate: boolean) {
        console.log(isUpdate);
        this.submitted = true;

        const body: User = {
            id: this.user.id,
            type: this.user.type,
            programm: this.user.programm,
            fname: this.user.fname,
            lname: this.user.lname,
            email: this.user.email,
            password: this.user.password,
            phone_number: this.user.phone_number,
        };
        this.userService.updateUser(body).subscribe((response) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: response.message,
                life: 3000,
            });
            if (response.status === true) {
                this.ngOnInit();
            }
        });
        this.user = {};
        this.usersDialog = false;
    }

    deleteUser(user) {
        this.submitted = true;
        this.userService.deleteUser(user.id).subscribe((response) => {
            console.log('response: ', response);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: response.message,
                life: 3000,
            });
            if (response.status === true) {
                this.users = [...response.body];
            }
        });

        console.log('this.selectedThesis: ', this.selectedThesis);
        this.user = {};
        this.usersDialog = false;
    }
}
