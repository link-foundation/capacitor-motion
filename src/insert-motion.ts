import { MotionDecorator } from "./create-motion-decorator.js";
import { MakeMotionInsertOperationsOptions, makeMotionInsertOperations } from "./make-motion-insert-operations.js";

export async function insertMotion(this: MotionDecorator, options: InsertMotionOptions) {
  const {operations} = await this.makeMotionInsertOperations(options);
  if(operations.length === 0) {
    return []
  }
  const serialResult = await this.serial({
    operations
  })
  return serialResult;
}

export type InsertMotionOptions = MakeMotionInsertOperationsOptions;