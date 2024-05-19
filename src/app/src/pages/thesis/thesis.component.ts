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
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

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
import { ThesisService } from 'src/app/services/thesis.service';
import { Thesis } from 'src/app/interfaces/thesis';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
    selector: 'app-thesis',
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
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        ProgressBarModule,
    ],
    providers: [MessageService],
    templateUrl: './thesis.component.html',
    styleUrl: './thesis.component.scss',
})
export class ThesisComponent {
    thesis: Thesis = {};
    thesises: Thesis[] = [];

    thesisDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedThesis: Product[] = [];
    exfired: any[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];
    cities: any[] | undefined;
    rowsPerPageOptions = [5, 10, 20];
    isUpdate = false;

    constructor(
        private messageService: MessageService,
        private thesisService: ThesisService
    ) {
        this.exfired = [
            { name: '2023-2024 Намар', code: '0' },
            { name: '2023-2024 Хавар', code: '1' },
        ];
    }

    onSeasonChange(event) {
        console.log('event', event);
        this.thesisService
            .getOwnThesis(localStorage.getItem('user_id'), event.value.code)
            .subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
            });
    }
    ngOnInit(): void {
        this.thesisService
            .getOwnThesis(localStorage.getItem('user_id'))
            .subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
            });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.isUpdate = false;
        this.thesisDialog = true;
    }

    deleteselectedThesis() {
        this.deleteProductsDialog = true;
    }

    editThesis(thesis: Thesis) {
        this.thesis = { ...thesis };
        this.isUpdate = true;
        this.thesisDialog = true;
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
        this.thesisDialog = false;
        this.submitted = false;
    }

    saveThesis() {
        this.submitted = true;
        if (
            !this.thesis.mgl_name ||
            !this.thesis.eng_name ||
            !this.thesis.content ||
            !this.thesis.requirement ||
            !this.thesis.exfired
        ) {
            return;
        }
        console.log(this.isUpdate);
        if (this.isUpdate === true) {
            const body = {
                id: this.thesis.id,
                status: this.thesis.status,
                teacher_id: Number(localStorage.getItem('user_id')),
                mgl_name: this.thesis.mgl_name,
                eng_name: this.thesis.eng_name,
                content: this.thesis.content,
                requirement: this.thesis.requirement,
            };
            console.log('body', body);
            this.thesisService.updateThesis(body).subscribe((response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
                if (response.status === true) {
                    console.log(response.body);
                    this.thesises = [...response.body];
                }
            });
            this.thesis = {};
            this.thesisDialog = false;
        } else {
            const body = {
                status: 1,
                teacher_id: Number(localStorage.getItem('user_id')),
                mgl_name: this.thesis.mgl_name,
                eng_name: this.thesis.eng_name,
                content: this.thesis.content,
                requirement: this.thesis.requirement,
                exfired: this.thesis.exfired,
            };
            console.log('body', body);
            this.thesisService.createThesis(body).subscribe((response) => {
                console.log('response: ', response);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
                if (response.status === true) {
                    this.thesises.push(response.body);
                }
            });
            this.thesis = {};
            this.thesisDialog = false;
        }
    }

    deleteThesis(thesis) {
        this.submitted = true;
        this.thesisService.deleteThesis(thesis.id).subscribe((response) => {
            console.log('response: ', response);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: response.message,
                life: 3000,
            });
            if (response.status === true) {
                this.thesises = [...response.body];
            }
        });

        console.log('this.selectedThesis: ', this.selectedThesis);
        this.thesis = {};
        this.thesisDialog = false;
    }

    deleteThesiss() {
        this.submitted = true;
        const ids = this.selectedThesis.map((i) => {
            return i.id;
        });

        this.thesisService
            .deleteAllThesiss({
                ids: ids,
            })
            .subscribe((response) => {
                console.log('response: ', response);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
                if (response.status === true) {
                    this.thesises = [...response.body];
                }
            });

        console.log('this.selectedThesis: ', this.selectedThesis);
        this.thesis = {};
        this.thesisDialog = false;
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
