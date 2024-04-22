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
import { Thesis } from 'src/app/interfaces/thesis';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { ThesisService } from 'src/app/services/thesis.service';
@Component({
    selector: 'app-apply-student',
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
    providers: [MessageService],
    templateUrl: './apply-student.component.html',
    styleUrl: './apply-student.component.scss',
})
export class ApplyStudentComponent {
    thesis: Thesis = {};
    thesises: Thesis[] = [];

    thesisDialog: boolean = false;

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
        private thesisService: ThesisService
    ) {}

    ngOnInit(): void {
        this.thesisService
            .getRequestStudents(localStorage.getItem('user_id'))
            .subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
            });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.thesisDialog = true;
    }

    deleteselectedThesis() {
        this.deleteProductsDialog = true;
    }

    editThesis(thesis: Thesis) {
        this.thesis = { ...thesis };
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

    saveThesis(isUpdate: boolean) {
        console.log(isUpdate);
        if (isUpdate === true) {
            this.submitted = true;

            const body = {
                id: this.thesis.id,
                status: 1,
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
            this.submitted = true;

            const body = {
                status: 1,
                teacher_id: Number(localStorage.getItem('user_id')),
                mgl_name: this.thesis.mgl_name,
                eng_name: this.thesis.eng_name,
                content: this.thesis.content,
                requirement: this.thesis.requirement,
            };
            console.log('body', body);
            this.thesisService.createThesis(body).subscribe((response) => {
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
}
