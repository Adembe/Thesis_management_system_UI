import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { ThesisComponent } from './thesis/thesis.component';
import { ThesisOfficeComponent } from './thesis-office/thesis-office.component';
const routes: Routes = [
    { path: 'student', component: StudentComponent },
    { path: 'order_admin', component: OrderAdminComponent },
    { path: 'thesis', component: ThesisComponent },
    { path: 'thesis-office', component: ThesisOfficeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
