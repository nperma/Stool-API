let frik24moon = function jzVljpd() {};

frik24moon.static = (mc, { ui, tools }) => {
    ui.ActionFormData.prototype.open = async player =>
        await tools.forceOpen(player, this);
        
        ui.ModalFormData.prototype.open = async player =>
        await tools.forceOpen(player, this);
        
        ui.MessageFormData.prototype.open = async player =>
        await tools.forceOpen(player, this);
};

export default frik24moon;
