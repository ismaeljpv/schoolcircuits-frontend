import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpanelComponent } from './cpanel.component';
import { CpanelDataComponent } from './components/cpanel-data/cpanel-data.component';
import { CircuitPanelComponent } from './components/circuits/circuit-panel/circuit-panel.component';
import { SchoolPanelComponent } from './components/schools/school-panel/school-panel.component';
import { UserPanelComponent } from './components/users/user-panel/user-panel.component';
import { AddCircuitComponent } from './components/circuits/add-circuit/add-circuit.component';
import { UpdateCircuitComponent } from './components/circuits/update-circuit/update-circuit.component';
import { ShowCircuitComponent } from './components/circuits/show-circuit/show-circuit.component';
import { ShowUserComponent } from './components/users/show-user/show-user.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { AddSchoolComponent } from './components/schools/add-school/add-school.component';
import { UpdateSchoolComponent } from './components/schools/update-school/update-school.component';
import { ShowSchoolComponent } from './components/schools/show-school/show-school.component';
import { PersonPanelComponent } from './components/person/person-panel/person-panel.component';
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
import { AddMatriculaComponent } from './components/matricula/add-matricula/add-matricula.component';
import { UpdateMatriculaComponent } from './components/matricula/update-matricula/update-matricula.component';
import { MatriculaPanelComponent } from './components/matricula/matricula-panel/matricula-panel.component';
import { ViewMatriculaComponent } from './components/matricula/view-matricula/view-matricula.component';

const rutas: any = [
     {path: "", component:CpanelDataComponent},
     {path:"circuits", component:CircuitPanelComponent},
     {path:"schools", component: SchoolPanelComponent},
     {path:"users", component: UserPanelComponent},
     {path:"add-circuit", component: AddCircuitComponent},
     {path:"update-circuit/:id", component: UpdateCircuitComponent},
     {path:"show-circuit/:id", component: ShowCircuitComponent},
     {path:"show-user/:id", component: ShowUserComponent},
     {path:"update-user/:id", component: UpdateUserComponent},
     {path:"add-user", component: AddUserComponent},
     {path:"add-school", component: AddSchoolComponent},
     {path:"update-school/:id", component: UpdateSchoolComponent},
     {path:"show-school/:id", component: ShowSchoolComponent},
     {path:"persons", component: PersonPanelComponent},
     {path:"add-person", component: AddPersonComponent},
     {path:"update-person/:id", component: UpdatePersonComponent},
     {path:"assigments/:id", component: AssignPanelComponent},
     {path:"events", component: EventsPanelComponent},
     {path:"add-event", component: AddEventComponent},
     {path:"update-event/:id", component:UpdateEventComponent},
     {path:"schoolNec/:id", component: SchoolNecComponent},
     {path:"plans", component: PlanPanelComponent},
     {path:"add-plan", component: AddPlanComponent},
     {path:"update-plan/:id", component: UpdatePlanComponent},
     {path:"evidence/:id", component: EvidencePanelComponent},
     {path:"add-evidence/:id", component: AddEvidenceComponent},
     {path:"deparment/:id", component: DeparmentPanelComponent},
     {path:"add-deparment/:id", component: AddDeparmentComponent},
     {path:"update-deparment/:id", component: UpdateDeparmentComponent},
     {path:"actions/:id", component: ActionsPanelComponent},
     {path:"add-action/:id", component: AddActionComponent},
     {path:"update-action/:id", component:UpdateActionComponent},
     {path:"plan/:id", component: ViewPlanComponent},
     {path:"school/:id", component: ViewSchoolComponent},
     {path:"circuit/:id", component: ViewCircuitComponent},
     {path:"reports", component: ReportsComponent},
     {path:"matricula", component: MatriculaPanelComponent},
     {path:"add-matricula", component: AddMatriculaComponent},
     {path:"update-matricula/:id", component: UpdateMatriculaComponent},
     {path:"view-matricula/:id", component: ViewMatriculaComponent}
    
]

const routes: Routes = [
    {path: '', component: CpanelComponent, children: rutas }
]


@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
    declarations: []
})
export class CpanelRoutingModule { }