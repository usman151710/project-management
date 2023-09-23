import React from "react";
import { Select, Typography } from "antd";
import { SortOptions } from "../../config/constants";
import './ListSort.css';

const ListSort = ({ sortOption, updateSortOption }) => {
    return (
        <div className='sort-container'>
            <Typography.Text>Sort:</Typography.Text>
            <Select
                className="sort-select"
                placeholder="Select a Sort Option"
                options={SortOptions}
                onChange={updateSortOption}
                popupMatchSelectWidth={200}
                value={sortOption}
            />
        </div>
    )
}

export default React.memo(ListSort);