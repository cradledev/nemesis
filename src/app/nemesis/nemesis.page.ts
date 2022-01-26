import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nemesis',
  templateUrl: './nemesis.page.html',
  styleUrls: ['./nemesis.page.scss'],
})
export class NemesisPage implements OnInit {

  activeTab = 'cypher';

  constructor() { }

  ngOnInit() {
  }

}
