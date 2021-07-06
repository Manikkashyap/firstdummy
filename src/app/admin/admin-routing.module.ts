import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { Route } from '@angular/compiler/src/core';
import { AdminComponent } from "./admin.component";
import { UserlistComponent } from "./userlist/userlist.component";
import { AdminlogoutComponent } from "./adminlogout/adminlogout.component";
import { LandingComponent } from "./landing/landing.component";
import { AuthGuard } from "../shared/auth.guard";

const adminrouting:Routes=[
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AuthGuard],
    children:[
    {
     path:'adminhome',
     component:LandingComponent
    },
    {
      path:'userlist',
      component:UserlistComponent
    },
    {
      path:'adminlogout',
      component:AdminlogoutComponent
    }
  ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(adminrouting)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}
