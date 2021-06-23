import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reserva } from './model/reserva.model';
import { ReservaService } from './service/reserva.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tableGame: boolean = false;
  reservaModel: Reserva;
  reservaForm: FormGroup;
  isChecked = true;
  showMsg: boolean = false;
  title = 'chacara-angular';
  panelOpenState = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private reservaService: ReservaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      inputTypeEvent: [null], inputConv: [null], inputDay: [null], inputHour: [null]
    });
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  handleChange(evt:boolean) {
    this.tableGame= evt;
    console.log('eventooooo')
    console.log(evt);
  }


  reserve() {
    if (this.reservaModel != null && this.reservaModel.id != null) {
      this.reservaModel.typeEvent = this.reservaForm.get('inputTypeEvent')?.value;
      this.reservaModel.day = this.reservaForm.get('inputDay')?.value;
      this.reservaModel.hour = this.reservaForm.get('inputHour')?.value;
      this.reservaModel.qtdPerson = this.reservaForm.get('inputConv')?.value;
      this.reservaModel.tableGame = this.tableGame;

      return this.reservaService.reserveDate(this.reservaModel).subscribe((data: Reserva) => { this.reservaModel = data }, (err) => { console.log(err) });
    }
    this.showMsg = true;
  }

}
