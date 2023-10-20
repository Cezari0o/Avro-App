import util from "util";
import avro from "avro-js";

const LogicalType = avro.types.LogicalType;
const LongType = avro.types.LongType;

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

export default DateType;
