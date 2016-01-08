Ext.define('InputGrid.store.PhoneCombo', {
    extend: 'Ext.data.Store',
    model: 'InputGrid.model.PhoneCombo',
    alias: 'store.combobox',
    proxy: {
        type: 'memory'
    },
    data: [{
        "tag": "officePhone1",
        "label": "Office Phone 1"
    }, {
        "tag": "officePhone2",
        "label": "Office Phone 2"
    }, {
        "tag": "officePhone3",
        "label": "Office Phone 3"
    }, {
        "tag": "faxPhone1",
        "label": "Fax Phone 1"
    }, {
        "tag": "faxPhone2",
        "label": "Fax Phone 2"
    }, {
        "tag": "faxPhone3",
        "label": "Fax Phone 3"
    }, {
        "tag": "cellPhone1",
        "label": "Cell Phone 1"
    }, {
        "tag": "cellPhone2",
        "label": "Cell Phone 2"
    }, {
        "tag": "cellPhone3",
        "label": "Cell Phone 3"
    }]
});
