import util from "util";

export default function assertValid(type, val) {
  return type.isValid(val, { errorHook: hook });

  function hook(path, any) {
    throw new Error(util.format("Campo %s inválido: %j", path.join("."), any));
  }
}
