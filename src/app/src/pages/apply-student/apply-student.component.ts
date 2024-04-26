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
import { ProcessService } from 'src/app/services/process.service';
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
        private thesisService: ThesisService,
        private processService: ProcessService
    ) {}

    ngOnInit(): void {
        this.thesisService
            .getRequestStudents(localStorage.getItem('user_id'))
            .subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
            });
    }

    comfirmReguest(thesis, request) {
        console.log('-----------------------', thesis);
        this.submitted = true;

        const body = {
            thesis_id: thesis.id,
            status: 3,
            teacher_id: Number(localStorage.getItem('user_id')),
            student_id: request.id,
        };
        console.log('body', body);
        this.processService.insertComfirmRequest(body).subscribe((response) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: response.message,
                life: 3000,
            });

            if (response.status === true) {
            }
        });
        this.thesis = {};
        this.thesisDialog = false;
    }
}
