import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { ThesisComponent } from './thesis/thesis.component';
import { ThesisOfficeComponent } from './thesis-office/thesis-office.component';
import { AdminComponent } from './admin/admin.component';
import { ApplyStudentComponent } from './apply-student/apply-student.component';
import { ProcessComponent } from './process/process.component';
import { ProcessTeacherComponent } from './process-teacher/process-teacher.component';
const routes: Routes = [
    { path: 'student', component: StudentComponent },
    { path: 'order_admin', component: OrderAdminComponent },
    { path: 'thesis', component: ThesisComponent },
    { path: 'thesis-office', component: ThesisOfficeComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'apply-student', component: ApplyStudentComponent },
    { path: 'process', component: ProcessComponent },
    { path: 'process-teacher', component: ProcessTeacherComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
