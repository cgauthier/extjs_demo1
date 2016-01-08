Ext.define('InputGrid.view.main.grid1.PanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.panel',
    requires: [
        'InputGrid.store.Grid1',
        'InputGrid.model.PhoneCombo',
        'Ext.data.proxy.Memory'
    ],
    view: 'grid1-panel',
    stores: {
        myStore: {
            type: 'Grid1Panel'
        }
    }
});
