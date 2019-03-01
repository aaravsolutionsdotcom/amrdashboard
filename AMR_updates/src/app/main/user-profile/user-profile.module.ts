import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserProfileComponent, ConfirmUpdatepasswordAction, UpdatePasswordDialogComponent } from './user-profile.component';
import { CommonModule } from '@angular/common';

const routes = [
    {
        path     : 'user-profile',
        component: UserProfileComponent,
    }
];

@NgModule({
    declarations: [
        UserProfileComponent,
        ConfirmUpdatepasswordAction,
        UpdatePasswordDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FuseSharedModule,
        CommonModule
    ],
    entryComponents: [ConfirmUpdatepasswordAction,UpdatePasswordDialogComponent]
})
export class UserModule
{
}
