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
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    Validators,
} from '@angular/forms';
import { AllThesis } from 'src/app/interfaces/allThesis';
import { ProcessService } from 'src/app/services/process.service';
import { lastValueFrom } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from 'primeng/editor';
import Quill from 'quill';
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
        FormsModule,
        ReactiveFormsModule, // Add ReactiveFormsModule here
        EditorModule,
    ],
    providers: [MessageService],
    templateUrl: './process.component.html',
    styleUrl: './process.component.scss',
})
export class ProcessComponent {
    thesis: AllThesis = {};
    thesises: AllThesis[] = [];
    showThesis: AllThesis[] = [];
    processDetail: any[] = [];
    showProcessDialog: boolean = false;
    formGroup: FormGroup | undefined;
    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedThesis: Product[] = [];

    submitted: boolean = false;
    showRegDialog: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    public pdfUrl: SafeResourceUrl | null = null;
    text: string;
    constructor(
        private messageService: MessageService,
        private processService: ProcessService,
        private sanitizer: DomSanitizer,
        private fb: FormBuilder
    ) {}
    async ngOnInit() {
        // var quill = new Quill('#editor-container', {
        //     theme: 'snow',
        // });
        if (Number(localStorage.getItem('type')) == 0) {
            const res = await lastValueFrom(
                this.processService.getProcessStudent(
                    localStorage.getItem('user_id')
                )
            );
            console.log('res', res);
            if (res.status == true) {
                this.thesis = res.body;
                console.log('thsis', this.thesis);
                const res1 = await lastValueFrom(
                    this.processService.getProcessDetail(this.thesis[0].id)
                );
                if (res1.status == true) {
                    this.processDetail = res1.body;
                }
            }
            // .subscribe((data: any) => {
            //     console.log('data: ', data);
            //     this.thesis = data.body;
            //     console.log(this.thesises);
            // });
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

    onBasicUploadAuto(event) {
        console.log('event: ', event);
        const file: File = event.files[0];
        console.log('thesis : ', this.thesis);
        const formData = new FormData();
        if (file) {
            formData.append('pdf', file);
            formData.append('processId', this.thesis[0].id.toString());
            formData.append('thesisId', this.thesis[0].thesis_id.toString());
            formData.append('studentId', this.thesis[0].student_id.toString());
            formData.append('teacherId', this.thesis[0].teacher_id.toString());
            formData.append('fileName', file.name);
        }
        this.processService
            .insertProcessDetail(formData)
            .subscribe((response) => {
                if (response.status === true) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Success',
                        detail: 'File Uploaded with Basic Mode',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Success',
                        detail: 'File Uploaded with Basic Mode',
                    });
                }
            });
    }

    // This function converts a byte array to a Blob
    convertByteArrayToBlob(byteArray: Uint8Array, contentType: string): Blob {
        return new Blob([byteArray], { type: contentType });
    }

    generateFileUrl(byteArray: Uint8Array, contentType: string): string {
        const blob = this.convertByteArrayToBlob(byteArray, contentType);
        const url = URL.createObjectURL(blob);
        return url;
    }
    base64ToArrayBuffer(base64: string) {
        const binaryString = window.atob(base64); // Decode base64
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    sanitizeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    ViewPdf(file) {
        console.log(file);
        console.log('sefsefsefe', new Uint8Array(file.pdf_detail));

        this.showRegDialog = true;
        const arrayBuffer = this.base64ToArrayBuffer(file.pdf_detail);
        this.pdfUrl = this.sanitizeUrl(
            this.generateFileUrl(new Uint8Array(arrayBuffer), 'application/pdf')
        );

        console.log('this.pdfUrl', this.pdfUrl);
    }
}
