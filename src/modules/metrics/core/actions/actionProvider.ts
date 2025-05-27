import { IMetricRepository } from "../repository/IMetricRepository";
import { EditMetricAction } from "./EditMetricAction";
import { IEditMetricAction } from "./EditMetricAction";
import {
  GetAllMetricsAction,
  IGetAllMetricsAction,
} from "./GetAllMetricsAction";
import {
  GetMetricByIdAction,
  IGetMetricByIdAction,
} from "./GetMetricByIdAction";
import { IRemoveMetricAction, RemoveMetricAction } from "./RemoveMetricAction";
import { ISaveMetricAction, SaveMetricAction } from "./SaveMetricAction";

export interface IMetricActions {
  save: ISaveMetricAction;
  edit: IEditMetricAction;
  remove: IRemoveMetricAction;
  getAll: IGetAllMetricsAction;
  getById: IGetMetricByIdAction;
}
export const getMetricActions = (metricRepository: IMetricRepository) => {
  const MetricActions: IMetricActions = {
    save: SaveMetricAction(metricRepository),
    edit: EditMetricAction(metricRepository),
    remove: RemoveMetricAction(metricRepository),
    getAll: GetAllMetricsAction(metricRepository),
    getById: GetMetricByIdAction(metricRepository),
  };
  return MetricActions;
};
