toggleAudit() {
    if (this.isPageContentFullWidth = false) {
      this.isPageContentFullWidth = true;
    }
    else {
      this.isPageContentFullWidth = true;

    }
    console.log(this.isPageContentFullWidth);
    if (this.isProfilePaneActive = true || (this.isChatPaneActive = true)) {
      this.isProfilePaneActive = false;
      this.isChatPaneActive = false;
      console.log(this.isProfilePaneActive && this.isChatPaneActive);
      this.isAuditPaneActive = !this.isAuditPaneActive;
    }
    else {
      this.isAuditPaneActive = !this.isAuditPaneActive;
    }

  }
  toggleProfile() {
    if (this.isPageContentFullWidth = false) {
      this.isPageContentFullWidth = true;
    }
    else {
      this.isPageContentFullWidth = true;
    }
    if ((this.isAuditPaneActive = true) || ((this.isChatPaneActive = true))) {
      this.isAuditPaneActive = false;
      this.isChatPaneActive = false;
      console.log(this.isChatPaneActive && this.isAuditPaneActive);
      this.isProfilePaneActive = !this.isProfilePaneActive;
    }
    else {
      this.isProfilePaneActive = !this.isProfilePaneActive;
    }
  }
  toggleChat() {
    if (this.isPageContentFullWidth = false) {
      this.isPageContentFullWidth = true;
    }
    else {
      this.isPageContentFullWidth = true;
    }
    if (this.isProfilePaneActive = true || (this.isAuditPaneActive = true)) {
      this.isAuditPaneActive = false;
      this.isProfilePaneActive = false;
      console.log(this.isProfilePaneActive && this.isAuditPaneActive);
      this.isChatPaneActive = !this.isChatPaneActive;
    }
    else {
      this.isChatPaneActive = !this.isChatPaneActive;
    }
    // this.isPageContentFullWidth = !this.isPageContentFullWidth;
  }