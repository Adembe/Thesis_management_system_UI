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
        private studentService: StudentService
    ) {}

    ngOnInit(): void {
        this.studentService.getConfThesis().subscribe((data: any) => {
            console.log('data: ', data);
            this.thesises = data.body;
            console.log(this.thesises);
        });
    }

    deleteselectedThesis() {
        this.deleteProductsDialog = true;
    }

    // UnConfirmOffThesis(thesis) {
    //     const body = {
    //         id: thesis.id,
    //         status: 0,
    //         teacher_id: Number(localStorage.getItem('user_id')),
    //         mgl_name: thesis.mgl_name,
    //         eng_name: thesis.eng_name,
    //         content: thesis.content,
    //         requirement: thesis.requirement,
    //     };

    //     this.submitted = true;
    //     this.studentService.updateThesis(body).subscribe((response) => {
    //         console.log('response: ', response);
    //         this.messageService.add({
    //             severity: 'success',
    //             summary: 'Successful',
    //             detail: response.message,
    //             life: 3000,
    //         });
    //         this.ngOnInit();
    //     });
    //     this.thesis = {};
    //     this.thesisDialog = false;
    // }
    // comfirmOffThesis(thesis) {
    //     this.submitted = true;

    //     const body = {
    //         id: thesis.id,
    //         status: 2,
    //         teacher_id: Number(localStorage.getItem('user_id')),
    //         mgl_name: thesis.mgl_name,
    //         eng_name: thesis.eng_name,
    //         content: thesis.content,
    //         requirement: thesis.requirement,
    //     };
    //     console.log(body);

    //     this.studentService.updateThesis(body).subscribe((response) => {
    //         this.messageService.add({
    //             severity: 'success',
    //             summary: 'Successful',
    //             detail: response.message,
    //             life: 3000,
    //         });

    //         this.ngOnInit();
    //     });
    //     this.thesis = {};
    //     this.thesisDialog = false;
    // }
}
