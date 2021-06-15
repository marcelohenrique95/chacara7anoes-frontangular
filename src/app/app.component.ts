import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isChecked= true;
  showMsg: boolean = false;
  title = 'chacara-angular';
  panelOpenState = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  reserve(){
    this.showMsg = true;
  }

}
