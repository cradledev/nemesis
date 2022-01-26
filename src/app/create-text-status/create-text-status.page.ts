import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-text-status',
  templateUrl: './create-text-status.page.html',
  styleUrls: ['./create-text-status.page.scss'],
})
export class CreateTextStatusPage  {

  @ViewChild('myInput') myInput;
  index=0;
  status="";
  colors=[
    "ed961c","60d471","b65043","a46eaf","909cd2","aae1ce","fe6e38","8374d1","ed6569","e1c02d"
  ]

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ModalController,
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTextStatusPage');
   
  }
  ionViewDidEnter(){
    setTimeout(()=>{
      document.getElementById('myInput').focus();
    },200)
  }
  change(){
    this.index= this.index+1;
    console.log(this.index);
    if(this.index==this.colors.length){
      this.index=0;
    }
  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }
  send(){
     this.viewCtrl.dismiss({text:this.status, color:this.colors[this.index]})
  }

  getTrim(v){
    let m = v.trim();
    if(m.length>0){
      return true;
    }
    else{
      return false;
    }

  }

}
