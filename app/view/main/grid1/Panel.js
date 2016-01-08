Ext.define('InputGrid.view.main.grid1.Panel', {
    extend: 'Ext.grid.Panel',
    requires: [
        'InputGrid.view.main.grid1.PanelModel',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'InputGrid.store.PhoneCombo',
        'Ext.toolbar.Toolbar',
        'Ext.menu.Menu',
        'Ext.window.MessageBox'
    ],
    mixins: [
        'InputGrid.mixins.view.Grid'
    ],
    xtype: 'grid1-panel',
    viewModel: {
        type: 'panel'
    },   
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    bind: {
        store: '[myStore]'
    },
    initComponent: function() {
        var me = this,
            comboStore = Ext.create('InputGrid.store.PhoneCombo'),
            menuItems = me.generateMenu(comboStore),
            menu = new Ext.menu.Menu({
                items: menuItems
            });
        // CG: 12/29/2015 - will need to refactor this line - in context with getMenuItem
        me.menu = menu;
        me.store = me.getViewModel().data.myStore; 
        me.disableSelection = true;

        me.title = "Contact Info - Phone Property Grid Demo";

        me.viewConfig = {
            stripeRows: false,
            trackOver: false
        };
        me.cls = 'actionGrid';
        
        me.plugins = {
            ptype: 'cellediting',
            clicksToEdit: 1,
            listeners: {
                edit: {
                    fn: me.cellEditFunction,
                    scope: me
                }
            }
        };

        // me.tbar = {
            // xtype: 'toolbar',
            // items: [{
                // xtype: 'splitbutton',
                // text: 'Add',
                // menu: menu
            // }]
        // };
        
        me.columns = [{
            dataIndex: 'tag',
            header: 'Tag',
            editor: {
                xtype: 'combo',
                store: comboStore,
                emptyText: 'Select...',
                valueField: 'tag',
                displayField: 'label',
                queryMode: 'local',
                value: null,
                onTriggerClick: Ext.Function.bind(me.triggerClickOverride, me, [menu], true),
                listeners: {
                    change: {
                        fn: me.swapMenuItems,
                        scope: me
                    }
                }
            },
            width: 140,
            renderer: me.tagRenderer
        }, {
            dataIndex: "number",
            header: "Number",
            width: 150,
            editor: {
                xtype: 'textfield',
                emptyText: 'Enter a number'
            }
        }, {
            dataIndex: "isPrimary",
            header: "isPrimary",
            align: 'center',
            width: 90,
            renderer: Ext.Function.bind(me.radioButtonRenderer, me, ["isPrimaryRadioGroup", "isPrimaryRadioButton"], true)
        }, {
            width: 40,
            header: "",
            renderer: me.actionRenderer
        }];
        
        // CG: 12/28/2015 - cellclick will not work in view controller, must view if this is a known bug and or fixed in 5.1.2
        me.listeners = {
            cellclick: {
                fn: me.cellClickDispatch
            },
            titlechange: {
                fn: me.setSplitButton
            },
            afterrender: {
                fn: me.setSplitButtonHolder
            }
        };
        me.callParent(arguments);
    }

});