import { useCallback, useState } from "react";
import ListSort from "../components/ListSort/ListSort";
import ListSearch from "../components/ListSearch/ListSearch";
import ProjectList from "../components/ProjectList/ProjectList";
import { ProjectStatus } from "../config/constants";
import { normalizeListData } from "../utils/helpers";
import orderBy from "lodash/orderBy";
import { useProjectsContext } from "../hooks/useProjectsContext";

const CompletedProjects = () => {

    const [selectOption, setSelectOption] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const { projects } = useProjectsContext();

    const onChangeText = useCallback((e) => setSearchVal(e.target.value), []);
    const updateSelectOption = useCallback((val) => {
        setSearchVal("");
        setSelectOption(val);
    }, []);
    const updateSortOption = useCallback((val) => setSortOption(val), []);

    const getData = () => {
        const activeList = normalizeListData(projects, ProjectStatus.COMPLETED);

        let filteredList = [];

        if (selectOption === "techStacks") {
            filteredList = searchVal.length > 0 ? activeList.filter(item => item.techStacks.includes(searchVal)) : activeList;
        } else {
            filteredList = searchVal.length > 0 ? activeList.filter(item => item.name.includes(searchVal)) : activeList;
        }

        if (sortOption) {
            const [sortField, sortOrder] = sortOption.split('_');
            return orderBy(filteredList, sortField, sortOrder);
        }

        return filteredList;
    };

    return (
        <>
            <div className="filter-container">
                <ListSearch
                    searchValue={searchVal}
                    updateSearchText={onChangeText}
                    selectOption={selectOption}
                    updateSelectOption={updateSelectOption}
                />
                <ListSort
                    sortOption={sortOption}
                    updateSortOption={updateSortOption}
                />
            </div>
            <ProjectList
                data={getData()}
            />
        </>
    )
}

export default CompletedProjects;