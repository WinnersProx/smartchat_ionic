import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../services/chats.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-chat-infos',
  templateUrl: './chat-infos.page.html',
  styleUrls: ['./chat-infos.page.scss'],
})
export class ChatInfosPage implements OnInit {
  private chats:any = [];
  constructor(private Chats : ChatsService, private Aroute : ActivatedRoute, private modal : ModalController, private params : NavParams){
    // injections
  }
  ngOnInit() {
    console.log(this.getCurrentFriend);
    //this.friendId = parseInt(this.Aroute.snapshot.paramMap.get('userId'));//route params
    this.chats = Object.values(this.Chats.getFriendChats(this.getCurrentFriend.id))[0];
    // get chat details 
  }
  get getCurrentFriend(){
    return this.params.get('chatInfos');
  }
  dismiss(){
    this.modal.dismiss().then(modal => {
      console.log("Modal dismissed");
    })
  }

  sendMessage(form){
    // calls the chats service new chat function and if successful subscribe to it
    this.Chats.newChat(form.chat, this.getCurrentFriend.id)
    .subscribe(res => {
      let date = new Date();
      let pel = document.createElement('div');
      pel.className = 'message outgoing';
      pel.innerText = form.chat;
      pel.setAttribute('_ngcontent-c4', '');
      let el = document.createElement('span');
      el.className = 'text-muted';
      el.innerText = `Now`;
      el.setAttribute('_ngcontent-c4', '');
      pel.appendChild(el);
      document.querySelector('div.messages').appendChild(pel);
     
    }, error => {
      console.error("Error caught : ", error);
    })
  }

}
