import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CpanelComponent } from './cpanel.component';
import { CpanelNavbarComponent } from './components/cpanel-navbar/cpanel-navbar.component';
import { CpanelDataComponent } from './components/cpanel-data/cpanel-data.component';
import { CpanelRoutingModule } from './cpanel.routing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CircuitPanelComponent } from './components/circuits/circuit-panel/circuit-panel.component';
import { AddCircuitComponent } from './components/circuits/add-circuit/add-circuit.component';
import { UpdateCircuitComponent } from './components/circuits/update-circuit/update-circuit.component';
import { ShowCircuitComponent } from './components/circuits/show-circuit/show-circuit.component';
import { UserPanelComponent } from './components/users/user-panel/user-panel.component';
import { SchoolPanelComponent } from './components/schools/school-panel/school-panel.component';
import { ShowUserComponent } from './components/users/show-user/show-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ShowSchoolComponent } from './components/schools/show-school/show-school.component';
import { AddSchoolComponent } from './components/schools/add-school/add-school.component';
import { UpdateSchoolComponent } from './components/schools/update-school/update-school.component';
import { PersonPanelComponent } from './components/person/person-panel/person-panel.component';
import { ShowPersonComponent } from './components/person/show-person/show-person.component';
import { AddPersonComponent } from './components/person/add-person/add-person.component';
import { UpdatePersonComponent } from './components/person/update-person/update-person.component';
import { AssignPanelComponent } from './components/assigments/assign-panel/assign-panel.component';
import { EventsPanelComponent } from './components/events/events-panel/events-panel.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { UpdateEventComponent } from './components/events/update-event/update-event.component';
import { SchoolNecComponent } from './components/necesities/school-nec/school-nec.component';
import { PlanPanelComponent } from './components/plans/plan-panel/plan-panel.component';
import { AddPlanComponent } from './components/plans/add-plan/add-plan.component';
import { UpdatePlanComponent } from './components/plans/update-plan/update-plan.component';
import { EvidencePanelComponent } from './components/evidence/evidence-panel/evidence-panel.component';
import { AddEvidenceComponent } from './components/evidence/add-evidence/add-evidence.component';
import { DeparmentPanelComponent } from './components/deparments/deparment-panel/deparment-panel.component';
import { AddDeparmentComponent } from './components/deparments/add-deparment/add-deparment.component';
import { UpdateDeparmentComponent } from './components/deparments/update-deparment/update-deparment.component';
import { ActionsPanelComponent } from './components/Actions/actions-panel/actions-panel.component';
import { AddActionComponent } from './components/Actions/add-action/add-action.component';
import { UpdateActionComponent } from './components/Actions/update-action/update-action.component';
import { ViewPlanComponent } from './components/plans/view-plan/view-plan.component';
import { ViewSchoolComponent } from './components/schools/view-school/view-school.component';
import { ViewCircuitComponent } from './components/circuits/view-circuit/view-circuit.component';
import { ReportsComponent } from './components/reports/reports/reports.component';
import { ChartComponent } from './components/cpanel-data/chart/chart.component';
import { MatriculaPanelComponent } from './components/matricula/matricula-panel/matricula-panel.component';
import { AddMatriculaComponent } from './components/matricula/add-matricula/add-matricula.component';
import { UpdateMatriculaComponent } from './components/matricula/update-matricula/update-matricula.component';
import { ViewMatriculaComponent } from './components/matricula/view-matricula/view-matricula.component';
import { ChartsModule } from 'ng2-charts';





@NgModule({
  imports: [
    CommonModule,
    CpanelRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  declarations: [
    CpanelComponent, 
    CpanelNavbarComponent, 
    CpanelDataComponent, 
    SidebarComponent, 
    CircuitPanelComponent, 
    AddCircuitComponent, 
    UpdateCircuitComponent, 
    ShowCircuitComponent, 
    UserPanelComponent, 
    SchoolPanelComponent, 
    ShowUserComponent, 
    UpdateUserComponent, 
    AddUserComponent, 
    ShowSchoolComponent, 
    AddSchoolComponent, 
    UpdateSchoolComponent, 
    PersonPanelComponent, 
    ShowPersonComponent, 
    AddPersonComponent, 
    UpdatePersonComponent, 
    AssignPanelComponent, 
    EventsPanelComponent, 
    AddEventComponent, 
    UpdateEventComponent, 
    SchoolNecComponent, 
    PlanPanelComponent, 
    AddPlanComponent, 
    UpdatePlanComponent, 
    EvidencePanelComponent, 
    AddEvidenceComponent, 
    DeparmentPanelComponent, 
    AddDeparmentComponent, 
    UpdateDeparmentComponent, 
    ActionsPanelComponent, 
    AddActionComponent, 
    UpdateActionComponent, 
    ViewPlanComponent, 
    ViewSchoolComponent, 
    ViewCircuitComponent, 
    ReportsComponent, 
    ChartComponent, 
    MatriculaPanelComponent, 
    AddMatriculaComponent, 
    UpdateMatriculaComponent, 
    ViewMatriculaComponent
  ],
  exports: [
    CpanelComponent
  ]
})
export class CpanelModule { }
