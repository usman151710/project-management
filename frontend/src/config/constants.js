const techStacks = [
    {
        label: "React",
        value: "React"
    },
    {
        label: "Node JS",
        value: "Node JS"
    },
    {
        label: "Java",
        value: "Java"
    },
    {
        label: "PHP",
        value: "PHP"
    },
];

const SearchOptions = [
    {
        label: "Name",
        value: "name"
    },
    {
        label: "Tech Stacks",
        value: "techStacks"
    }
];

const SortOptions = [
    {
        label: "Name (A-Z)",
        value: "name_asc",
    },
    {
        label: "Name (Z-A)",
        value: "name_desc",
    },
    {
        label: "Time Created (New - Old)",
        value: "time_asc",
    },
    {
        label: "Time Created (Old - New)",
        value: "time_desc",
    },
]

const ProjectStatus = {
    ACTIVE: "active",
    ARCHIVED: "archived",
    COMPLETED: "completed"
}

export {
    techStacks,
    SearchOptions,
    SortOptions,
    ProjectStatus
}