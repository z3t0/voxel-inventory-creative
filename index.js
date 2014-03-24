// Generated by CoffeeScript 1.7.0
(function() {
  var CreativeInventoryPlugin, Inventory, InventoryDialog, InventoryWindow, ItemPile,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Inventory = require('inventory');

  InventoryWindow = require('inventory-window');

  InventoryDialog = (require('voxel-inventory-dialog')).InventoryDialog;

  ItemPile = require('itempile');

  module.exports = function(game, opts) {
    return new CreativeInventoryPlugin(game, opts);
  };

  CreativeInventoryPlugin = (function(_super) {
    __extends(CreativeInventoryPlugin, _super);

    function CreativeInventoryPlugin(game, opts) {
      var div, _ref;
      this.game = game;
      this.registry = (function() {
        if ((_ref = game.plugins.get('voxel-registry')) != null) {
          return _ref;
        } else {
          throw new Error('voxel-creative-inventory requires voxel-registry');
        }
      })();
      div = document.createElement('div');
      this.thisInventory = new Inventory(10, 3);
      this.thisIW = new InventoryWindow({
        inventory: this.thisInventory,
        registry: this.registry
      });
      this.buttons = document.createElement('div');
      div.appendChild(this.buttons);
      div.appendChild(this.thisIW.createContainer());
      CreativeInventoryPlugin.__super__.constructor.call(this, game, {
        upper: [div]
      });
    }

    CreativeInventoryPlugin.prototype.enable = function() {};

    CreativeInventoryPlugin.prototype.disable = function() {};

    CreativeInventoryPlugin.prototype.open = function() {
      var categories;
      categories = this.scanCategories();
      this.addButtons(categories);
      this.populateCategory(categories, this.activeCategory);
      return CreativeInventoryPlugin.__super__.open.call(this, open);
    };

    CreativeInventoryPlugin.prototype.addButtons = function(categories) {
      return Object.keys(categories).forEach((function(_this) {
        return function(category) {
          var button;
          button = document.createElement('button');
          button.textContent = category;
          button.addEventListener('click', function() {
            return _this.populateCategory(_this.scanCategories(), category);
          });
          return _this.buttons.appendChild(button);
        };
      })(this));
    };

    CreativeInventoryPlugin.prototype.scanCategories = function() {
      var blockIndex, categories, category, name, props, _i, _len, _ref, _ref1, _ref2, _ref3;
      categories = {};
      _ref = this.registry.itemProps;
      for (name in _ref) {
        props = _ref[name];
        category = (_ref1 = props.creativeTab) != null ? _ref1 : 'items';
        if (categories[category] == null) {
          categories[category] = [];
        }
        categories[category].push(name);
      }
      _ref2 = this.registry.blockProps;
      for (blockIndex = _i = 0, _len = _ref2.length; _i < _len; blockIndex = ++_i) {
        props = _ref2[blockIndex];
        if (blockIndex === 0) {
          continue;
        }
        name = this.registry.getBlockName(blockIndex);
        category = (_ref3 = props.creativeTab) != null ? _ref3 : 'blocks';
        if (categories[category] == null) {
          categories[category] = [];
        }
        categories[category].push(name);
      }
      console.log(categories);
      return categories;
    };

    CreativeInventoryPlugin.prototype.populateCategory = function(categories, category) {
      var i, items, name, _i, _len, _ref, _results;
      if (category == null) {
        category = 'items';
      }
      this.activeCategory = category;
      this.thisInventory.clear();
      items = (_ref = categories[category]) != null ? _ref : [];
      _results = [];
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        name = items[i];
        _results.push(this.thisInventory.set(i, new ItemPile(name, Infinity)));
      }
      return _results;
    };

    return CreativeInventoryPlugin;

  })(InventoryDialog);

}).call(this);
