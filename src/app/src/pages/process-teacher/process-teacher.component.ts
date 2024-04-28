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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllThesis } from 'src/app/interfaces/allThesis';
import { ProcessTandSService } from 'src/app/services/processTandS.service';
import { EditorModule } from 'primeng/editor';
import { lastValueFrom } from 'rxjs';
import { ProcessService } from 'src/app/services/process.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
        ReactiveFormsModule,
        EditorModule,
    ],
    providers: [MessageService],
    templateUrl: './process-teacher.component.html',
    styleUrl: './process-teacher.component.scss',
})
export class ProcessTeacherComponent {
    thesis: any = {};
    thesises: AllThesis[] = [];
    showThesis: AllThesis[] = [];
    showProcessTeacher: boolean = false;
    showProcessDialog: boolean = false;
    showRegDialog: boolean = false;
    showProcessAllDialog: boolean = false;
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
    public pdfUrl: SafeResourceUrl | null = null;
    isShowPButton = false;
    rowsPerPageOptions = [5, 10, 20];
    constructor(
        private messageService: MessageService,
        private processTandService: ProcessTandSService,
        private processService: ProcessService,
        private sanitizer: DomSanitizer
    ) {
        if (localStorage.getItem('type') == '2') {
            this.isShowPButton = true;
        } else {
            this.isShowPButton = false;
        }
    }

    async ngOnInit() {
        if (Number(localStorage.getItem('type')) == 2) {
            const res = await lastValueFrom(
                this.processTandService.getProcessTeaacher(
                    localStorage.getItem('user_id')
                )
            );

            console.log('res', res);
            if (res.status == true) {
                this.thesises = res.body;
            }
        } else {
            this.processTandService.getProcessAll().subscribe((data: any) => {
                console.log('data: ', data);
                this.thesises = data.body;
                console.log(this.thesises);
            });
        }
    }

    editProcess(thesis) {
        if (Number(localStorage.getItem('type')) == 2) {
            this.thesis = { ...thesis };
            this.showProcessDialog = true;
        } else {
            this.thesis = { ...thesis };
            this.showProcessAllDialog = true;
        }
    }
    hideDialog() {
        if (this.showProcessDialog == true) {
            this.showProcessDialog = false;
        } else {
            this.showProcessAllDialog = false;
        }
    }

    async openProcess(thesis) {
        const response = await lastValueFrom(
            this.processService.getProcessDetail(thesis.id)
        );
        if (response.status == true) {
            this.processDetail = response.body;
            this.messageService.add({
                severity: 'success',
                summary: 'Successfull',
                detail: response?.message,
                life: 3000,
            });
            console.log('this.processDetail', this.processDetail);
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: response?.message,
                life: 3000,
            });
        }

        this.thesis = { ...thesis };
        this.showProcessTeacher = true;
    }

    saveProcessOne(type) {
        if (type == 1) {
            const body = {
                id: this.thesis.id,
                process1: this.thesis.process1,
            };
            console.log('body', body);
            this.processTandService.updatePoint(body).subscribe((response) => {
                console.log('data: ', response);
                if (response.status === true) {
                    this.ngOnInit();
                    this.showProcessDialog = false;
                }
            });
        } else {
            const body = {
                id: this.thesis.id,
                process1: this.thesis.process1,
                process2: this.thesis.process2,
                process3: this.thesis.process3,
                process4: this.thesis.process4,
            };
            console.log('body', body);
            this.processTandService
                .updateAllPoint(body)
                .subscribe((response) => {
                    console.log('data: ', response);
                    if (response.status === true) {
                        this.ngOnInit();
                        this.showProcessAllDialog = false;
                    }
                });
        }
    }

    onRowSelect(event) {
        console.log('event-', event);
        console.log('selectedDetail-', this.selectedDetail);
        this.text = this.selectedDetail.feedback;
    }

    sentFeedback() {
        const body = {
            id: this.selectedDetail.id,
            feedback: this.text,
        };
        console.log(body);
        this.processTandService.updateFeedback(body).subscribe((response) => {
            if (response.status === true) {
                console.log('responsebody:', response.body);

                const item = this.processDetail.find(
                    (item) => item.id === this.selectedDetail.id
                );
                item.feedback = this.text;

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Successful',
                    detail: response.message,
                    life: 3000,
                });
            }
        });
    }

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
