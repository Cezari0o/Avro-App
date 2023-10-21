import util from "util";
import { LongType, LogicalType } from "../avro-types/commonTypes";

function IdCounter(attrs, opts) {
  this._counter = attrs.initialCount || 0;
  LogicalType.call(this, attrs, opts, [LongType]);
}

util.inherits(IdCounter, LogicalType);

IdCounter.prototype._fromValue = function (deserializedVal) {
  return deserializedVal;
};

IdCounter.prototype._toValue = function () {
  const toReturn = this._counter;
  this._counter++;

  return toReturn;
};

export default IdCounter;
