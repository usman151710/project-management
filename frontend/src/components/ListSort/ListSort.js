import React from "react";
import { Select } from "antd";
import { SortOptions } from "../../config/constants";
import './ListSort.css';

const ListSort = ({ sortOption, updateSortOption }) => {
    return (
        <Select
            className="sort-select"
            placeholder="Select a Sort Option"
            options={SortOptions}
            onChange={updateSortOption}
            popupMatchSelectWidth={200}
            value={sortOption}
        />
    )
}

export default React.memo(ListSort);