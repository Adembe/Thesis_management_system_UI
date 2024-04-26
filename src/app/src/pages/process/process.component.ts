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
import { ProcessService } from 'src/app/services/process.service';
@Component({
    selector: 'app-process',
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
    templateUrl: './process.component.html',
    styleUrl: './process.component.scss',
})
export class ProcessComponent {
    thesis: AllThesis = {};
    thesises: AllThesis[] = [];
    showThesis: AllThesis[] = [];
    var;
    showProcessDialog: boolean = false;

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
        private processService: ProcessService
    ) {}

    ngOnInit(): void {
        if (Number(localStorage.getItem('type')) == 0) {
            this.processService
                .getProcessStudent(localStorage.getItem('user_id'))
                .subscribe((data: any) => {
                    console.log('data: ', data);
                    this.thesises = data.body;
                    console.log(this.thesises);
                });
        } else if (Number(localStorage.getItem('type')) == 2) {
            this.processService
                .getProcessTeaacher(localStorage.getItem('user_id'))
                .subscribe((data: any) => {
                    console.log('data: ', data);
                    this.thesises = data.body;
                    console.log(this.thesises);
                });
        } else {
            this.processService.getProcessAll().subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
                console.log(this.thesises);
            });
        }
    }

    editProcess() {
        this.product = {};
        this.submitted = false;
        this.showProcessDialog = true;
    }
}
