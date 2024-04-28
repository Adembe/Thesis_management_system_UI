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
import { AllThesis } from 'src/app/interfaces/allThesis';
import { ProcessTandSService } from 'src/app/services/processTandS.service';
@Component({
    selector: 'app-process-teacher',
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
    templateUrl: './process-teacher.component.html',
    styleUrl: './process-teacher.component.scss',
})
export class ProcessTeacherComponent {
    thesis: any = {};
    thesises: AllThesis[] = [];
    showThesis: AllThesis[] = [];
    showProcessDialog: boolean = false;
    processDetail: any[] = [];
    deleteProductDialog: boolean = false;
    selectedDetail: any;
    deleteProductsDialog: boolean = false;
    text: string;
    products: Product[] = [];

    product: Product = {};

    selectedThesis: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    process1: any;
    constructor(
        private messageService: MessageService,
        private processTandService: ProcessTandSService
    ) {}

    ngOnInit(): void {
        if (Number(localStorage.getItem('type')) == 2) {
            this.processTandService
                .getProcessTeaacher(localStorage.getItem('user_id'))
                .subscribe((data: any) => {
                    console.log('data: ', data);
                    this.thesises = data.body;
                    console.log(this.thesises);
                });
        } else {
            this.processTandService.getProcessAll().subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
                console.log(this.thesises);
            });
        }
    }

    editProcess(thesis) {
        this.thesis = thesis;
        this.showProcessDialog = true;
    }

    saveProcessOne() {
        const body = {
            id: this.thesis.id,
            process1: Number(this.process1),
        };
        console.log('body', body);
        this.processTandService.updateFeedback(body).subscribe((response) => {
            console.log('data: ', response);
            if (response.status === true) {
                this.ngOnInit();
                this.showProcessDialog = false;
            }
        });
    }
}
