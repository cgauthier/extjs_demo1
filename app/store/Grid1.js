Ext.define('InputGrid.store.Grid1', {
    extend: 'Ext.data.Store',
    model: 'InputGrid.model.Grid1',
    storeId: 'Grid1',
    alias: 'store.Grid1Panel',
    data: {
        data: []
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
