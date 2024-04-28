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
import { ThesisService } from 'src/app/services/thesis.service';
import { AllThesis } from 'src/app/interfaces/allThesis';
import { StudentService } from 'src/app/services/student.service';

@Component({
    selector: 'app-student',
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
    templateUrl: './student.component.html',
    styleUrl: './student.component.scss',
})
export class StudentComponent implements OnInit {
    thesis: AllThesis = {};
    thesises: AllThesis[] = [];
    showThesis: AllThesis[] = [];

    showRegDialog: boolean = false;

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
        private studentService: StudentService
    ) {}

    ngOnInit(): void {
        this.studentService.getConfThesis().subscribe((data: any) => {
            console.log('data: ', data);
            this.thesises = data.body;
            console.log(this.thesises);
        });
    }

    myShowReqModul() {
        this.product = {};
        this.submitted = false;
        this.showRegDialog = true;
        this.studentService
            .myShowRequest(localStorage.getItem('user_id'))
            .subscribe((data: any) => {
                console.log('data: ', data);
                this.showThesis = data.body;
                console.log(this.showThesis);
            });
    }

    deleteselectedThesis() {
        this.deleteProductsDialog = true;
    }

    Sentrequest(thesis) {
        this.submitted = true;

        const body = {
            thesis_id: thesis.id,
            student_id: Number(localStorage.getItem('user_id')),
            teacher_id: thesis.teacher_id,
        };
        console.log('body', body);

        this.studentService.updateReqThesis(body).subscribe((response) => {
            console.log('fsefsef', response);
            if (response.status === true) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
                this.ngOnInit();
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Warning',
                    detail: response.message,
                    life: 3000,
                });
            }
        });
        this.thesis = {};
        this.showRegDialog = false;
    }
}
