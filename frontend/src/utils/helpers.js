import { ProjectStatus } from "../config/constants";

export const normalizeListData = (data, selectedStatus) => {
    if (selectedStatus === ProjectStatus.COMPLETED) return data.filter((item) => item.status !== ProjectStatus.ACTIVE);

    return data.filter((item) => item.status === selectedStatus)
}