import { get } from "lodash";
import { double } from "./utils";

console.log(double(10));

const obj = {
  name: "sechi",
};

console.log(get(obj, "name"));
