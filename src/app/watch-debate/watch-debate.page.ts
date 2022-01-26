import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-debate',
  templateUrl: './watch-debate.page.html',
  styleUrls: ['./watch-debate.page.scss'],
})
export class WatchDebatePage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  toSpeakNext(){
    this.router.navigate(['/next-to-speak'])
  }

}
