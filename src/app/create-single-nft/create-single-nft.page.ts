import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
// import { ContractService } from '../contract.service';
import Web3 from 'web3';
import { $ } from 'protractor';
import { ActionSheetController } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-create-single-nft',
  templateUrl: './create-single-nft.page.html',
  styleUrls: ['./create-single-nft.page.scss'],
})
export class CreateSingleNftPage implements OnInit {
  email: string;
  web3: any;
  wallet_address: string;
  ethereum: any;
  name:any;
  description:any;
  royalties:any;
  put_sale_toggle:any;
  createwallet: boolean = false;
  hideaddress:boolean = true;
  instant_sale:boolean = false;
  createwalletmodal:boolean = false;
  fixed_price :boolean = false;
  timed_auction :boolean = false;
  put_toggle_error:boolean = false;
  name_error:boolean = false;
  description_error:boolean = false;
  royalties_error:boolean = false;
  webby3:any;
  imagePath: string;
  assetUrl: any;
  walletmodal:boolean = false;
  constructor(
    public api:ApiService,private route: Router,
    public actionSheetController:ActionSheetController,
    public utils:UtilsService,
    public camera:Camera
  ) {
    this.ethereum = (window as any).ethereum;
    this.webby3 = (window as any).web3;
    if (typeof this.ethereum == 'undefined') {
     console.log('Please install MetaMask extension');
      return;
   }
   try {
        let x = this.ethereum.enable();
        // this.web3 = new Web3(this.ethereum)
        console.log('ethereum enabled=>', x);
    }catch(err) {
        console.log('err=>', err);
        if (err.code == 4001) {
          console.log('User denied account access..');
          return;
        }
    }
    // this.wallet_address = "0x23wer2342342";
    if(this.wallet_address == undefined){
      this.createwallet = true;
      this.hideaddress = false;
    }
    else{
      this.createwallet = false;
      this.hideaddress = true;
    }

  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  closewalletModal(){
    this.hideaddress = true;
    this.createwallet = false;
    this.createwalletmodal = false;
  }
  update_instant(event){
    this.instant_sale = event.detail.checked;
    this.fixed_price = event.detail.checked;
    this.timed_auction = false;
  }
  toggle_fixed(){
    this.fixed_price = true;
    this.timed_auction = false;
  }
  toggle_auction(){
    this.fixed_price = false;
    this.timed_auction = true;
  }
  creat_collectible(){
    let name = this.name;
    let description = this.description;
    let royalties = this.royalties;
    let put_sale = this.put_sale_toggle;
    if(put_sale == undefined){
      this.put_toggle_error = true;
      return false;
    }
    else{
      this.put_toggle_error = false;
    }
    if(name == undefined){
      this.name_error = true
      return false;
    }
    else{
      this.name_error = false
    }
    if(description == undefined){
      this.description_error = true;
      return false;
    }
    else{
      this.description_error = false;
    }
    if(royalties == undefined){
      this.royalties_error = true;
      return false;
    }else{
      this.royalties_error = false;
    }

    var walletData={
      account:this.email
    }

    this.api.postRequest('/createWallet',walletData).then((res)=>{
      var collectibleData={
        account: this.email,
      //assertUri: this.assetUrl,
      assertUri:'https://firebasestorage.googleapis.com/v0/b/nemesis-d3a6e.appspot.com/o/profileImages%2F1588439570.jpg?alt=media&token=44f05ce7-50ce-4cea-99e7-f746d785e8bc',
      collectName:this.name,
      collectDescription:this.description,
      collectCategory:"Photo",
      "askingPrice": 100,
      onSale: this.put_sale_toggle,
  
      }
  
      this.api.postRequest('/addCollectible',collectibleData).then((res:any)=>{
        debugger;
        if(res.status==='success'){
          this.route.navigate(['/nft-home']);
          this.utils.createToast('Collectible Created Successfully!');
        }
        else{
          this.utils.createToast(res.message);
        }
        
      })
    })

    
    
    
  }

  async pictureClick() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an option',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            console.log('Camera clicked');
            this.openCamera(1);
          }
        }, {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            console.log('Gallery clicked');
            this.openCamera(2);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  

  saveImage() {
    var self = this;
    self.utils.presentLoading();
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`profileImages/${filename}.jpg`);

    imageRef.putString(self.imagePath, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then((url) => {
        self.assetUrl = url;
      });
    });
  }

 

  openCamera(src) {
    var self = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: self.camera.DestinationType.DATA_URL,
      encodingType: self.camera.EncodingType.JPEG,
      mediaType: self.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: src,
      allowEdit: true
    }

    self.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      self.imagePath = base64Image;
      this.saveImage();
    }, (err) => {
      alert(err);
    });
  }
  createOrganization(){
    var data={
      account:this.email
    }
   this.api.postRequest('/createWallet',data).then((res)=>{
     debugger;
   })
  }

}