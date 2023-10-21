import util from "util";
import { LogicalType, StringType, LongType } from "../avro-types/commonTypes";

function DateType(attrs, opts) {
  LogicalType.call(this, attrs, opts, [LongType]);
}
util.inherits(DateType, LogicalType);

DateType.prototype._fromValue = function (val: number) {
  return new Date(val);
};

DateType.prototype._toValue = function (date: Date) {
  return +date;
};

DateType.prototype._resolve = function (type) {
  if (
    type instanceof StringType || // Support parsing strings.
    type instanceof LongType ||
    type instanceof DateType
  ) {
    return this._fromValue;
  }
};

export default DateType;
