import React from 'react';
import { Input, Select } from "antd";
import { SearchOptions } from "../../config/constants";
import './ListSearch.css';

const { Search } = Input;

const ListSearch = ({ selectOption, updateSelectOption, searchValue, updateSearchText }) => {
    return (
        <Search
            className="search"
            allowClear
            disabled={!selectOption}
            value={searchValue}
            onChange={updateSearchText}
            addonBefore={
                <Select
                    className="search-select"
                    placeholder="Search by Name or Tech Stack"
                    options={SearchOptions}
                    onChange={updateSelectOption}
                    popupMatchSelectWidth={150}
                    value={selectOption}
                />
            }
        />
    )
}

export default React.memo(ListSearch);