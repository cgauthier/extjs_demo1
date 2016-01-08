Ext.define('InputGrid.mixins.view.Grid', {

    setSplitButtonHolder: function() {
        var me = this;
        me.setTitle("<span style='margin-top:4px;display:inline-block;'>Contact Info - Phone Property Grid Demo</span><span style='padding-left: 10px;' id='btnHolder'></span>")
    },

    setSplitButton: function(panel, newTitle, oldTitle) {
        var me = this;
        
        var btnHolder = Ext.get('btnHolder');
        
        var btn = Ext.create('Ext.button.Split', {
            text: 'Add',
            menu: me.menu
        });
        
        btn.render(btnHolder);
    },

    getMenuItem: function(tag) {
        // CG: 12/29/2015 - Would probably be more efficient to just set the menuitem button to each
        //                  grid row and refer to it via rec.data.menuitem for example
        //                  will consider refactoring if it doesn't cause regression amd doesn't add code complexity        
        var me = this,
            menuItems = me.menu.items.items,
            menuItemsLength = menuItems.length,
            x;
            
        for(x = 0; x < menuItemsLength; x++) {
            if(menuItems[x].tag == tag) {
                return menuItems[x];
            }
        }
        return null;
    },

    swapMenuItems: function(cmb, newVal, oldVal) {
        var grid = this,
            newMenuItem = grid.getMenuItem(newVal),
            oldMenuItem = grid.getMenuItem(oldVal);
            
        newMenuItem.hide();
        oldMenuItem.show();
    },

    addRowToGrid: function(menuitem, event) {
        
        var view = this,             
            store = view.getStore(),
            count = store.count(),
            isPrimary = true,
            rec;
        
        if(count > 0) {
            isPrimary = false;
        }
        
        rec = Ext.create('InputGrid.model.Grid1', {
            tag: menuitem.tag,
            number: "",
            isPrimary: isPrimary
        });
        
        menuitem.hide();
        store.add(rec);
                                
    },
    
    cellEditFunction: function(editor, context) {
       context.record.commit();
    },

    triggerClickOverride: function(cmb, trigEl, event, menu) {

        var store = cmb.getStore(),
            menuItems = menu.items.items,
            menuItemsLength = menuItems.length,
            x, menuItem,
            records = [], rec;
        
        store.removeAll();

        // CG: 29/12/2015 - should create a getMenuItems function        
        for(x = 0; x < menuItemsLength; x++) {
            menuItem = menuItems[x];
            if(menuItem.isVisible()) {
                rec = Ext.create('InputGrid.model.PhoneCombo', {
                    tag: menuItem.tag,
                    label: menuItem.text,
                    inUse: false
                });
                records.push(rec);
            }
        }
        
        store.loadData(records);

        if(cmb.isExpanded) {
            cmb.collapse();
        } else {
            cmb.expand();
        }
    },


    generateMenu: function(store) {
        var me = this,
            menuArr = [],
            items = store.data.items,
            x, l = items.length,
            rec, menuItem;
            
        for(x = 0; x < l; x++) {
            rec = items[x];
            menuItem = {
                text: rec.data.label,
                tag: rec.data.tag,
                listeners: {
                    click: {
                        fn: me.addRowToGrid,
                        scope: me
                    }
                }
            };
            menuArr.push(menuItem);
        }
        
        return menuArr;
    },
    
    // CG: 12/29/2015 - Dormant function, need to use this so that we don't sync incomplete records 
    //                  once REST call is ready to use this function will be used
    // validateRow: function(rec) {
        // // CG: 12/28/2015 - JS empty string is false
        // if(Ext.String.trim(rec.data.number) && Ext.String.trim(rec.data.tag)) {
            // return true;
        // }
        // return false;
    // },
    
    radioButtonRenderer: function(val, meta, rec, rowIdx, colIdx, store, view, group, id) {
        var htmlTpl = "<input style='cursor:pointer;' type='radio' name='{3}' id='{4}{0}' value='{1}' {2}>",
            isChecked = val ? "checked": "",
            html = Ext.String.format(htmlTpl, rowIdx, val, isChecked, group, id);
            
        // CG: 12/28/2015 - A bug in ExtJS 5 which never happened in 4, when rec is set in the cellclick, meta is null
        //                - fortunately, this is a one time requirement, so no issues with the workaround
        if(meta) {
            meta.align = "center";
            meta.tdAttr = "celltype=" + id;
            meta.tdStyle = 'cursor:pointer;';
        } 
        return html;
    },

    tagRenderer: function(val, meta, rec, rowIdx, colIdx, store, view) {
        var me = this,
            menuItem;

        // CG: 12/30/2015 - this might be necessary anymore, will need to re-evaluate with testing        
        if(!val) {
            return "Select ..."
        }
        menuItem = me.getMenuItem(val);
        return menuItem.text;
    },


    // ORIGINAL
    actionRenderer: function(val, meta, rec, rowIdx, colIdx, store, view, group, id) {
        var count = store.count(),
            removeSpan = "<span class='actionFormat' title='Remove Row'>x</span>";

        // CG: 12/28/2015 - A bug in ExtJS 5 which never happened in 4, when rec is set in the cellclick, meta is null
        //                - fortunately, this is a one time requirement, so no issues with the workaround
        if(meta) {
            meta.align = "center";
            meta.tdAttr = "celltype=action";
        }

        return removeSpan;        
    },
    
    // ORIGINAL
    // CG: Will use in a second version
    // actionRenderer: function(val, meta, rec, rowIdx, colIdx, store, view, group, id) {
        // var count = store.count();
//         
        // var plusSpan = "<span class='actionFormat' title='Add New Row'>+</span>";
        // var minusSpan = "<span class='actionFormat actionFormatAdjust' title='Remove Row'>-</span>";
//         
        // var isRowValid = this.validateRow(rec);
//         
        // if(meta) {
            // meta.align = "center";
            // meta.tdAttr = "celltype=action";
        // }
// 
        // // CG: 12/28/2015 - optimize this for something easier to read
        // if(count <= 1 || count - 1 == rowIdx) {
            // if(isRowValid) {
                // return plusSpan;    
            // } else {
                // return "";
            // }
//             
//             
        // } else {
            // if(count > 1 && rowIdx == 0) {
                // return ""
            // } else {
                // if(isRowValid) {
                    // return minusSpan;    
                // } else {
                    // return "";
                // }
            // }     
        // }
//         
    // },
    
    cellClickDispatch: function(gridview, td, cellIndex, record, tr, rowIndex, e) {

        var me = this,
            cellType = td.getAttribute('celltype'),
            store = gridview.getStore(),
            length,
            x, rec, removeRec, menuItem, phone;
        
        switch(cellType) {
            case "isPrimaryRadioButton": 
                if(e.target.type != "radio") {
                    Ext.get(e.target.parentElement).select('input[type=radio]').elements[0].checked = true;
                }
                record.set('isPrimary', true);
                record.commit();
                
                length = store.count();
                
                // CG: 12/28/2015 - the list of items is never more than 10 at best, so this is an efficient way to deal with uniqueness
                for(x = 0; x < length; x++) {
                    rec = store.getAt(x);
                    if(record.internalId != rec.internalId) {
                        rec.set('isPrimary', false);
                        rec.commit();
                    }            
                }        
                store.sync();
            break;
            
            case "action":
            
                phone = "";
                if(record.data.number) {
                    phone = "Phone: " + record.data.number;
                }

                menuItem = me.getMenuItem(record.data.tag);
            
                var msg = [
                    "Do you wish to delete this record?",
                    "Tag: " + menuItem.text,
                    phone
                ].join("<br/>");

                Ext.Msg.confirm("Deletion Warning", msg, function(answer) {
                    if(answer == "yes") {
                        var menuItem = this.menuItem;
                        var store = this.store;
                        var record = this.record;
                        menuItem.show(); 
                        store.remove(record);
                    }
                }, {
                    menuItem: menuItem,
                    store: store,
                    record: record
                });
                
            break;

        }
    }
});