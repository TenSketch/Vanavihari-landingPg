import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
const mediaConstraints = {
  audio: true,
  video: { width: 720, height: 540 }
};
const configuration = {
  iceServers: [
    {
      urls: 'stun:192.168.43.38',
    },
    {
      urls: 'turn:192.168.43.38',
      username: 'balaVkyc',
      credential: '090909',
    },
  ],
};
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements AfterViewInit {
  private localstream: MediaStream;
  private remoteStream: MediaStream; // Add this
  private peerConnection: RTCPeerConnection; // Add this
  private dataChannel: RTCDataChannel; // Add this
  @ViewChild('local_video') localVideo: ElementRef;
  @ViewChild('remote_video') remoteVideo: ElementRef; // Reference to the remote video element
  chatMessages: string[] = []; // An array to store chat messages
  messageToSend: string = ''; // Input field for sending messages
  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    this.requestMediaDevices();
  }
  private async requestMediaDevices(): Promise<void> {
    this.localstream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.remoteVideo.nativeElement.srcObject = this.localstream;
    this.localVideo.nativeElement.srcObject = this.localstream;
    this.initPeerConnection();
  }
  private initPeerConnection() {
    this.peerConnection = new RTCPeerConnection(configuration);
    // Add local audio and video tracks to the peer connection
    this.localstream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localstream);
    });
    // Set up your event listeners for signaling, ice candidate exchange, etc.
    // Set up the data channel
    this.dataChannel = this.peerConnection.createDataChannel('chat');
    this.dataChannel.onmessage = (event) => {
      this.handleReceivedMessage(event.data);
    };
  }
  startLocalVideo(): void {
    this.localstream.getTracks().forEach(track => {
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.localstream;
  }
  // Function to send a chat message
  sendMessage() {
    const message = this.messageToSend.trim();
    if (message !== '') {
      this.dataChannel.send(message);
      this.chatMessages.push(`You: ${message}`);
      this.messageToSend = '';
    }
  }
  // Function to handle received chat messages
  handleReceivedMessage(message: string) {
    this.chatMessages.push(`Remote: ${message}`);
  }
  // Function to set the remote stream to the video element
  setRemoteStream(stream: MediaStream) {
    this.remoteStream = stream;
    this.remoteVideo.nativeElement.srcObject = stream;
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToCallerDetails() {
    console.log("called details clicked");
    this.router.navigate(['/caller-details']);
  }
  // new vidoe call scripts
  isRecording: boolean = false;
  isMuted: boolean = false;
  isVideoOff: boolean = false;
  toggleRecord() {
    this.isRecording = !this.isRecording;
    // Implement recording functionality here
  }
  takeSnapshot() {
    // this.isRecording = !this.isRecording;
    // Implement recording functionality here
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    // Implement mute/unmute functionality here
  }
  toggleVideo() {
    this.isVideoOff = !this.isVideoOff;
    // Implement video on/off functionality here
  }
  switchCamera() {
    // Implement camera switching functionality here
  }
  endCall() {
    // Implement end call functionality here
  }
  isPageContent75Width: boolean = false;
  isAuditPaneActive: boolean = false;
  isProfilePaneActive: boolean = false;
  isChatPaneActive: boolean = false;
 
  toggleAudit() {
    // keep audit open onload
    this.isAuditPaneActive = !this.isAuditPaneActive;
    this.isProfilePaneActive = false;
    this.isChatPaneActive = false;
  
    // Toggle isPageContent75Width only if it's currently false
    if (!this.isPageContent75Width) {
      this.isPageContent75Width = true;
    } else {
      // Toggle it to false when no pane is active
      if (!this.isAuditPaneActive && !this.isProfilePaneActive && !this.isChatPaneActive) {
        this.isPageContent75Width = false;
      }
    }
  }
  
  toggleProfile() {
    this.isProfilePaneActive = !this.isProfilePaneActive;
    this.isAuditPaneActive = false;
    this.isChatPaneActive = false;
  
    // Toggle isPageContent75Width only if it's currently false
    if (!this.isPageContent75Width) {
      this.isPageContent75Width = true;
    } else {
      // Toggle it to false when no pane is active
      if (!this.isAuditPaneActive && !this.isProfilePaneActive && !this.isChatPaneActive) {
        this.isPageContent75Width = false;
      }
    }
  }
  
  toggleChat() {
    this.isChatPaneActive = !this.isChatPaneActive;
    this.isAuditPaneActive = false;
    this.isProfilePaneActive = false;
  
    // Toggle isPageContent75Width only if it's currently false
    if (!this.isPageContent75Width) {
      this.isPageContent75Width = true;
    } else {
      // Toggle it to false when no pane is active
      if (!this.isAuditPaneActive && !this.isProfilePaneActive && !this.isChatPaneActive) {
        this.isPageContent75Width = false;
      }
    }
  }
  
  
}
