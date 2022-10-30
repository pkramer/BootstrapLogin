import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Account } from '../../../_interfaces/account.model';

@Component({
  selector: 'app-student-accounts',
  templateUrl: './student-accounts.component.html',
  styleUrls: ['./student-accounts.component.css']
})
export class StudentAccountsComponent implements OnInit {
  @Input() accounts: Account[];
  @Output() onAccountClick: EventEmitter<Account> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAccountClicked = (account: Account) => {
    this.onAccountClick.emit(account);
  }
}