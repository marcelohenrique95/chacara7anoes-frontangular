import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reserva } from './model/reserva.model';
import { PhotoComponent } from './screen/photo/photo.component';
import { ReservaService } from './service/reserva.service';

export interface PeriodicElement {
  name: string;
  position: number;
  data: number;
  price: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Casamento', data: 23.05, price: 'R$ 500,00'},
  {position: 2, name: 'Aniversário', data: 4.0026, price: 'R$ 770,00'},
  {position: 3, name: 'Chá de bebê', data: 6.941, price: 'R$ 900,00'},
  {position: 4, name: 'Retiro', data: 9.0122, price: 'R$ 570,00'},
  {position: 5, name: 'Aniversário', data: 10.811, price: 'R$ 500,00'},
  {position: 6, name: 'Casamento', data: 12.0107, price: 'R$ 570,00'},
  {position: 7, name: 'Nitrogen', data: 14.0067, price: 'R$ 870,00'},
  {position: 8, name: 'Retiro', data: 15.9994, price: 'R$ 600,00'},
  {position: 9, name: 'Retiro', data: 18.9984, price: 'R$ 420,00'},
  {position: 10, name: 'Aniversário', data: 20.1797, price: 'R$ 570,00'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  tableGame: boolean = false;
  durationInSeconds = 5;
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

  constructor(private reservaService: ReservaService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.reservaForm = this.fb.group({
      inputTypeEvent: [null], inputConv: [null], inputDay: [null], inputHour: [null]
    });
  }

  openNotify() {
    this.snackBar.open('Evento disponivel');
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
