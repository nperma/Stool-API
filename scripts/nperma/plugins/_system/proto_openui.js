let handler = ev => ev;

handler.static = (mc,{ui}) => {
  ui.ActionFormData.prototype.open = async function(player) {
    while(true) {
      const f = await this.show(player);
      if(f.cancelationReason!=="UserBusy") return f;
    }
  }
 ui.ModalFormData.prototype.open = async function(player) {
    while(true) {
      const f = await this.show(player);
      if(f.cancelationReason!=="UserBusy") return f;
    }
  }
  
  ui.MessageFormData.prototype.open = async function(player) {
    while(true) {
      const f = await this.show(player);
      if(f.cancelationReason!=="UserBusy") return f;
    }
  }
}

export default handler