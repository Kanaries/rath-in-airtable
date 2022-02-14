"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _ui = require("@airtable/blocks/ui");

var _react = _interopRequireWildcard(require("react"));

var _graphicWalker = require("@kanaries/graphic-walker");

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _ui.loadCSSFromString)(_style.default);

function getMetaData(_x) {
  return _getMetaData.apply(this, arguments);
}

function _getMetaData() {
  _getMetaData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(view) {
    var columns, fields;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            columns = view.selectMetadata();
            _context.next = 3;
            return columns.loadDataAsync();

          case 3:
            fields = columns.visibleFields.map(function (f) {
              return {
                name: f.name,
                key: f.name,
                analyticType: f.type === 'number' ? 'measure' : 'dimension',
                semanticType: '?',
                dataType: '?'
              };
            });
            return _context.abrupt("return", fields);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getMetaData.apply(this, arguments);
}

function HelloWorldTypescriptApp() {
  // YOUR CODE GOES HERE
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      fields = _useState2[0],
      setFields = _useState2[1];

  var base = (0, _ui.useBase)();
  var table = base.getTableByName('students');
  (0, _react.useEffect)(function () {
    getMetaData(table.views[0]).then(function (res) {
      setFields(res);
    });
  }, [table]);
  var records = (0, _ui.useRecords)(table);
  var rows = records.map(function (r) {
    var row = {};
    fields.forEach(function (f) {
      if (f.analyticType === 'dimension') {
        row[f.key] = r.getCellValueAsString(f.key); // [f.key]
      } else {
        row[f.key] = r.getCellValue(f.key); // [f.key]
      }
    });
    return row;
  });
  console.log('records', rows);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_graphicWalker.GraphicWalker, {
    dataSource: rows,
    rawFields: fields
  }));
}

(0, _ui.initializeBlock)(function () {
  return /*#__PURE__*/_react.default.createElement(HelloWorldTypescriptApp, null);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzeCJdLCJuYW1lcyI6WyJzdHlsZWNzcyIsImdldE1ldGFEYXRhIiwidmlldyIsImNvbHVtbnMiLCJzZWxlY3RNZXRhZGF0YSIsImxvYWREYXRhQXN5bmMiLCJmaWVsZHMiLCJ2aXNpYmxlRmllbGRzIiwibWFwIiwiZiIsIm5hbWUiLCJrZXkiLCJhbmFseXRpY1R5cGUiLCJ0eXBlIiwic2VtYW50aWNUeXBlIiwiZGF0YVR5cGUiLCJIZWxsb1dvcmxkVHlwZXNjcmlwdEFwcCIsInNldEZpZWxkcyIsImJhc2UiLCJ0YWJsZSIsImdldFRhYmxlQnlOYW1lIiwidmlld3MiLCJ0aGVuIiwicmVzIiwicmVjb3JkcyIsInJvd3MiLCJyIiwicm93IiwiZm9yRWFjaCIsImdldENlbGxWYWx1ZUFzU3RyaW5nIiwiZ2V0Q2VsbFZhbHVlIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztBQUdBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSwyQkFBa0JBLGNBQWxCOztTQUVlQyxXOzs7Ozt5RUFBZixpQkFBMkJDLElBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxPQURWLEdBQ29CRCxJQUFJLENBQUNFLGNBQUwsRUFEcEI7QUFBQTtBQUFBLG1CQUVVRCxPQUFPLENBQUNFLGFBQVIsRUFGVjs7QUFBQTtBQUdVQyxZQUFBQSxNQUhWLEdBR2dDSCxPQUFPLENBQUNJLGFBQVIsQ0FBc0JDLEdBQXRCLENBQTBCLFVBQUFDLENBQUM7QUFBQSxxQkFBSztBQUN4REMsZ0JBQUFBLElBQUksRUFBRUQsQ0FBQyxDQUFDQyxJQURnRDtBQUV4REMsZ0JBQUFBLEdBQUcsRUFBRUYsQ0FBQyxDQUFDQyxJQUZpRDtBQUd4REUsZ0JBQUFBLFlBQVksRUFBRUgsQ0FBQyxDQUFDSSxJQUFGLEtBQVcsUUFBWCxHQUFzQixTQUF0QixHQUFrQyxXQUhRO0FBSXhEQyxnQkFBQUEsWUFBWSxFQUFFLEdBSjBDO0FBS3hEQyxnQkFBQUEsUUFBUSxFQUFFO0FBTDhDLGVBQUw7QUFBQSxhQUEzQixDQUhoQztBQUFBLDZDQVVXVCxNQVZYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFhQSxTQUFTVSx1QkFBVCxHQUFtQztBQUMvQjtBQUNBLGtCQUE0QixxQkFBc0IsRUFBdEIsQ0FBNUI7QUFBQTtBQUFBLE1BQU9WLE1BQVA7QUFBQSxNQUFlVyxTQUFmOztBQUNBLE1BQU1DLElBQUksR0FBRyxrQkFBYjtBQUNBLE1BQU1DLEtBQUssR0FBR0QsSUFBSSxDQUFDRSxjQUFMLENBQW9CLFVBQXBCLENBQWQ7QUFDQSx3QkFBVSxZQUFNO0FBQ1puQixJQUFBQSxXQUFXLENBQUNrQixLQUFLLENBQUNFLEtBQU4sQ0FBWSxDQUFaLENBQUQsQ0FBWCxDQUE0QkMsSUFBNUIsQ0FBaUMsVUFBQUMsR0FBRyxFQUFJO0FBQ3BDTixNQUFBQSxTQUFTLENBQUNNLEdBQUQsQ0FBVDtBQUNILEtBRkQ7QUFHSCxHQUpELEVBSUcsQ0FBQ0osS0FBRCxDQUpIO0FBS0EsTUFBTUssT0FBTyxHQUFHLG9CQUFXTCxLQUFYLENBQWhCO0FBQ0EsTUFBTU0sSUFBSSxHQUFHRCxPQUFPLENBQUNoQixHQUFSLENBQVksVUFBQWtCLENBQUMsRUFBSTtBQUMxQixRQUFJQyxHQUF5QixHQUFHLEVBQWhDO0FBQ0FyQixJQUFBQSxNQUFNLENBQUNzQixPQUFQLENBQWUsVUFBQW5CLENBQUMsRUFBSTtBQUNoQixVQUFJQSxDQUFDLENBQUNHLFlBQUYsS0FBbUIsV0FBdkIsRUFBb0M7QUFDaENlLFFBQUFBLEdBQUcsQ0FBQ2xCLENBQUMsQ0FBQ0UsR0FBSCxDQUFILEdBQWFlLENBQUMsQ0FBQ0csb0JBQUYsQ0FBdUJwQixDQUFDLENBQUNFLEdBQXpCLENBQWIsQ0FEZ0MsQ0FDVTtBQUM3QyxPQUZELE1BRU87QUFDSGdCLFFBQUFBLEdBQUcsQ0FBQ2xCLENBQUMsQ0FBQ0UsR0FBSCxDQUFILEdBQWFlLENBQUMsQ0FBQ0ksWUFBRixDQUFlckIsQ0FBQyxDQUFDRSxHQUFqQixDQUFiLENBREcsQ0FDK0I7QUFDckM7QUFFSixLQVBEO0FBUUEsV0FBT2dCLEdBQVA7QUFDSCxHQVhZLENBQWI7QUFZQUksRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksU0FBWixFQUF1QlAsSUFBdkI7QUFDQSxzQkFBTyx1REFFSCw2QkFBQyw0QkFBRDtBQUFlLElBQUEsVUFBVSxFQUFFQSxJQUEzQjtBQUFpQyxJQUFBLFNBQVMsRUFBRW5CO0FBQTVDLElBRkcsQ0FBUDtBQUlIOztBQUVELHlCQUFnQjtBQUFBLHNCQUFNLDZCQUFDLHVCQUFELE9BQU47QUFBQSxDQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5pdGlhbGl6ZUJsb2NrLCBsb2FkQ1NTRnJvbVN0cmluZywgdXNlQmFzZSwgdXNlUmVjb3Jkc30gZnJvbSAnQGFpcnRhYmxlL2Jsb2Nrcy91aSc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBXYWxrZXIgZnJvbSAnLi93YWxrZXInXG4vLyBpbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCB7IEdyYXBoaWNXYWxrZXIgfSBmcm9tICdAa2FuYXJpZXMvZ3JhcGhpYy13YWxrZXInO1xuaW1wb3J0IHN0eWxlY3NzIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IFZpZXcgZnJvbSAnQGFpcnRhYmxlL2Jsb2Nrcy9kaXN0L3R5cGVzL3NyYy9tb2RlbHMvdmlldyc7XG5pbXBvcnQgeyBJTXV0RmllbGQgfSBmcm9tICdAa2FuYXJpZXMvZ3JhcGhpYy13YWxrZXIvZGlzdC9pbnRlcmZhY2VzJztcblxubG9hZENTU0Zyb21TdHJpbmcoc3R5bGVjc3MpXG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1ldGFEYXRhKHZpZXc6IFZpZXcpIHtcbiAgICBjb25zdCBjb2x1bW5zID0gdmlldy5zZWxlY3RNZXRhZGF0YSgpXG4gICAgYXdhaXQgY29sdW1ucy5sb2FkRGF0YUFzeW5jKClcbiAgICBjb25zdCBmaWVsZHM6IElNdXRGaWVsZFtdID0gY29sdW1ucy52aXNpYmxlRmllbGRzLm1hcChmID0+ICh7XG4gICAgICAgIG5hbWU6IGYubmFtZSxcbiAgICAgICAga2V5OiBmLm5hbWUsXG4gICAgICAgIGFuYWx5dGljVHlwZTogZi50eXBlID09PSAnbnVtYmVyJyA/ICdtZWFzdXJlJyA6ICdkaW1lbnNpb24nLFxuICAgICAgICBzZW1hbnRpY1R5cGU6ICc/JyxcbiAgICAgICAgZGF0YVR5cGU6ICc/J1xuICAgIH0pKVxuICAgIHJldHVybiBmaWVsZHM7XG59XG5cbmZ1bmN0aW9uIEhlbGxvV29ybGRUeXBlc2NyaXB0QXBwKCkge1xuICAgIC8vIFlPVVIgQ09ERSBHT0VTIEhFUkVcbiAgICBjb25zdCBbZmllbGRzLCBzZXRGaWVsZHNdID0gdXNlU3RhdGU8SU11dEZpZWxkW10+KFtdKTtcbiAgICBjb25zdCBiYXNlID0gdXNlQmFzZSgpO1xuICAgIGNvbnN0IHRhYmxlID0gYmFzZS5nZXRUYWJsZUJ5TmFtZSgnc3R1ZGVudHMnKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldE1ldGFEYXRhKHRhYmxlLnZpZXdzWzBdKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBzZXRGaWVsZHMocmVzKTtcbiAgICAgICAgfSlcbiAgICB9LCBbdGFibGVdKVxuICAgIGNvbnN0IHJlY29yZHMgPSB1c2VSZWNvcmRzKHRhYmxlKTtcbiAgICBjb25zdCByb3dzID0gcmVjb3Jkcy5tYXAociA9PiB7XG4gICAgICAgIGxldCByb3c6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgaWYgKGYuYW5hbHl0aWNUeXBlID09PSAnZGltZW5zaW9uJykge1xuICAgICAgICAgICAgICAgIHJvd1tmLmtleV0gPSByLmdldENlbGxWYWx1ZUFzU3RyaW5nKGYua2V5KS8vIFtmLmtleV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93W2Yua2V5XSA9IHIuZ2V0Q2VsbFZhbHVlKGYua2V5KS8vIFtmLmtleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcm93XG4gICAgfSlcbiAgICBjb25zb2xlLmxvZygncmVjb3JkcycsIHJvd3MpO1xuICAgIHJldHVybiA8ZGl2PlxuICAgICAgICB7Lyoge3JlY29yZHMubGVuZ3RoID4gMCAmJiBKU09OLnN0cmluZ2lmeShyZWNvcmRzWzBdKX0gKi99XG4gICAgICAgIDxHcmFwaGljV2Fsa2VyIGRhdGFTb3VyY2U9e3Jvd3N9IHJhd0ZpZWxkcz17ZmllbGRzfSAvPlxuICAgIDwvZGl2Pjtcbn1cblxuaW5pdGlhbGl6ZUJsb2NrKCgpID0+IDxIZWxsb1dvcmxkVHlwZXNjcmlwdEFwcCAvPik7XG4iXX0=