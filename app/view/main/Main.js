Ext.define('InputGrid.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'InputGrid.view.main.grid1.Panel'
    ],
    xtype: 'app-main',
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        
        me.layout = {
            type: 'fit'
        };
        
        me.items = [{
            xtype: 'grid1-panel'
        }];
        
        me.callParent(arguments);
    }

});
