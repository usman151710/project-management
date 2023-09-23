import React from 'react';
import { Input, Select, Typography } from "antd";
import { SearchOptions } from "../../config/constants";
import './ListSearch.css';

const { Search } = Input;

const ListSearch = ({ selectOption, updateSelectOption, searchValue, updateSearchText }) => {
    return (
        <div className='search-container'>
            <Typography.Text>Search:</Typography.Text>
            <Search
                className="search"
                allowClear
                disabled={!selectOption}
                value={searchValue}
                onChange={updateSearchText}
                addonBefore={
                    <Select
                        className="search-select"
                        placeholder="Search"
                        options={SearchOptions}
                        onChange={updateSelectOption}
                        popupMatchSelectWidth={150}
                        value={selectOption}
                    />
                }
            />
        </div>
    )
}

export default React.memo(ListSearch);