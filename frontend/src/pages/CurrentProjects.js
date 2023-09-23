import ProjectList from "../components/ProjectList/ProjectList";
import { useCallback, useState } from "react";
import ListSearch from "../components/ListSearch/ListSearch";
import ListSort from "../components/ListSort/ListSort";
import { normalizeListData } from "../utils/helpers";
import { ProjectStatus } from "../config/constants";
import orderBy from 'lodash/orderBy';
import EditForm from "../components/EditForm/EditForm";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { Modal } from "antd";

const CurrentProjects = () => {

    const [selectOption, setSelectOption] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const { projects } = useProjectsContext();

    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeText = useCallback((e) => setSearchVal(e.target.value), []);
    const updateSelectOption = useCallback((val) => {
        setSearchVal("");
        setSelectOption(val);
    }, []);
    const updateSortOption = useCallback((val) => setSortOption(val), []);


    const getData = () => {
        const activeList = normalizeListData(projects, ProjectStatus.ACTIVE);
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
                isEdit={true}
                isArchive={true}
                isComplete={true}
                showModal={showModal}
            />
            <Modal width={700} title="Edit Modal" open={isModalOpen} onCancel={handleCancel} destroyOnClose footer={null}>
                <EditForm
                    project={selectedItem}
                    modalClose={handleOk}
                />
            </Modal>
        </>
    )
}

export default CurrentProjects;