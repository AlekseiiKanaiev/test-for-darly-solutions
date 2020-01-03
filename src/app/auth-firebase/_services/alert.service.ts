import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    private alert = new Subject<{type: string, message: string}>();
    private keepAfterNavagationChange = false;

    constructor(private router: Router) {
        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationStart) {
                    (this.keepAfterNavagationChange) ?
                        this.keepAfterNavagationChange = false :
                        this.alert.next();
                }
            }
        );
    }


    alertSuccess(message: string, keep = false) {
        this.keepAfterNavagationChange = keep;
        this.alert.next({type: 'success', message});
    }

    alertError(message: string, keep = false) {
        this.keepAfterNavagationChange = keep;
        this.alert.next({type: 'error', message});
    }

    getAlert() {
        return this.alert.asObservable();
    }
}
