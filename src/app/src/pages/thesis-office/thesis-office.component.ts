import { Component } from '@angular/core';
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
import { Table, TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { AllThesis } from 'src/app/interfaces/allThesis';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ThesisOfficeService } from 'src/app/services/thesisOffice.service';

@Component({
    selector: 'app-thesis-office',
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
    templateUrl: './thesis-office.component.html',
    styleUrl: './thesis-office.component.scss',
})
export class ThesisOfficeComponent {
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
        private thesisOffiveService: ThesisOfficeService
    ) {}

    ngOnInit(): void {
        this.thesisOffiveService.getThesis().subscribe((data: any) => {
            console.log('data: ', data);
            this.thesises = data.body;
            console.log(this.thesises);
        });
    }

    deleteselectedThesis() {
        this.deleteProductsDialog = true;
    }

    UnConfirmOffThesis(thesis) {
        const body = {
            id: thesis.id,
            status: 0,
            teacher_id: thesis.teacher_id,
            mgl_name: thesis.mgl_name,
            eng_name: thesis.eng_name,
            content: thesis.content,
            requirement: thesis.requirement,
        };

        this.submitted = true;
        this.thesisOffiveService.updateThesis(body).subscribe((response) => {
            console.log('response: ', response);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: response.message,
                life: 3000,
            });
            this.ngOnInit();
        });
        this.thesis = {};
        this.thesisDialog = false;
    }
    comfirmOffThesis(thesis) {
        this.submitted = true;

        const body = {
            id: thesis.id,
            status: 2,
            teacher_id: thesis.teacher_id,
            mgl_name: thesis.mgl_name,
            eng_name: thesis.eng_name,
            content: thesis.content,
            requirement: thesis.requirement,
        };
        console.log(body);

        this.thesisOffiveService.updateThesis(body).subscribe((response) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: response.message,
                life: 3000,
            });

            this.ngOnInit();
        });
        this.thesis = {};
        this.thesisDialog = false;
    }
}
