"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const task_model_1 = require("../models/task.model");
const crud_repository_1 = require("./crud.repository");
class TaskRepository extends crud_repository_1.CrudRepository {
    constructor() {
        super(task_model_1.taskModel);
    }
}
exports.TaskRepository = TaskRepository;
