import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  alert: {type: string, message: string};

  constructor(private alertServ: AlertService) { }

  ngOnInit() {
    this.subs = this.alertServ.getAlert().subscribe(
      alert => {
        this.alert = alert;
      }
    );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
